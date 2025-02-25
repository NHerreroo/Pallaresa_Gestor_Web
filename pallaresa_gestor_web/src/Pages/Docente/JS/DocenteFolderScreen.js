"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { LeftBar } from "../../../componentes/JS/LeftBar.js"
import { TopBarDocente } from "../../../componentes/JS/TopBarDocente.js"
import { User_IconButton } from "../../../componentes/JS/User_Icon.js"
import FileCard from "../../../componentes/JS/FileCard.tsx"
import "../Css/DocenteFolderScreen.css"

const DocenteFolderScreen = () => {
  const [ficheros, setFicheros] = useState([])

  useEffect(() => {
    const fetchFicheros = async () => {
      try {
        const response = await axios.get("http://localhost:3001/docente/folder")
        setFicheros(response.data)
      } catch (error) {
        console.error("Error al obtener los ficheros:", error)
      }
    }

    fetchFicheros()
  }, [])

  return (
    <div className="docente-folder">
      <LeftBar />
      <div className="docente-folder-main">
        <TopBarDocente />
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

export default DocenteFolderScreen

