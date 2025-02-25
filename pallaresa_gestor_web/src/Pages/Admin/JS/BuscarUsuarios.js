import React, { useState } from 'react';
import TopBar from '../../../componentes/JS/TopBar.js'; // Importa el componente TopBar
import { LeftBar } from '../../../componentes/JS/LeftBar.js'; // Importa el componente LeftBar
import PlusButton from '../../../componentes/JS/PlusButton.js'; // Importa el componente PlusButton
import UsuarioItem from '../JS/UsuarioItem.js'; 
import '../Css/BuscarUsuarios.css';

const BuscarUsuario = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const users = [
    {
      name: "Colomar Colomar",
      role: "DIRECTOR",
      email: "correo.correo@pallaerea.com"
    },
    {
      name: "NOMBRE USUARIO",
      role: "DOCENTE", 
      email: "correo.correo@pallaerea.com"
    },
    {
      name: "NOMBRE USUARIO",
      role: "DOCENTE",
      email: "correo.correo@pallaerea.com"
    },
    {
      name: "NOMBRE USUARIO", 
      role: "DOCENTE",
      email: "correo.correo@pallaerea.com"
    },
    {
      name: "NOMBRE USUARIO",
      role: "DOCENTE", 
      email: "correo.correo@pallaerea.com"
    },
    {
      name: "NOMBRE USUARIO",
      role: "DOCENTE",
      email: "correo.correo@pallaerea.com"
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-container">
      {/* TopBar */}
      <TopBar onSearch={(query) => setSearchQuery(query)} />

      {/* Contenedor principal */}
      <div className="content-container">
        {/* LeftBar y PlusButton */}
        <div className="left-section">
          <LeftBar />
          <PlusButton /> {/* Agrega el botón circular aquí */}
        </div>

        {/* Contenido principal (lista de usuarios) */}
        <div className="users-container">
          <h1 className="search-title">Buscar usuarios</h1>
          {users.map((user, index) => (
            <div key={index} className="user-card">
              <div className="user-info">
                <div className="user-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="user-details">
                  <p className="user-name">{user.name}</p>
                  <span className={`role-badge ${user.role === "DIRECTOR" ? "director" : "docente"}`}>
                    {user.role}
                  </span>
                </div>
              </div>
              
              <div className="user-actions">
                <span className="user-email">{user.email}</span>
                <button className="action-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuscarUsuario;