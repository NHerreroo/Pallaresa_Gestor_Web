import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DocenteLogin from './Pages/Docente/JS/DocenteLogin';
import { GenericLobby } from './Pages/Others/Js/GenericLobby';
import { AdminLogin } from './Pages/Admin/JS/AdminLogind';
import PruebaUsuario from './Pages/Admin/JS/PruebaUsuario';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GenericLobby />} />
          <Route path="/docente" element={<DocenteLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/registrar" element={<PruebaUsuario/>} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
