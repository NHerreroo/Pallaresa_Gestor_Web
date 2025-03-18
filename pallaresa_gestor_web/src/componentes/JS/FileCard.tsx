import React from "react";
import "../Css/FileCard.css";
import EditarArchivos from "./EditarArchivos";
import EditButton from "./EditButton";

interface FileCardProps {
  nombre: string;
  enlace: string;
  esCarpeta: boolean;
}

const FileCard: React.FC<FileCardProps> = ({ nombre, enlace, esCarpeta }) => {
  return (
    <div className="file-card">
      {/* Pasar los valores del archivo a EditButton */}
      <EditButton
        PageComponent={EditarArchivos}
        nombre={nombre}
        enlace={enlace}
        esCarpeta={esCarpeta}
      />
      <div
        className="file-icons-container"
        onClick={() => window.open(enlace, "_blank")}
      >
        <div className="file-icons">{esCarpeta ? "📂" : "📄"}</div>
      </div>
      <p className="file-name" onClick={() => window.open(enlace, "_blank")}>
        {nombre}
      </p>
    </div>
  );
};

export default FileCard;