import React, { useState, useEffect } from "react";
import "../Css/EditarArchivo.css";

export const EditarArchivos = ({ nombre: nombreInicial, enlace: enlaceInicial, esCarpeta: esCarpetaInicial, onClose }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [nombre, setNombre] = useState(nombreInicial || "");
  const [enlace, setEnlace] = useState(enlaceInicial || "");
  const [esCarpeta, setEsCarpeta] = useState(esCarpetaInicial || false);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Fetch all available roles
    fetch("http://localhost:3001/api/roles")
      .then((response) => response.json())
      .then((data) => setRoles(data))
      .catch((error) => console.error("Error cargando roles:", error));

      fetch(`http://localhost:3001/api/ficherosRoles?nombre=${nombreInicial}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Roles fetched from backend:", data); // Log the fetched roles
        const roles = data.map(role => role.nombre_Rol);
        console.log("Selected roles after fetch:", roles); // Log the selected roles
        setSelectedRoles(roles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error cargando roles del fichero:", error);
        setLoading(false);
      });
  }, [nombreInicial]);

  const handleRoleChange = (roleName) => {
    setSelectedRoles((prevSelectedRoles) => {
      if (prevSelectedRoles.includes(roleName)) {
        return prevSelectedRoles.filter((role) => role !== roleName);
      } else {
        return [...prevSelectedRoles, roleName];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!nombre || selectedRoles.length === 0) {
      setMensaje("Nombre y al menos un rol son obligatorios.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/api/ficherosEdit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombreInicial, 
          nuevoNombre: nombre, 
          enlace,
          carpeta: esCarpeta,
          roles: selectedRoles,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setMensaje("Fichero actualizado correctamente.");
        onClose(); // Cerrar el modal después de la actualización
      } else {
        setMensaje(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al actualizar fichero:", error);
      setMensaje("Hubo un error al actualizar el fichero.");
    }
  };

  // Show a loading message while roles are being fetched
  if (loading) {
    return <div>Cargando roles...</div>;
  }

  return (
    <div className="modal-container-overlay">
      <div className="modal-box">
        <h2 className="modal-title">EDITAR ENLACE</h2>
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
            Actualizar
          </button>

          {mensaje && <p className="modal-message">{mensaje}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditarArchivos;