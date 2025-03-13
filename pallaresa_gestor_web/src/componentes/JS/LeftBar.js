import React from 'react';
import '../Css/LeftBar.css';

export const LeftBar = ({ title, roles, onAddRole }) => {
  const handleAddRole = () => {
    const newRole = prompt("Ingrese el nombre del nuevo rol:");
    if (newRole && onAddRole) {
      onAddRole(newRole);
    }
  };

  return (
    <div className="Barra">
      <h2 className="leftbar-title">{title}</h2>
      <div className="cajaRuta">
        {roles.map((role, index) => (
          <p key={index} className="role-title">{role}</p>
        ))}
        {onAddRole && (
          <button className="add-role-button" onClick={handleAddRole}>
            <span className="plus-icon">+</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LeftBar;
