/* eslint-disable react/prop-types */
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
import SaisieProforma from './pages/achat/SaisieProforma';
import MoinsDisant from './pages/achat/MoinsDisant';
import GenerateBonCommande from './pages/achat/GenerateBonCommande';

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
          <Route path="details_besoin" element={<FicheBesoin />} />

          <Route path="achat/bons_commande" element={<GenerateBonCommande />} />
          <Route path="achat/saisie_proforma" element={<SaisieProforma />}/>
          <Route path="achat/besoins_global" element={<ListeBesoinsGlobal />}/>
          <Route path="achat/moins_disant" element={<MoinsDisant />}/>
        </Route>
      </Routes>
      </BrowserRouter>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </>
  )
}

export default App;
