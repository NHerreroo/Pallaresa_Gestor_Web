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
        
        // Agrupar los roles por usuario
        const usuariosAgrupados = response.data.reduce((acc, user) => {
          const existingUser = acc.find(u => u.email === user.correo);
          if (existingUser) {
            existingUser.roles.push(user.rol); // Agregar rol al usuario existente
          } else {
            acc.push({
              name: user.nombre,
              email: user.correo,
              roles: [user.rol] // Crear un array de roles
            });
          }
          return acc;
        }, []);
  
        setUsers(usuariosAgrupados);
      } catch (error) {
        console.error('Error al obtener los usuarios', error);
      }
    };
    fetchUsuarios();

    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/roles');
        setRoles(response.data); 
      } catch (error) {
        console.error('Error al obtener los roles', error);
      }
    };
  
    fetchRoles();

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
      setSelectedUser({
        ...user,
        roles: [...user.roles]
      });
      setPopupVisible(true);
      setConfirmDelete(false);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedUser(null);
    setConfirmDelete(false);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/usuarios/${selectedUser.email}`, {
        nombre: selectedUser.name,
        roles: selectedUser.roles
      });
  
      setUsers(users.map(user => 
        user.email === selectedUser.email ? { ...user, name: selectedUser.name, role: selectedUser.roles.join(", ") } : user
      ));
  
      closePopup();
    } catch (error) {
      console.error('Error al guardar usuario', error);
    }
  };

const handleDelete = async () => {
  if (confirmDelete) {
    try {
      await axios.delete(`http://localhost:3001/api/usuarios/${selectedUser.email}`);
      setUsers(users.filter(user => user.email !== selectedUser.email));
      closePopup();
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
  } else {
    setConfirmDelete(true);
  }
};

const handleRoleChange = (roleName) => {
  setSelectedUser(prev => {
    const hasRole = prev.roles.includes(roleName);
    return {
      ...prev,
      roles: hasRole ? prev.roles.filter(r => r !== roleName) : [...prev.roles, roleName]
    };
  });
};

  return (
    <div className="main-container">
   
      <User_IconButton />
      <div className="content-container">
      <TopBar onSearch={setSearchQuery} />
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
                <div className="role-badges">
                {user.roles.map((role, i) => (
                  <span key={i} className="role-badge bg-green-500 text-white px-2 py-1 rounded-full">
                    {role}
                  </span>
                ))}
                </div>
              </div>
            </div>
            <div className="user-actions">
              <span className="user-email">{user.email}</span>
              <button 
                className="action-button" 
                onClick={() => openEditPopup(user)}
                disabled={user.roles.includes('ADMINISTRADOR')}
                title={user.roles.includes('ADMINISTRADOR') ? "No se puede editar un administrador" : "Editar usuario"}
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
                    <label>Roles:</label>
                    <div className="roles-container">
                    {roles.map(role => (
                    <label key={role.nombre} className="role-item">
                      <input
                        type="checkbox"
                        checked={selectedUser.roles.includes(role.nombre)}
                        onChange={() => handleRoleChange(role.nombre)}
                      />
                      {role.nombre} {/* Aquí se usa role.nombre en lugar de role directamente */}
                    </label>
                  ))}
                </div>

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







