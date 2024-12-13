import React from 'react'
import '../Css/UserButton.css';
import imagen from '../UsersFour.png';

export const UserButton = () => {
  return (
    <button type="button" className='UserB'>
       <img src={imagen} alt="UsersButton"/>
    </button>
  );
};