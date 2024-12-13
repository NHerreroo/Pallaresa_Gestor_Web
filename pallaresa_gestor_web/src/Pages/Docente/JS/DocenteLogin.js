import React from 'react';
import '../Css/DocenteLogin.css';
import logo from '../../../componentes/Logo.png'; 
import Login from '../../../componentes/JS/Login.js'

const DocenteLogin = () => {
  return (
    <div className="Docente-login-container">
      <img src={logo} className="App-logo" alt="logoa" />
      <div className="LoginC">
            <Login/>
      </div>
    </div>
  );
};

export default DocenteLogin;