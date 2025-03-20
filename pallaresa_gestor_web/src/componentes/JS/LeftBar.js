import React, { useState } from "react";
import "../Css/LeftBar.css";
import ImplementarRol from "../../Pages/Admin/JS/ImplementarRol.js"; // Popup de roles

export const LeftBar = ({ title, roles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="Barra">
      <h2 className="leftbar-title">{title}</h2>
      <div className="cajaRuta">
        {roles.map((role, index) => (
          <p key={index} className="role-title">{role}</p>
        ))}
        <button className="add-role-button" onClick={() => setIsModalOpen(true)}>
          <span className="plus-icon">+</span>
        </button>
      </div>

      {/* Renderizamos el modal solo si isModalOpen es true */}
      {isModalOpen && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal-content">
            <ImplementarRol onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftBar;
