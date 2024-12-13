import React from 'react'
import '../Css/ButtonComp.css';
import { useNavigate } from "react-router-dom";

export const ButtonComp = ({ text }) => {
  return (
    <button type="button" className='ButtonComponent'>{text}</button>
  );
};
