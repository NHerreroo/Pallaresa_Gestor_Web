import React, { useState } from "react";
import "../Css/CrearUsuario.css";

const CrearUsuario = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="modal-container">
      <div className="modal-box">
        <h2 className="modal-title">NUEVO USUARIO</h2>
        <form className="modal-form">
          <input
            type="text"
            placeholder="usuario.usuario@pallaresa.com"
            className="modal-input"
          />
          <div className="dropdown-container">
            <div className="dropdown-header" onClick={toggleDropdown}>
              <span>ROL</span>
              <span
                className={`dropdown-arrow ${
                  isDropdownOpen ? "open" : ""
                }`}
              >
                ▶
              </span>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-options">
                {["ROL 1", "ROL 2", "ROL 3", "ROL 4"].map((rol, index) => (
                  <label key={index} className="dropdown-option">
                    <input type="checkbox" />
                    {rol}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="modal-button">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearUsuario;
