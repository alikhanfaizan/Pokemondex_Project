import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import './pokemonInfo.css'

function PokemonInfo() {
  const {id}=useParams()
  const [pokemonId, setPokemonId] = useState({});
  console.log(id)
  async function fetchPokemonData() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    setPokemonId({name: response.data.name,image:response.data.sprites.other.dream_world.front_default, id: response.data.id,weight:response.data.weight,height:response.data.height,types:response.data.types.map((type) => type.type.name),abilities:response.data.abilities.map((ability) => ability.ability.name)})
    console.log(response.data)
  }

  useEffect(() => {
    fetchPokemonData()
  }
  , [])

  return (
    <div className='pokemon-info-wrapper'>
      
      <img className='pokemon-details-image' src={pokemonId.image} alt={pokemonId.name} />
      <div className='pokemon-details-name'>{pokemonId.name}</div>
      <div>Weight: {pokemonId.weight}</div>
      <div>Height: {pokemonId.height}</div>
      <div className='pokemon-details-types'>Types: {pokemonId.types && pokemonId.types.map((type) => type).join(', ')}</div>
      <div className='pokemon-details-types' >Abilities: {pokemonId.abilities && pokemonId.abilities.map((ability) => ability).join(', ')}</div>
    </div>
  )
}
export default PokemonInfo