import React, { useEffect, useState } from 'react';
import '../Css/User_Icon.css';
import imagen from '../DefaultIcono.jpg';
import useLogout from './useLogout';

export const User_IconButton = () => {
  const [correoUsuario, setCorreoUsuario] = useState(localStorage.getItem("correoUsuario") || "");

  useEffect(() => {
    const handleStorageChange = () => {
      setCorreoUsuario(localStorage.getItem("correoUsuario") || "");
    };

    

    // Escuchar cambios en localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  
  const logout = useLogout();
  
  return (
    <div className='group'>
      <div className='Icono'>
        <button onClick={logout}>
          <img src={imagen} alt="UsersButton"/>
        </button>
      </div>
      <div className='texto'>
        {correoUsuario ? correoUsuario : "Usuario"}
      </div>
    </div>
  );
};

export default User_IconButton;