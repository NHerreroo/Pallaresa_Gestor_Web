import React from 'react';
import '../Css/AdminFolderScreen.css';
import { LeftBar } from '../../../componentes/JS/LeftBar.js';
import { TopBar } from '../../../componentes/JS/TopBar.js';
import { User_IconButton } from '../../../componentes/JS/User_Icon.js';
import { PlusButton } from '../../../componentes/JS/PlusButton.js';

export const AdminFolderScreen = () => {
  return (
    <div className='adminFolder'>
     <div className='admin-folder-container'></div>
        <LeftBar/>
        <TopBar/>
        <User_IconButton/>
        <PlusButton/>
    </div>
  );
};
