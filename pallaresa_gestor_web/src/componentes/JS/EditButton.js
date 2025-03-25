import React, { useState } from "react";
import "../Css/EditButton.css";
import Portal from "./Portal"; 

export const EditButton = ({ PageComponent, nombre, enlace, esCarpeta, rol }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const closeOverlay = (e) => {
    if (e.target.classList.contains("overlay")) {
      setShowOverlay(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="Edit"
        onClick={() => setShowOverlay(true)}
      >
        <span className="options-icon">⋮</span>
      </button>
      {showOverlay && (
        <Portal>
          <div className="overlay" onClick={closeOverlay}>
            <div className="modal-content">
              <button
                className="close-btn"
                onClick={() => setShowOverlay(false)}
              >
                Close
              </button>
              {/* Pasar los valores del archivo a PageComponent */}
              <PageComponent
                nombre={nombre}
                enlace={enlace}
                esCarpeta={esCarpeta}
                onClose={() => setShowOverlay(false)} // Cerrar el modal después de editar
              />
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default EditButton;