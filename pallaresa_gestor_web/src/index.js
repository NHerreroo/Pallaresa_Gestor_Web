import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ModalRol from './Pages/Admin/JS/ModalRol';
import CrearUsuario from './Pages/Admin/JS/CrearUsuario';
import EditarUsuario from './Pages/Admin/JS/EditarUsuario';

import { GenericLobby } from './Pages/Others/Js/GenericLobby';
import DocenteLogin from './Pages/Docente/JS/DocenteLogin';
import ImplementarArchivo from './Pages/Admin/JS/ImplementarArchivo';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<App />
<ImplementarArchivo/>
);

reportWebVitals();
