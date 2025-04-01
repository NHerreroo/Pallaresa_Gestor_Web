import { useState, useEffect } from "react"
import axios from "axios"
import "../Css/LeftBar.css";
import ImplementarRol from "../../Pages/Admin/JS/ImplementarRol.js"; // Popup de roles
import Eliminar_rol from "./Eliminar_rol.js";

const LeftBar = () => {
  const [roles, setRoles] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/roles")
      .then((response) => {
        setRoles(response.data)
      })
      .catch((error) => {
        console.error("Error al obtener los roles:", error)
      })
  }, [])


  const closeModal = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsModalOpen(false);
    }
  };

  const filteredRoles = roles.filter((role) => role.nombre.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="leftbar">
      {/* ROLES header */}
      <div className="roles-header">
        <h2>ROLES</h2>
      </div>

      {/* Search */}
      <div className="search-container">
        <div className="search-icon">
          <svg viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar roles..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Add role button */}
      <div className="add-role-container">
        <button className="add-role-button" onClick={() => setIsModalOpen(true)}>
          <svg className="plus-icon" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Agregar rol</span>
        </button>
      {/* Modal para agregar roles */}
      {isModalOpen && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setIsModalOpen(false)}>✖</button>
            <ImplementarRol onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      </div>

      {/* Roles list */}
      <div className="roles-list">
        {filteredRoles.length > 0 ? (
          filteredRoles.map((role, index) => (
            <div key={role.id || index} className="role-item">
              <span className="role-name">{role.nombre}</span>
              <Eliminar_rol nombre={role.nombre} />
            </div>
          ))
        ) : (
          <div className="no-roles">No se encontraron roles</div>
        )}
      </div>
    </div>
  )
}

export default LeftBar

