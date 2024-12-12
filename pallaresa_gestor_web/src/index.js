import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GenericLobby } from './Pages/Others/Js/GenericLobby';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<App />
  <GenericLobby/>

);

reportWebVitals();
