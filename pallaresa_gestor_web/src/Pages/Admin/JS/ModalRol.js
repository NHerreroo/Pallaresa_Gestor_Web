import React from "react";
import "../Css/ModalRol.css";

export const ModalRol = () => {
  return (
    <div className="modal-container">
      <div className="modal-box">
        <h2 className="modal-title">NUEVO ROL</h2>
        <form className="modal-form">
          <input
            type="text"
            placeholder="Nombre del rol..."
            className="modal-input"
          />
          <input
            type="text"
            placeholder="Permisos..."
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

export default ModalRol;
