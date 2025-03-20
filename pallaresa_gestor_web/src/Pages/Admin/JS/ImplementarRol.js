import React, { useState } from "react";
import "../Css/ImplementarRol.css";

export const ImplementarRol = ({ onClose }) => {
  const [nombreRol, setNombreRol] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [esExito, setEsExito] = useState(false); // Para controlar si el mensaje es de éxito o error

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreRol) {
      setMensaje("El nombre del rol es obligatorio.");
      setEsExito(false); // Es un error
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombreRol,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje("✅ Rol insertado correctamente.");
        setEsExito(true); // Es un éxito
        setNombreRol(""); // Reiniciar el campo del nombre del rol

        // Cerrar el modal después de 2 segundos
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setMensaje(`❌ Error: ${data.error}`);
        setEsExito(false); // Es un error
      }
    } catch (error) {
      console.error("Error al insertar rol:", error);
      setMensaje("❌ Hubo un error al guardar el rol.");
      setEsExito(false); // Es un error
    }
  };

  return (
    <div className="modal-container-overlay">
      <div className="modal-box">
        <h2 className="modal-title">NUEVO ROL</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del rol..."
            className="modal-input"
            value={nombreRol}
            onChange={(e) => setNombreRol(e.target.value)}
          />

          <div className="modal-actions">
            <button
              type="button"
              className="modal-button"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="modal-button">
              Guardar
            </button>
          </div>

          {mensaje && (
            <p
              className={`modal-message ${esExito ? "success" : "error"}`}
            >
              {mensaje}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ImplementarRol;