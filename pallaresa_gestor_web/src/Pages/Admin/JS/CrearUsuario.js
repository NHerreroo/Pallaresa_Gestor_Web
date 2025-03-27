import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/CrearUsuario.css";

const CrearUsuario = () => {
    const [correo, setCorreo] = useState("");
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [rolesSeleccionados, setRolesSeleccionados] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/roles");
                setRoles(response.data);
            } catch (error) {
                console.error("Error cargando roles:", error);
            }
        };

        fetchRoles();
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. Registrar el usuario (sin roles)
            const hashedPassword = await hashPassword(contraseña);
            await axios.post("http://localhost:3001/api/register", {
                correo,
                nombre,
                contraseña: hashedPassword,
                rol: rolesSeleccionados[0] // Enviamos el primer rol por compatibilidad
            });

            // 2. Si hay más de un rol seleccionado, asignar los adicionales
            if (rolesSeleccionados.length > 1) {
                await axios.put(`http://localhost:3001/api/usuarios/${correo}`, {
                    nombre,
                    roles: rolesSeleccionados
                });
            }

            setMensaje("Usuario creado correctamente con los roles asignados");
            // Limpiar el formulario
            setCorreo("");
            setNombre("");
            setContraseña("");
            setRolesSeleccionados([]);
        } catch (error) {
            setMensaje(error.response?.data?.error || "Error al crear el usuario");
        }
    };

    // Función para simular el hashing de contraseña en el frontend (debería hacerse en el backend)
    const hashPassword = async (password) => {
        // Nota: En producción, esto debería hacerse exclusivamente en el backend
        return password; // El backend ya tiene bcrypt para hashear
    };

    const handleRolChange = (rolNombre) => {
        setRolesSeleccionados(prev => {
            if (prev.includes(rolNombre)) {
                return prev.filter(r => r !== rolNombre);
            } else {
                return [...prev, rolNombre];
            }
        });
    };

    return (
        <div className="modal-container-overlay">
            <div className="modal-box">
                <h2 className="modal-title">NUEVO USUARIO</h2>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="usuario.usuario@pallaresa.com"
                        className="modal-input"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="modal-input"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="modal-input"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                        minLength="6"
                    />
                    <div className="dropdown-container">
                        <div className="dropdown-header" onClick={toggleDropdown}>
                            <span>
                                {rolesSeleccionados.length > 0 
                                    ? rolesSeleccionados.join(", ") 
                                    : "Seleccione roles"}
                            </span>
                            <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
                                ▶
                            </span>
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-options">
                                {roles.map((rolOption, index) => (
                                    <div key={index} className="dropdown-option">
                                        <input
                                            type="checkbox"
                                            id={`rol-${index}`}
                                            checked={rolesSeleccionados.includes(rolOption.nombre)}
                                            onChange={() => handleRolChange(rolOption.nombre)}
                                        />
                                        <label htmlFor={`rol-${index}`}>
                                            {rolOption.nombre}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="modal-button">
                        Guardar
                    </button>
                </form>
                {mensaje && <p className="mensaje">{mensaje}</p>}
            </div>
        </div>
    );
};

export default CrearUsuario;