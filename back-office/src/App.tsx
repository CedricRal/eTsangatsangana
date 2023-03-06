import React from 'react';
import {Auth} from './page/auth'
import {Routes, Route} from 'react-router-dom'
import Home from './page/home'
import {Entreprise} from './components/entreprise/entreprise'
import {AjoutEtp} from './components/entreprise/ajout'
import {Publicité} from './components/publicités/publicité'
import {Liste} from './components/entreprise/liste'


import './App.css';

const App:React.FC = () =>{
  return (
    <>
      <Home>
      <Routes>
        <Route path='/entreprise' element={<Entreprise children={<Liste/>}/>}></Route>
        <Route path='/publicité' element={<Publicité />}></Route>
        <Route path='/entreprise/ajouter' element={<AjoutEtp />}></Route>
      </Routes>
      </Home>
    
    
    </>
  )
}

export default App;
