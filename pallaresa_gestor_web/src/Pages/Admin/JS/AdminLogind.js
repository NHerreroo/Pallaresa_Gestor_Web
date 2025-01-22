import React from 'react';
import '../Css/AdminLogin.css';
import logo from '../../../componentes/Logo.png'; 
import { ButtonComp } from '../../../componentes/JS/ButtonComp';

export const AdminLogin = () => {
  return (
    <div className='adminLogin'>
      <div className='admin-login-container'>
        <img src={logo} alt="Logo" className='admin-login-logo' />
        <input type="email" placeholder="Enter email" className='admin-login-input' />
        <input type="password" placeholder="Enter password" className='admin-login-input' />
        <ButtonComp className='admin-login-button' text={"Admin"} route={"/admin/folder"} >Login</ButtonComp>
        <div><br/><br/><br/><br/></div>
      </div>
    </div>
  );
};
