import React from 'react'
import '../Css/ButtonComp.css';

export const ButtonComp = ({ text }) => {
  return (
    <button type="button" className='ButtonComponent'>{text}</button>
  );
};
