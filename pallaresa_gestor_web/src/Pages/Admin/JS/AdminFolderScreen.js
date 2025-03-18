"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { LeftBar } from "../../../componentes/JS/LeftBar.js"
import {TopBar} from "../../../componentes/JS/TopBar.js"
import { User_IconButton } from "../../../componentes/JS/User_Icon.js"
import FileCard from "../../../componentes/JS/FileCard.tsx"
import "../Css/AdminFolderScreen.css"
import PlusButton from "../../../componentes/JS/PlusButton.js" 
import ImplementarArchivo from "./ImplementarArchivo.js"

const AdminFolderScreen = () => {
  const [ficheros, setFicheros] = useState([])
  const [correoUsuario, setCorreoUsuario] = useState(null)

  useEffect(() => {
    // Obtener el correo del usuario desde localStorage
    const correoGuardado = localStorage.getItem("correoUsuario")
    if (correoGuardado) {
      setCorreoUsuario(correoGuardado)
    }
  }, [])

  useEffect(() => {
    const fetchFicheros = async () => {
      if (!correoUsuario) return // Evita hacer la petición si no hay correo

      try {
        const response = await axios.get(`http://localhost:3001/docente/folder?correo=${correoUsuario}`)
        setFicheros(response.data)
      } catch (error) {
        console.error("Error al obtener los ficheros:", error)
      }
    }

    fetchFicheros()
  }, [correoUsuario]) // Se ejecuta cuando el correoUsuario cambia

  const roles = ["ROL 1", "ROL 2", "ROL 3"];
  
  return (
    <div className="docente-folder">
      <PlusButton PageComponent={ImplementarArchivo} />
      <LeftBar title="TODOS LOS USUARIOS" roles={roles} />
      <div className="docente-folder-main">
        <TopBar />
        <div className="docente-folder-content">
          <div className="file-grid">
            {ficheros.map((fichero) => (
              <FileCard
                key={fichero.nombre}
                nombre={fichero.nombre}
                enlace={fichero.enlace}
                esCarpeta={fichero.carpeta}
              />
            ))}
          </div>
        </div>
      </div>
      <User_IconButton />
    </div>
  )
}

export default AdminFolderScreen
