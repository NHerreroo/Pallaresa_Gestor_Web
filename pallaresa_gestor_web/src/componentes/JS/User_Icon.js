import React, { useEffect, useState } from 'react';
import '../Css/User_Icon.css';
import imagen from '../DefaultIcono.jpg';
import useLogout from './useLogout';
import ConfirmationModal from './ConfrimationModal.js'; // Import the custom modal component

export const User_IconButton = () => {
  const [correoUsuario, setCorreoUsuario] = useState(localStorage.getItem("correoUsuario") || "");

  useEffect(() => {
    const handleStorageChange = () => {
      setCorreoUsuario(localStorage.getItem("correoUsuario") || "");
    };

    // Listen for changes in localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Use the useLogout hook
  const { confirmLogout, logout, showConfirmation, cancelLogout } = useLogout();

  return (
    <div className='group'>
      <div className='Icono'>
        {/* Use confirmLogout in the onClick handler */}
        <button onClick={confirmLogout}>
          <img src={imagen} alt="UsersButton" />
        </button>
      </div>
      <div className='texto'>
        {correoUsuario ? correoUsuario : "Usuario"}
      </div>

      {/* Render the confirmation modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onConfirm={logout}
        onCancel={cancelLogout}
        message="¿Estás seguro de cerrar sesión?"
      />
    </div>
  );
};

export default User_IconButton;