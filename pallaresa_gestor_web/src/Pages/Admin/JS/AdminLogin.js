import React, { useState } from 'react';
import '../Css/AdminLogin.css';
import logo from '../../../componentes/Logo.png';
import { LeftBar } from '../../../componentes/JS/LeftBar.js';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.0.47:3000/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: email, contraseña: password }),
      });
      

      const data = await response.json();
      if (data.success) {
        alert(`Bienvenido, ${data.nombre}`);
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className='adminLogin'>
      <div className='admin-login-container'>
        <img src={logo} alt="Logo" className='admin-login-logo' />
        <input
          type="email"
          placeholder="Enter email"
          className='admin-login-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          className='admin-login-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='admin-login-button' onClick={handleLogin}>
          Login
        </button>
        <div><br/><br/><br/><br/></div>
      </div>
    </div>
  );
};
