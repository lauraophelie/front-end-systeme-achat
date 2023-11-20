import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'


import Login from './pages/Login'
import Besoin from './pages/Besoin';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Header from './components/Header';
import DefArticleBesoin from './pages/DefArticleBesoin';
import ListeBesoins from './pages/ListeBesoins';
import FicheBesoin from './components/FicheBesoin';
import ListeBesoinsGlobal from './pages/ListeBesoinsGlobal';

function App({ children }) {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="header" element={<Header />}>
          <Route path="besoin" element={<Besoin />} />
          <Route path="liste_besoins" element={<ListeBesoins />} />
          <Route path="besoin_articles" element={<DefArticleBesoin />} />
          <Route path="besoins_global" element={<ListeBesoinsGlobal />} />
        </Route>
        <Route path="details_besoin" element={<FicheBesoin />} />
      </Routes>
      </BrowserRouter>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </>
  )
}

export default App;
