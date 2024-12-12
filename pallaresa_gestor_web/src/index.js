import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { GenericLobby } from './Pages/Others/Js/GenericLobby';
import DocenteLogin from './Pages/Docente/JS/DocenteLogin';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<App />
  <DocenteLogin/>
);

reportWebVitals();
