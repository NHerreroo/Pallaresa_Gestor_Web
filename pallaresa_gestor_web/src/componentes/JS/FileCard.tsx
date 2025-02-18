import React from "react"
import "../Css/FileCard.css"

interface FileCardProps {
  nombre: string
  enlace: string
  esCarpeta: boolean
}

const FileCard: React.FC<FileCardProps> = ({ nombre, enlace, esCarpeta }) => {
  return (
    <div className="file-card" onClick={() => window.open(enlace, "_blank")}>
      <div className="file-icon-container">
        <div className="file-icon">{esCarpeta ? "📂" : "📄"}</div>
      </div>
      <p className="file-name">{nombre}</p>
    </div>
  )
}

export default FileCard

