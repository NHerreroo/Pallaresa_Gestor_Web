import React from 'react';
import '../Css/UserButton.css';
import imagen from '../UsersFour.png';
import { useNavigate } from "react-router-dom";

export const UserButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className='UserB'
      onClick={() => navigate("/admin/users")} // Envuelve navigate en una función
    >
      <img src={imagen} alt="UsersButton" />
    </button>
  );
};