import React, { useState, useEffect } from "react";
import "../Css/EditarArchivo.css";

export const EditarArchivos = ({ nombre: nombreInicial, enlace: enlaceInicial, esCarpeta: esCarpetaInicial, onClose }) => {
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [nombre, setNombre] = useState(nombreInicial || ""); // Fixed typo here
  const [enlace, setEnlace] = useState(enlaceInicial || "");
  const [esCarpeta, setEsCarpeta] = useState(esCarpetaInicial || false);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all available roles
        const rolesRes = await fetch("http://localhost:3001/api/roles");
        const rolesData = await rolesRes.json();
        setAllRoles(rolesData);

        // Fetch roles assigned to this file
        const fileRolesRes = await fetch(
          `http://localhost:3001/api/ficherosRoles?nombre=${encodeURIComponent(nombreInicial)}`
        );
        const fileRolesData = await fileRolesRes.json();
        
        console.log("Fetched roles for file:", fileRolesData);
        setSelectedRoles(fileRolesData);
      } catch (error) {
        console.error("Error loading data:", error);
        setMensaje("Error cargando los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nombreInicial]);
  
  const handleRoleChange = (roleName) => {
    setSelectedRoles(prev => 
      prev.includes(roleName)
        ? prev.filter(r => r !== roleName)
        : [...prev, roleName]
    );
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
        setTimeout(onClose, 1500);
      } else {
        setMensaje(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al actualizar fichero:", error);
      setMensaje("Hubo un error al actualizar el fichero.");
    }
  };

  if (loading) {
    return <div>Cargando datos...</div>;
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
            required
          />
          <input
            type="text"
            placeholder="Enlace al documento..."
            className="modal-input"
            value={enlace}
            onChange={(e) => setEnlace(e.target.value)}
          />

          <div className="roles-section">
            <p>Roles asignados:</p>
            <div className="roles-list">
              {allRoles.map(role => {
                // Handle both role object (from /api/roles) and role string (from /api/ficherosRoles)
                const roleName = role.nombre || role;
                return (
                  <label key={roleName} className="role-item">
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(roleName)}
                      onChange={() => handleRoleChange(roleName)}
                    />
                    {roleName}
                  </label>
                );
              })}
            </div>
          </div>

          <label className="folder-checkbox">
            <input
              type="checkbox"
              checked={esCarpeta}
              onChange={(e) => setEsCarpeta(e.target.checked)}
            />
            Es una carpeta
          </label>

          <button type="submit" className="save-button">
            Guardar Cambios
          </button>

          {mensaje && <div className="message">{mensaje}</div>}
        </form>
      </div>
    </div>
  );
};

export default EditarArchivos;