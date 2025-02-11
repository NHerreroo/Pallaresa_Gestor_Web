import React, { useEffect, useState } from "react";
import axios from "axios";

const ListarPersonas = () => {
    const [personas, setPersonas] = useState([]);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const fetchPersonas = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/personas");
                setPersonas(response.data);
            } catch (error) {
                setMensaje("Error al obtener las personas");
            }
        };

        fetchPersonas();
    }, []);

    return (
        <div className="listar-personas-container">
            <h2>Lista de Personas</h2>
            {mensaje && <p>{mensaje}</p>}
            <ul>
                {personas.map((persona) => (
                    <li key={persona.correo}>
                        <strong>Correo:</strong> {persona.correo} <br />
                        <strong>Nombre:</strong> {persona.nombre}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListarPersonas;
