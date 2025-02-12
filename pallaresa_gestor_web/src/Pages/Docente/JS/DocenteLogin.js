import React, { useState } from 'react';
import '../Css/DocenteLogin.css';
import logo from '../../../componentes/Logo.png'; 
import axios from 'axios';
import { useUser } from '../../../context/UserContext';

const DocenteLogin = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const {setUser} = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/docente", { correo, contraseña });

      setMensaje(`Bienvenido, ${response.data.nombre}`);
      setUser(true);
    } catch (error) {
      setMensaje(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="Docente-login-container">
      <img src={logo} className="App-logo" alt="logoa" />
      <div className="LoginC">
          <input 
            type="email" 
            placeholder="Enter email" 
            className='docente-login-input' 
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Enter password" 
            className='docente-login-input' 
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <button className='docente-login-button' onClick={handleLogin}>
            Iniciar Sesión
          </button>
          {mensaje && <p className="login-message">{mensaje}</p>}
      </div>
    </div>
  );
};

export default DocenteLogin;