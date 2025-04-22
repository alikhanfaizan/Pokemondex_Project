import React from 'react'
import Search from '../Search/Search'
import './pokedex.css'
import PokemonList from '../PokemonList/PokemonList'
function Pokedex() {
  return (
    <div className='pokedex-wrapper'>
        <h1 id='pokemon-heading'>Pokedex</h1>
        <Search/>
        <PokemonList/>
    </div>
  )
}

export default Pokedex