import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isloading: true,
    pokedexurl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemonData() {
    setPokemonListState((state) => ({
      ...state,
      isloading: true,
    }));
    const response = await axios.get(pokemonListState.pokedexurl);

    const pokemonResults = response.data.results;

    console.log(response.data);
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultsPromise);

    console.log(pokemonData);

    const result = pokemonData.map((pokedata) => {
      const pokemon = pokedata.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    console.log(result);
    setPokemonListState((state) => ({
      ...state,
      pokemonList: result,
      isloading: false,
    }));
  }
  useEffect(() => {
    downloadPokemonData();
  }, [pokemonListState.pokedexurl]);
  return (
    <div className="pokemon-list-wrapper">
      {pokemonListState.isloading
        ? "Loading..."
        : pokemonListState.pokemonList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
          ))}
      <div className="pokemon-list-footer">
        <button
          disabled={pokemonListState.prevUrl == null}
          onClick={() => {
            const urltoset = pokemonListState.prevUrl;
            setPokemonListState({
              ...pokemonListState,
              pokedexurl: pokemonListState.prevUrl,
            });
          }}
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.nextUrl == null}
          onClick={() => {
            const urltoset = pokemonListState.nextUrl;
            setPokemonListState({
              ...pokemonListState,
              pokedexurl: pokemonListState.nextUrl,
            });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
