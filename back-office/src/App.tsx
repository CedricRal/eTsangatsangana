import React from 'react';
import { Auth } from './page/auth'
import { Routes, Route } from 'react-router-dom'
import Home from './page/home'
import { Entreprise } from './components/entreprise/entreprise'
import { AjoutEtp } from './components/entreprise/ajout'
import { Publicité } from './components/publicités/publicité'
import { Liste } from './components/entreprise/liste'
import { Détails } from './components/entreprise/détails'
import { ListeProduit } from './components/produits/liste'
import { Produits } from './components/produits/produits'
import { AjoutProd } from './components/produits/ajout'
import { DétailsProd } from './components/produits/détails'
import { ListePub } from './components/publicités/liste'
import { useNavigate } from 'react-router-dom'

import './App.css';

const App: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  return (
    <>
    {token ? <Home>
          <Routes>
            <Route path='/entreprise' element={<Entreprise children={<Liste />} />}></Route>
            <Route path='/publicité' element={<Publicité children={<ListePub />} />}></Route>
            <Route path='/entreprise/ajouter' element={<AjoutEtp />}></Route>
            <Route path='/entreprise/détails' element={<Détails />}></Route>
            <Route path='/produits' element={<Produits children={<ListeProduit />} />}></Route>
            <Route path='/produits/ajouter' element={<AjoutProd />}></Route>
            <Route path='/produits/détails' element={<DétailsProd />}></Route>
          </Routes>
        </Home>
        :
        <Routes>
          <Route path='/' element={<Auth />}></Route>
        </Routes>
      }
    </>
  )
}

export default App;
