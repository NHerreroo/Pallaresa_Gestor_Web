import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import TopBar from '../../../componentes/JS/TopBar.js';
import { LeftBar } from '../../../componentes/JS/LeftBar.js';
import PlusButton from '../../../componentes/JS/PlusButton.js';
import SearchBar from '../../../componentes/JS/search-bar.js'; 
import '../Css/BuscarUsuarios.css';
import '../../../componentes/Css/LeftBar.css';
import CrearUsuario from './CrearUsuario.js';
import User_IconButton from '../../../componentes/JS/User_Icon.js';

const BuscarUsuarios = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(["ROL 1", "ROL 2", "ROL 3"]);

  // Obtener usuarios desde la API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/usuarios');
        const usuariosFormateados = response.data.map(user => ({
          name: user.nombre,
          role: user.rol,  // El rol ya viene asignado desde el backend
          email: user.correo
        }));
        setUsers(usuariosFormateados);
      } catch (error) {
        console.error('Error al obtener los usuarios', error);
      }
    };

    fetchUsuarios();
  }, []);

  // Filtrar usuarios por nombre o correo
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para agregar un nuevo rol
  const addRole = () => {
    const newRole = prompt("Ingrese el nombre del nuevo rol:");
    if (newRole) {
      setRoles([...roles, newRole]);
    }
  };

  return (
    <div className="main-container">
      <TopBar onSearch={setSearchQuery} />
      <User_IconButton />

      <div className="content-container">
        <div className="left-section">
          <LeftBar title="TODOS LOS USUARIOS" roles={roles} onAddRole={addRole} />
          <PlusButton PageComponent={CrearUsuario} />
        </div>

        <div className="users-container">
          <h1 className="search-title">Buscar usuarios</h1>
          <SearchBar onSearch={setSearchQuery} />

          {/* Lista de usuarios filtrados */}
          {filteredUsers.map((user, index) => (
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
                <button className="action-button">...</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuscarUsuarios;
