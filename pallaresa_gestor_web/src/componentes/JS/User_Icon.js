import React, { useEffect, useState } from 'react';
import '../Css/User_Icon.css';
import imagen from '../DefaultIcono.jpg';

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

  return (
    <div className='group'>
      <div className='Icono'>
        <img src={imagen} alt="UsersButton"/>
      </div>
      <div className='texto'>
        {correoUsuario ? correoUsuario : "Usuario"}
      </div>
    </div>
  );
};

export default User_IconButton;