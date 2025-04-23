
import { useState, useEffect } from 'react';
import axios from 'axios';

function usePokedex(initialUrl = 'https://pokeapi.co/api/v2/pokemon') {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokedexUrl, setPokedexUrl] = useState(initialUrl);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  useEffect(() => {
    async function downloadPokemonData() {
      setIsLoading(true);
      try {
        const response = await axios.get(pokedexUrl);
        const pokemonResults = response.data.results;

        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        const pokemonResultsPromise = pokemonResults.map(pokemon =>
          axios.get(pokemon.url)
        );
        const pokemonData = await axios.all(pokemonResultsPromise);

        const result = pokemonData.map(pokedata => {
          const pokemon = pokedata.data;
          return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default,
            types: pokemon.types
          };
        });

        setPokemonList(result);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    downloadPokemonData();
  }, [pokedexUrl]);

  return {
    pokemonList,
    isLoading,
    nextUrl,
    prevUrl,
    setPokedexUrl
  };
}

export default usePokedex;
