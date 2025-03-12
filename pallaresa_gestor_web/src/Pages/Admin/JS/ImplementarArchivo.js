import React, { useState, useEffect } from "react";
import "../Css/ImplementarArchivo.css";

export const ImplementarArchivo = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]); // Array para roles seleccionados
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

  // Función para manejar la selección/deselección de roles
  const handleRoleChange = (roleName) => {
    setSelectedRoles((prevSelectedRoles) => {
      if (prevSelectedRoles.includes(roleName)) {
        // Si el rol ya está seleccionado, lo quitamos
        return prevSelectedRoles.filter((role) => role !== roleName);
      } else {
        // Si el rol no está seleccionado, lo agregamos
        return [...prevSelectedRoles, roleName];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !enlace || selectedRoles.length === 0) {
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
          roles: selectedRoles, // Enviar array de roles
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje("Fichero insertado correctamente.");
        setNombre("");
        setEnlace("");
        setSelectedRoles([]); // Reiniciar roles seleccionados
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

          {/* Desplegable con scroll para seleccionar roles */}
          <div className="roles-dropdown-container">
            <p>Selecciona uno o varios roles:</p>
            <div className="roles-dropdown">
              {roles.map((role) => (
                <label key={role.nombre} className="role-checkbox-label">
                  <input
                    type="checkbox"
                    value={role.nombre}
                    checked={selectedRoles.includes(role.nombre)}
                    onChange={() => handleRoleChange(role.nombre)}
                  />
                  {role.nombre}
                </label>
              ))}
            </div>
          </div>

          <label>
            <input
              type="checkbox"
              checked={esCarpeta}
              onChange={(e) => setEsCarpeta(e.target.checked)}
            />
            Es una carpeta
          </label>

          <button type="submit" className="modal-button">
            Guardar
          </button>

          {mensaje && <p className="modal-message">{mensaje}</p>}
        </form>
      </div>
    </div>
  );
};

export default ImplementarArchivo;