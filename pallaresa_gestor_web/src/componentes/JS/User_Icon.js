import React, { useEffect, useState } from 'react';
import '../Css/User_Icon.css';
import imagen from '../DefaultIcono.jpg';

export const User_IconButton = () => {
  const [correoUsuario, setCorreoUsuario] = useState('');

  useEffect(() => {
    const correoGuardado = localStorage.getItem("correoUsuario");
    if (correoGuardado) {
      setCorreoUsuario(correoGuardado);
    }
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
