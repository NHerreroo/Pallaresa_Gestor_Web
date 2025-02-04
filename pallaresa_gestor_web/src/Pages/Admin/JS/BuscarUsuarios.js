import { useState } from "react";
import "./BuscarUsuarios.css";
import { ButtonComp } from "../componentes/JS/ButtonComp";

const users = [
  { name: "Colomar Colomar", role: "DIRECTOR", email: "correo.correro@pallaresa.com", roleClass: "role-director" },
  { name: "NOMBRE USUARIO", role: "DOCENTE", email: "correo.correro@pallaresa.com", roleClass: "role-docente" },
  { name: "NOMBRE USUARIO", role: "DOCENTE", email: "correo.correro@pallaresa.com", roleClass: "role-docente" },
];

export default function BuscarUsuarios() {
  const [search, setSearch] = useState("");

  return (
    <div className="container">
      <aside className="sidebar">
        <h2 className="title">TODOS LOS USUARIOS</h2>
        <nav>
          <ul>
            <li>ROL 1</li>
            <li>ROL 2</li>
            <li>ROL 3</li>
          </ul>
        </nav>
        <ButtonComp text="Agregar" route="/crear-usuario" />
      </aside>
      <main className="main-content">
        <h1 className="header">ROLX/Buscar usuarios</h1>
        <div className="search-bar">
          <SearchIcon />
          <input
            type="text"
            placeholder="Buscar usuarios"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="user-list">
          {users.filter(user => user.name.toLowerCase().includes(search.toLowerCase())).map((user, index) => (
            <div key={index} className="user-card">
              <div className="user-info">
                <UserIcon />
                <div>
                  <p className="user-name">{user.name}</p>
                  <p className="user-email">{user.email}</p>
                </div>
              </div>
              <span className={`role-tag ${user.roleClass}`}>{user.role}</span>
              <SettingsIcon className="settings-icon" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
