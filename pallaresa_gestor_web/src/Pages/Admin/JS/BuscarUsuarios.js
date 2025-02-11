import React, { useState } from 'react';
import {LeftBar} from '../../../componentes/JS/LeftBar.js'; 
import UsuarioItem from '../JS/UsuarioItem.js'; 
import '../Css/BuscarUsuarios.css';

const BuscarUsuario = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { name: 'Colomar Colomar', role: 'Director', email: 'correo.correo@pallaaerea.com' },
    { name: 'NOMBRE USUARIO', role: 'Docente', email: 'correo.correo@pallaaerea.com' },
    { name: 'NOMBRE USUARIO', role: 'Docente', email: 'correo.correo@pallaaerea.com' },
    { name: 'NOMBRE USUARIO', role: 'Docente', email: 'correo.correo@pallaaerea.com' }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="buscar-usuario-container">
      <LeftBar />
      <div className="buscar-usuario-content">
        <h1>Buscar usuarios</h1>
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="user-list">
          {filteredUsers.map((user, index) => (
            <UsuarioItem key={index} name={user.name} role={user.role} email={user.email} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuscarUsuario;
