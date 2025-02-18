import '../Css/DocenteFolderScreen.css';
import { LeftBar } from '../../../componentes/JS/LeftBar.js';
import {TopBarDocente } from '../../../componentes/JS/TopBarDocente.js';
import { User_IconButton } from '../../../componentes/JS/User_Icon.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocenteFolderScreen = () => {
  const [ficheros, setFicheros] = useState([]);

  useEffect(() => {
    const fetchFicheros = async () => {
      try {
        const response = await axios.get('http://localhost:3001/docente/folder');
        setFicheros(response.data);
      } catch (error) {
        console.error('Error al obtener los ficheros:', error);
      }
    };

    fetchFicheros();
  }, []);

  return (
    <div className='docenteFolder'>
     <div className='docente-folder-container'>
      <div className='item-list'>
          <h1>Lista de Ficheros</h1>
          <ul>
            {ficheros.map((fichero) => (
              <li key={fichero.nombre}>
                <strong>{fichero.nombre}</strong> - {fichero.enlace} - {fichero.carpeta ? 'Carpeta' : 'Archivo'}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <LeftBar/>
      <TopBarDocente/>
      <User_IconButton/>
    </div>
  );
};

export default DocenteFolderScreen;