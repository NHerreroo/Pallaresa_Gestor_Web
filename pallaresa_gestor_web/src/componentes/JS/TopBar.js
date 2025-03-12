import React from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation
import '../Css/TopBar.css';
import { UserButton } from '../JS/UserButton.js';
import { FolderButton } from '../JS/FolderButton.js';

export const TopBar = () => {
  const location = useLocation(); // Obtiene la ruta actual

  return (
    <div>
      <div className='TBarra'>
        {/* Muestra UserButton si NO estamos en "/buscar-usuarios" */}
        <div className={`BotonU ${location.pathname === '/admin/users' ? 'hidden' : ''}`}>
          <UserButton />
        </div>
        {/* Muestra FolderButton SI estamos en "/buscar-usuarios" */}
        <div className={`BotonF ${location.pathname === '/admin/users' ? '' : 'hidden'}`}>
          <FolderButton />
        </div>
      </div>
    </div>
  );
};

export default TopBar;