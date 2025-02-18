import React, { useState } from 'react';
import axios from 'axios';
import '../Css/AdminLogin.css';
import logo from '../../../componentes/Logo.png';
import { useAdmin } from '../../../context/AdminContext';


export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const {setAdmin} = useAdmin();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:3001/login", {
        correo: email,
        contraseña: password
      });

      if (response.data.message === "Login exitoso") {
        setMensaje(`Bienvenido, inicio de sesión exitoso`);
        setAdmin(true)
      }
    } catch (error) {
      setMensaje(error.response?.data?.message || "Error al iniciar sesión");
      console.error('Error:', error);
      setAdmin(false)
    }
  };

  return (
    <div className='adminLogin'>
      <div className='admin-login-container'>
        <div className='admin-login-content'>
          <img src={logo} alt="Logo" className='admin-login-logo' />
          <form onSubmit={handleLogin} className='admin-login-form'>
            <input
              type="email"
              placeholder="Enter email"
              className='admin-login-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter password"
              className='admin-login-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className='admin-login-button'>
              Login
            </button>
          </form>
          {mensaje && <p className="mensaje-login">{mensaje}</p>}
        </div>
      </div>
    </div>
  );
};