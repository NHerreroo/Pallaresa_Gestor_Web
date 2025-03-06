import React, { useState, useEffect } from "react";
import "../Css/ImplementarArchivo.css";

export const ImplementarArchivo = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [nombre, setNombre] = useState("");
  const [enlace, setEnlace] = useState("");
  const [esCarpeta, setEsCarpeta] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/roles")
      .then((response) => response.json())
      .then((data) => setRoles(data))
      .catch((error) => console.error("Error cargando roles:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !enlace || !selectedRole) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/ficheros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          enlace,
          carpeta: esCarpeta,
          rol: selectedRole,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje("Fichero insertado correctamente.");
        setNombre("");
        setEnlace("");
        setSelectedRole("");
        setEsCarpeta(false);
      } else {
        setMensaje(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al insertar fichero:", error);
      setMensaje("Hubo un error al guardar el fichero.");
    }
  };

  return (
    <div className="modal-container-overlay">
      <div className="modal-box">
        <h2 className="modal-title">NUEVO ENLACE</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del enlace..."
            className="modal-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enlace al documento ..."
            className="modal-input"
            value={enlace}
            onChange={(e) => setEnlace(e.target.value)}
          />

          <select
            className="modal-input"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Selecciona un rol...</option>
            {roles.map((role) => (
              <option key={role.nombre} value={role.nombre}>
                {role.nombre}
              </option>
            ))}
          </select>

          <label>
            <input
              type="checkbox"
              checked={esCarpeta}
              onChange={(e) => setEsCarpeta(e.target.checked)}
            />
            Es una carpeta
          </label>

          <button type="submit" className="modal-button">Guardar</button>

          {mensaje && <p className="modal-message">{mensaje}</p>}
        </form>
      </div>
    </div>
  );
};

export default ImplementarArchivo;
