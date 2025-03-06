import React from 'react';
import '../Css/UsuarioItem.css';

const UsuarioItem = ({ name, role, email }) => {
  return (
    <div className="usuario-item">
      <div className="usuario-info">
        <div className="usuario-avatar">👤</div>
        <div>
          <p className="usuario-nombre">{name}</p>
          <span className={`usuario-rol ${role.toLowerCase()}`}>{role}</span>
        </div>
      </div>
      <p className="usuario-correo">{email}</p>
      <button className="usuario-configuracion">⚙️</button>
    </div>
  );
};

export default UsuarioItem;
