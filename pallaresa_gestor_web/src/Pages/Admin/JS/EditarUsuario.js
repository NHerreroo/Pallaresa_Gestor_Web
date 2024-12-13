import React from "react";
import "../Css/EditarUsuario.css";

export const EditarUsuario = () => {
  return (
    <div className="overlay-container">
      <div className="editar-usuario-box">
        <div className="usuario-header">
          <div className="usuario-avatar"></div>
          <div className="usuario-info">
            <h2 className="usuario-nombre">USUARIO USUARIO</h2>
            <p className="usuario-email">usuario.usuario@pallaresa.com</p>
          </div>
        </div>
        <form className="usuario-form">
          <input
            type="text"
            placeholder="USUARIO USUARIO"
            className="usuario-input"
          />
          <input
            type="email"
            placeholder="usuario.usuario@pallaresa.com"
            className="usuario-input"
          />
          <input type="text" placeholder="ROL" className="usuario-input" />
          <button type="submit" className="usuario-button">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarUsuario;
