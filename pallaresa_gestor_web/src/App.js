import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { AdminProvider } from './context/AdminContext';
import { UserProvider } from './context/UserContext';
import DocenteLogin from './Pages/Docente/JS/DocenteLogin';
import { GenericLobby } from './Pages/Others/Js/GenericLobby';
import { AdminLogin } from './Pages/Admin/JS/AdminLogin';
import { AdminFolderScreen } from './Pages/Admin/JS/AdminFolderScreen';
import DocenteFolderScreen from './Pages/Docente/JS/DocenteFolderScreen';
import PruebaUsuario, { RegistrarUsuario } from './Pages/Admin/JS/PruebaUsuario';
import { ProtectedRoutesDocente, ProtectedRoutesAdmin } from './context/ProtectedRoutes';

function App() {

  const [correoUsuario, setCorreoUsuario] = useState(null);

  useEffect(() => {
    const correoGuardado = localStorage.getItem("correoUsuario");
    if (correoGuardado) {
      setCorreoUsuario(correoGuardado);
    }
  }, []);

  return (
    <div className="App">
      <UserProvider>
        <AdminProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<GenericLobby />} />
              <Route path="/docente" element={<DocenteLogin />} />
              <Route path="/admin" element={<AdminLogin />} />

              {/* Rutas protegidas para Admin */}
              <Route element={<ProtectedRoutesAdmin />}>
                <Route path="/admin/folder" element={<AdminFolderScreen />} />
              </Route>

              {/* Rutas protegidas para Docente */}
              <Route element={<ProtectedRoutesDocente />}>
                <Route path="/docente/folder" element={<DocenteFolderScreen />} />
              </Route>

              {/* Ruta adicional para registrar usuario */}
              <Route path='/registrar' element={<PruebaUsuario />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </UserProvider>
    </div>
  );
}

export default App;
