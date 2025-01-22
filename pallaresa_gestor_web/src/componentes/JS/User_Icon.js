import React from 'react'
import '../Css/User_Icon.css';
import imagen from '../DefaultIcono.jpg';

export const User_IconButton = () => {
  return (
    <div className='group'>
    <div className='Icono'>
       <img src={imagen} alt="UsersButton"/>
    </div>
    <div className='texto'>
        Usuario
    </div>
    </div>
  );
};