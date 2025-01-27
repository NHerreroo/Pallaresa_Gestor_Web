import React from 'react';
import '../Css/DocenteFolderScreen.css';
import { LeftBar } from '../../../componentes/JS/LeftBar.js';
import {TopBarDocente } from '../../../componentes/JS/TopBarDocente.js';
import { User_IconButton } from '../../../componentes/JS/User_Icon.js';

export const DocenteFolderScreen = () => {
  return (
    <div className='docenteFolder'>
     <div className='docente-folder-container'></div>
        <LeftBar/>
        <TopBarDocente/>
        <User_IconButton/>
    </div>
  );
};
