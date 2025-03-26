import React, { useState, useEffect } from "react";
import { X, Save, Loader2 } from 'lucide-react';
import "../Css/ImplementarRol.css";

export const ImplementarRol = ({ onClose, onRolCreated }) => {
  const [nombreRol, setNombreRol] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [esExito, setEsExito] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Manejar clic fuera del modal para cerrar
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const validateForm = () => {
    if (!nombreRol.trim()) {
      setMensaje("El nombre del rol es obligatorio.");
      setEsExito(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMensaje("");

    try {
      const response = await fetch("http://localhost:3001/api/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombreRol.trim(),
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMensaje("✅ Rol insertado correctamente.");
        setEsExito(true);
        setNombreRol("");
        
        // Notificar al componente padre si existe la función
        if (typeof onRolCreated === 'function') {
          onRolCreated({
            id: data.id || Date.now(), // Usar ID de la respuesta o generar uno temporal
            nombre: nombreRol.trim()
          });
        }

        // Cerrar el modal después de 2 segundos
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setMensaje(`❌ Error: ${data.error || 'No se pudo crear el rol'}`);
        setEsExito(false);
      }
    } catch (error) {
      console.error("Error al insertar rol:", error);
      setMensaje("❌ Hubo un error al guardar el rol. Comprueba tu conexión.");
      setEsExito(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNombreRol(e.target.value);
    if (touched) {
      validateForm();
    }
  };

  return (
    <div className="modal-container-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div 
        className={`modal-box ${isMobile ? 'mobile' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">Agregar Rol</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form className="modal-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="nombreRol">Nombre del Rol:</label>
              <input
                id="nombreRol"
                type="text"
                value={nombreRol}
                onChange={handleInputChange}
                onBlur={() => setTouched(true)}
                className={`modal-input ${touched && !nombreRol.trim() ? 'input-error' : ''}`}
                placeholder="Ingrese el nombre del rol"
                disabled={isLoading}
                autoFocus
                aria-required="true"
              />
              {touched && !nombreRol.trim() && (
                <p className="input-error-message">Este campo es obligatorio</p>
              )}
            </div>
            
            {mensaje && (
              <div className={`confirmation-message ${esExito ? "success" : "error"}`}>
                {mensaje}
              </div>
            )}

            <div className="modal-footer">
              <button 
                type="button" 
                className="modal-button cancel-button" 
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="modal-button save-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="spinner" /> 
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save size={16} /> 
                    Guardar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImplementarRol;
