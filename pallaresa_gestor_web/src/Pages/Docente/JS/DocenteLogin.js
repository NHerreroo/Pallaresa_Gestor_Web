import React from 'react';
import '../Css/DocenteLogin.css';
import logo from '../../../componentes/Logo.png'; 
import { ButtonComp } from '../../../componentes/JS/ButtonComp';

const DocenteLogin = () => {
  return (
    <div className="Docente-login-container">
      <img src={logo} className="App-logo" alt="logoa" />
      <div className="LoginC">
             <input type="email" placeholder="Enter email" className='docente-login-input' />
                    <input type="password" placeholder="Enter password" className='docente-login-input' />
                    <ButtonComp className='docente-login-button' text={"Docente"} route={"/docente/folder"} >Login</ButtonComp>
      </div>
    </div>
  );
};

export default DocenteLogin;