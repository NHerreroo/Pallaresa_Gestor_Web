import React from "react";
import "../Css/ImplementarArchivo.css";

export const ImplementarArchivo = () => {
  return (
    <div className="modal-container">
      <div className="modal-box">
        <h2 className="modal-title">NUEVO ENLACE</h2>
        <form className="modal-form">
          <input
            type="text"
            placeholder="Nombre del enlace..."
            className="modal-input"
          />
          <input
            type="text"
            placeholder="Enlace al documento ..."
            className="modal-input"
          />
          <input
            type="text"
            placeholder="Roles..."
            className="modal-input"
          />
          <button type="submit" className="modal-button">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImplementarArchivo;
