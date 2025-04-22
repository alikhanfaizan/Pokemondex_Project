import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon';
function PokemonList() {

    const [pokemonList,setPokemonList]=useState([]);
    const [isloading,setIsloading]=useState(true);
    const [pokedexurl,setPokedexurl]=useState('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl,setNextUrl]=useState('');
    const [prevurl,setPrevUrl]=useState('');

    async function downloadPokemonData() {
        setIsloading(true);
        const response = await axios.get(pokedexurl);

        const pokemonResults=response.data.results;

        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);


        const pokemonResultsPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url));
        const pokemonData=await axios.all(pokemonResultsPromise);

        console.log(pokemonData);
        
        const result=(pokemonData.map((pokedata)=>{
            const pokemon=pokedata.data;
            return {
                id:pokemon.id,
                name:pokemon.name,
                image:pokemon.sprites.other.dream_world.front_default,
                types:pokemon.types}
        }));
        console.log(result);
        setPokemonList(result);
        setIsloading(false);
    }
    useEffect(()=>{
        downloadPokemonData();
    },[pokedexurl]);
  return (
    <div className='pokemon-list-wrapper'>
        {
            (isloading) ? "Loading...":
            pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id}/>)
        }
        <div className='pokemon-list-footer'>
            <button disabled={prevurl===null} onClick={()=>setPokedexurl(prevurl)}>Prev</button>
            <button disabled={nextUrl===null} onClick={()=>setPokedexurl(nextUrl)}>Next</button>
        </div>
    </div>
  )
}

export default PokemonList