import React from 'react';
import '../Css/AdminLogin.css';
import logo from '../../../componentes/Logo.png'; // Asegúrate de importar tu logo aquí


export const AdminLogin = () => {
  return (
    <div className='adminLogin'>
      <div className='admin-login-container'>
        <img src={logo} alt="Logo" className='admin-login-logo' />
        <input type="email" placeholder="Enter email" className='admin-login-input' />
        <input type="password" placeholder="Enter password" className='admin-login-input' />
        <button className='admin-login-button'>Login</button>
      </div>
    </div>
  );
};
