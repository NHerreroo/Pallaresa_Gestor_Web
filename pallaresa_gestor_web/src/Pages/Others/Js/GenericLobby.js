import React from 'react'
import '../Css/GenericLobby.css';
import { ButtonComp } from '../../../componentes/JS/ButtonComp';

export const GenericLobby = () => {
  return (
    <div className='GenericLobbyBody'>
        <div className='SelectionContainer'>
          <ButtonComp text={"Admin"}></ButtonComp>
          <ButtonComp text={"Docente"}></ButtonComp>
        </div>
    </div>
  )
}
