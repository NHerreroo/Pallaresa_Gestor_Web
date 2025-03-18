import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const portalRoot = document.createElement('div');
portalRoot.setAttribute('id', 'portal-root');
document.body.appendChild(portalRoot);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <App />
);

reportWebVitals();
// 