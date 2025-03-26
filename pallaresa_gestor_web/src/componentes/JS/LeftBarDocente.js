import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/LeftBar.css';

const LeftBarDocente = () => {
  const [roles, setRoles] = useState([{ nombre: 'DOCENTE' }]); // Default role
  const [searchQuery, setSearchQuery] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState(null);

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem('correoUsuario');
    if (storedEmail) {
      setCorreoUsuario(storedEmail);
      console.log('User email from storage:', storedEmail);
    } else {
      console.warn('No email found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!correoUsuario) {
        console.log('No email available, using default DOCENTE role');
        return;
      }

      try {
        console.log('Fetching roles for:', correoUsuario);
        const response = await axios.get('http://localhost:3001/api/user-roles', {
          params: { correo: correoUsuario }
        });

        console.log('Roles API response:', response.data);

        // Transform and validate roles data
        const validRoles = response.data && Array.isArray(response.data)
          ? response.data.filter(role => role.nombre) // Ensure each role has a nombre
          : [{ nombre: 'DOCENTE' }];

        // Ensure we always have at least DOCENTE
        const finalRoles = validRoles.length > 0 
          ? validRoles 
          : [{ nombre: 'DOCENTE' }];

        setRoles(finalRoles);
        
      } catch (error) {
        console.error('Error fetching roles:', {
          message: error.message,
          response: error.response?.data,
          user: correoUsuario
        });
        setRoles([{ nombre: 'DOCENTE' }]);
      }
    };

    fetchRoles();
  }, [correoUsuario]);

  const filteredRoles = roles.filter(role => 
    role.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="leftbar">
      <div className="roles-header">
        <h2>ROLES</h2>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar roles..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="roles-list">
        {filteredRoles.map((role, index) => (
          <div key={`${role.nombre}-${index}`} className="role-item">
            {role.nombre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftBarDocente;