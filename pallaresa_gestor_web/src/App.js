import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DocenteLogin from './Pages/Docente/JS/DocenteLogin';
import { GenericLobby } from './Pages/Others/Js/GenericLobby';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GenericLobby />} />
          <Route path="/docente" element={<DocenteLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
