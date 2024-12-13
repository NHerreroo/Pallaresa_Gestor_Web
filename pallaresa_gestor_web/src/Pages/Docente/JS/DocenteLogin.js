import React from 'react';
import '../Css/DocenteLogin.css';
import logo from '../../../componentes/Logo.png'; 
import Login from '../../../componentes/JS/Login.js'
import { PlusButton } from '../../../componentes/JS/PlusButton.js';
import { FolderButton } from '../../../componentes/JS/FolderButton.js';
import { UserButton } from '../../../componentes/JS/UserButton.js';

const DocenteLogin = () => {
  return (
    <div className="Docente-login-container">
      <img src={logo} className="App-logo" alt="logoa" />
      <div className="LoginC">
            <Login/>
            <UserButton/>
      </div>
    </div>
  );
};

export default DocenteLogin;