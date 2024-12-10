import React from 'react';
import '../Css/DocenteLogin.css';
import logo from '../../../componentes/Logo.png'; 
import Login from '../../../componentes/Login';

const DocenteLogin = () => {
  return (
    <div className="Docente-login-container">
    <img src={logo} className="App-logo" alt="logoa" />
      <div className="Login">
            <Login/>
        <p>¿Has olvidado la contraseña?</p>
      </div>
    </div>
  );
};

export default DocenteLogin;