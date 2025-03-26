import React from "react";
import "../Css/FileCard.css";
import EditarArchivos from "./EditarArchivos";
import EditButton from "./EditButton";
import RemoveButton from "./Rol_remove_button";
interface FileCardProps {
  nombre: string;
  enlace: string;
  esCarpeta: boolean;
  nombre_rol: string;
  isAdminView?: boolean; // New optional prop
}

const FileCard: React.FC<FileCardProps> = ({ nombre, enlace, esCarpeta, nombre_rol, isAdminView }) => {
  return (
    <div className="file-card">
      <div className="file-actions-container">
        {isAdminView && ( 
          <EditButton
            PageComponent={EditarArchivos}
            nombre={nombre}
            enlace={enlace}
            esCarpeta={esCarpeta}
            rol={nombre_rol}
          />
        ) && ( <RemoveButton nombre={nombre} />)}
       
      </div>
      
      <div className="file-content">
        <div 
          className="file-icons-container"
          onClick={() => window.open(enlace, "_blank")}
        >
          <div className="file-icons">{esCarpeta ? "📂" : "📄"}</div>
        </div>
        <p 
          className="file-name" 
          onClick={() => window.open(enlace, "_blank")}
        >
          {nombre}
        </p>
      </div>
    </div>
  );
};

export default FileCard;