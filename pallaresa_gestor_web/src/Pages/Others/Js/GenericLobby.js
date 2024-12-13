import React from 'react'
import '../Css/GenericLobby.css';
import { Button } from '../../../Components/Js/Button';

export const GenericLobby = () => {
  return (
    <div className='GenericLobbyBody'>
        <div className='SelectionContainer'>
            <Button text="Admin"></Button>
            <Button text="Docent"></Button>
        </div>
    </div>
  )
}
