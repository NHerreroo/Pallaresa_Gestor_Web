import React from 'react'
import '../Css/GenericLobby.css';
import { ButtonComp } from '../../../componentes/JS/ButtonComp';
import logo from '../../../componentes/Logo.png'; 


export const GenericLobby = () => {
  return (
    <div className='GenericLobbyBody'>
        <div className='SelectionContainer'>
          <img src={logo} className="logo" alt="logoa" />
          <h1>Benvingut</h1>
          <div className='GenericLobbyButtons'>
            <ButtonComp text={"Admin"} route={"/admin"} ></ButtonComp>
            <ButtonComp text={"Docente"} route={"/docente"}></ButtonComp>
          </div>
        </div>
    </div>
  )
}
