import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Pokedex from '../Pokedex/Pokedex'
import PokemonInfo from '../PokemonInfo/PokemonInfo'
function CustomRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Pokedex/>}/>
        <Route path='/pokemon/:id' element={<PokemonInfo/>}/>
    </Routes>
  )
}

export default CustomRoutes