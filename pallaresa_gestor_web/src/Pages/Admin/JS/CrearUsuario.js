import React, { useState } from "react";
import axios from "axios";
import "../Css/CrearUsuario.css";

const CrearUsuario = () => {
    const [correo, setCorreo] = useState("");
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [rol, setRol] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/register", {
                correo,
                nombre,
                contraseña,
                rol,
            });

            setMensaje(response.data.message);
            setCorreo("");
            setNombre("");
            setContraseña("");
            setRol("");
        } catch (error) {
            setMensaje(error.response?.data?.message || "Error al añadir el usuario");
        }
    };

    const handleRolSelection = (selectedRol) => {
        setRol(selectedRol); // Update the role state
        setIsDropdownOpen(false); // Close the dropdown after selection
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
                    />
                    <div className="dropdown-container">
                        <div className="dropdown-header" onClick={toggleDropdown}>
                            <span>{rol || "ROL"}</span>
                            <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
                                ▶
                            </span>
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-options">
                                {["Administrador", "Usuario", "Tester", "Gestor"].map((rolOption, index) => (
                                    <label key={index} className="dropdown-option">
                                        <input
                                            type="radio"
                                            name="rol"
                                            value={rolOption}
                                            checked={rol === rolOption} // Ensure the selected role is checked
                                            onChange={() => handleRolSelection(rolOption)}
                                        />
                                        {rolOption}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="modal-button">
                        Guardar
                    </button>
                </form>
                {mensaje && <p>{mensaje}</p>}
            </div>
        </div>
    );
};

export default CrearUsuario;