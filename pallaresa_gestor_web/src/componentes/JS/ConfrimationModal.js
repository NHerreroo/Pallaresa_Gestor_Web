import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <h3>Confirmar desconexión</h3>
        <p>{message}</p>
        <button onClick={onConfirm} style={{ marginRight: '10px' }}>Aceptar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;