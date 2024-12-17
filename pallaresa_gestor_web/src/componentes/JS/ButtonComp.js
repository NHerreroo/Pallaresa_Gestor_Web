import React from 'react'
import '../Css/ButtonComp.css';
import { useNavigate } from "react-router-dom";

export const ButtonComp = ({ text, route }) => {
  const navigate = useNavigate();
  return (
    <button type="button" className='ButtonComponent' onClick={()=>navigate(route)}>{text}</button>
  );
};
