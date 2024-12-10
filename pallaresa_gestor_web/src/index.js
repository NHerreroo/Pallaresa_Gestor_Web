import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ModalRol from './Admin/JS/ModalRol';
import CrearUsuario from './Admin/JS/CrearUsuario';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<App />
  //<CrearUsuario/>
  <ModalRol/>
);

reportWebVitals();
