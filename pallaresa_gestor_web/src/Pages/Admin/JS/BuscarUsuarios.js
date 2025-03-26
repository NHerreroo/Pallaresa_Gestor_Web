import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../../../componentes/JS/TopBar.js';
import LeftBar from '../../../componentes/JS/LeftBar.js';
import PlusButton from '../../../componentes/JS/PlusButton.js';
import SearchBar from '../../../componentes/JS/search-bar.js'; 
import '../Css/BuscarUsuarios.css';
import '../../../componentes/Css/LeftBar.css';
import CrearUsuario from './CrearUsuario.js';
import User_IconButton from '../../../componentes/JS/User_Icon.js';
import { Edit, X, Save, MoreHorizontal, User, Trash2, AlertTriangle } from 'lucide-react';

const BuscarUsuarios = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(["ROL 1", "ROL 2", "ROL 3"]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/usuarios');
        const usuariosFormateados = response.data.map(user => ({
          name: user.nombre,
          role: user.rol,
          email: user.correo
        }));
        setUsers(usuariosFormateados);
      } catch (error) {
        console.error('Error al obtener los usuarios', error);
      }
    };
    fetchUsuarios();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addRole = () => {
    const newRole = prompt("Ingrese el nombre del nuevo rol:");
    if (newRole) {
      setRoles([...roles, newRole]);
    }
  };

  const openEditPopup = (user) => {
    if (user.role !== 'ADMINISTRADOR') {
      setSelectedUser(user);
      setPopupVisible(true);
      setConfirmDelete(false);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedUser(null);
    setConfirmDelete(false);
  };

  const handleSave = () => {
    // Aquí podrías agregar una llamada a la API para actualizar el usuario
    setUsers(users.map(user => user.email === selectedUser.email ? selectedUser : user));
    closePopup();
  };

  const handleDelete = () => {
    if (confirmDelete) {
      // Aquí podrías agregar una llamada a la API para eliminar el usuario
      setUsers(users.filter(user => user.email !== selectedUser.email));
      closePopup();
    } else {
      setConfirmDelete(true);
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
          {filteredUsers.map((user, index) => (
            <div key={index} className="user-card">
              <div className="user-info">
                <div className="user-avatar">
                  <User size={20} />
                </div>
                <div className="user-details">
                  <p className="user-name">{user.name}</p>
                  <span className={`role-badge ${user.role === "ADMINISTRADOR" ? "administrador" : 
                                                user.role === "DIRECTOR" ? "director" : 
                                                user.role === "EDITOR" ? "editor" : "usuario"}`}>
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="user-actions">
                <span className="user-email">{user.email}</span>
                <button 
                  className="action-button" 
                  onClick={() => openEditPopup(user)}
                  disabled={user.role === 'ADMINISTRADOR'}
                  title={user.role === 'ADMINISTRADOR' ? "No se puede editar un administrador" : "Editar usuario"}
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Edición Mejorado */}
      {popupVisible && selectedUser && (
        <div className="modal-overlay" onClick={closePopup}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar Usuario</h2>
              <button className="close-button" onClick={closePopup}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {confirmDelete ? (
                <div className="delete-confirmation">
                  <div className="alert-icon">
                    <AlertTriangle size={48} />
                  </div>
                  <h3>¿Estás seguro?</h3>
                  <p>Esta acción eliminará permanentemente a <strong>{selectedUser.name}</strong> y no se puede deshacer.</p>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="userName">Nombre:</label>
                    <input
                      id="userName"
                      type="text"
                      value={selectedUser.name}
                      onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="userRole">Rol:</label>
                    <select
                      id="userRole"
                      value={selectedUser.role}
                      onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                      className="form-select"
                    >
                      {roles.map((role, index) => (
                        <option key={index} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="userEmail">Email:</label>
                    <input
                      id="userEmail"
                      type="email"
                      value={selectedUser.email}
                      disabled
                      className="form-input disabled"
                    />
                    <small>El email no se puede modificar</small>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              {confirmDelete ? (
                <>
                  <button className="cancel-button" onClick={() => setConfirmDelete(false)}>
                    Cancelar
                  </button>
                  <button className="delete-button confirm" onClick={handleDelete}>
                    <Trash2 size={16} /> Confirmar eliminación
                  </button>
                </>
              ) : (
                <>
                  <button className="delete-button" onClick={handleDelete}>
                    <Trash2 size={16} /> Eliminar
                  </button>
                  <div className="right-buttons">
                    <button className="cancel-button" onClick={closePopup}>
                      Cancelar
                    </button>
                    <button className="save-button" onClick={handleSave}>
                      <Save size={16} /> Guardar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuscarUsuarios;