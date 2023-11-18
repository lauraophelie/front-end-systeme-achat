import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'


import Login from './pages/Login'
import Besoin from './pages/Besoin';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Header from './components/Header';
import ArticleBesoins from './components/ArticleBesoin';

function App({ children }) {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="header" element={<Header />}>
          <Route path="besoin" element={<Besoin />} />
          <Route path="besoin_articles" element={<ArticleBesoins />} />
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
