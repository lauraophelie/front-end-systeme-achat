import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'


import Login from './pages/Login'
import Besoin from './pages/Besoin';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="besoin" element={<Besoin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
