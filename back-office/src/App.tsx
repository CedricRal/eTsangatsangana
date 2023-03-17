import React from 'react';
import {Auth} from './page/auth'
import {Routes, Route} from 'react-router-dom'
import Home from './page/home'
import {Entreprise} from './components/entreprise/entreprise'
import {AjoutEtp} from './components/entreprise/ajout'
import {Publicité} from './components/publicités/publicité'
import {Liste} from './components/entreprise/liste'
import {Détails} from './components/entreprise/détails'
import {ListeProduit} from './components/produits/liste'
import {Produits} from './components/produits/produits'
import {AjoutProd} from './components/produits/ajout'

import './App.css';

const App:React.FC = () =>{
  return (
    <>
      <Home>
      <Routes>
        <Route path='/entreprise' element={<Entreprise children={<Liste/>}/>}></Route>
        <Route path='/publicité' element={<Publicité />}></Route>
        <Route path='/entreprise/ajouter' element={<AjoutEtp />}></Route>
        <Route path='/entreprise/détails' element={<Détails />}></Route>
        <Route path='/produits' element={<Produits children={ <ListeProduit />} />}></Route>
        <Route path='/produits/ajouter' element={<AjoutProd />}></Route>
      </Routes>
      </Home>
    
    
    </>
  )
}

export default App;
