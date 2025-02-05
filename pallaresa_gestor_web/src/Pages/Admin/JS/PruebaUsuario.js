import React, { useState } from "react";
import axios from "axios";

const PruebaUsuario = () => {
    const [correo, setCorreo] = useState("");
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [rol, setRol] = useState("");
    const [mensaje, setMensaje] = useState("");

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

    return (
        <div className="crear-usuario-container">
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Correo:</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Rol:</label>
                    <input
                        type="text"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Añadir Usuario</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default PruebaUsuario;