import React from 'react';
import '../Css/TopBar.css';
import {UserButton} from '../JS/UserButton.js';
import {FolderButton} from '../JS/FolderButton.js';


export const TopBar = () => {
  return (
    <div>
      <div className='TBarra'>
      <div className='BotonU'>
        <UserButton/>
      </div>
      <div className='BotonF'>
        <FolderButton/>
      </div>
      </div>
      </div>
  );
};