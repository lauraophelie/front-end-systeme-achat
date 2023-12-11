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
import FicheBonCommande from './pages/achat/FicheBonCommande';
import PDFView from './pdf/PDFView';
import BonCommande from './pages/achat/BonCommande';
import BonReception from './pages/achat/BonReception';
import ArticlesBonReception from './pages/achat/ArticlesBonReception';
import EntreeStock from './pages/magasin/EntreeStock';
import EtatStock from './pages/magasin/EtatStock';
import BonEntree from './pages/magasin/BonEntree';
import ListeBonReception from './pages/achat/ListeBonReception';
import FicheBonReception from './pages/achat/FicheBonReception';
import FicheBonEntree from './pages/magasin/FicheBonEntree';

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
          <Route path="achat/details_bon_commande" element={<FicheBonCommande />} />
          <Route path="achat/generate_bon_commande" element={<BonCommande />} />
          <Route path="achat/generate_bon_reception" element={<BonReception />} />
          <Route path="achat/articles_bon_reception" element={<ArticlesBonReception />} />
          <Route path="achat/bons_reception" element={<ListeBonReception />} />
          <Route path="achat/details_bon_reception" element={<FicheBonReception />} />

          <Route path="magasin/entree_stock" element={<EntreeStock />} />
          <Route path="magasin/etat_stock" element={<EtatStock />} />
          <Route path="magasin/bon_entree" element={<BonEntree />} />
          <Route path="magasin/details_bon_entree" element={<FicheBonEntree />} />

          <Route path="pdf" element={<PDFView />} />
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
