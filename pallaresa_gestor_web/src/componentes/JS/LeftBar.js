import React from 'react';
import '../Css/LeftBar.css';

const LeftBar = ({ title, roles }) => {
  return (
    <div className="Barra">
      <h2 className="leftbar-title">{title}</h2>
      <div className="cajaRuta">
        {roles.map((role, index) => (
          <p key={index} className="role-title">{role}</p>
        ))}
      </div>
    </div>
  );
};

export default LeftBar;
