import { useEffect, useSyncExternalStore } from "react";
import { getState, subscribe, fetchPokemons } from "./pokemonStore";
import "./App.css";
function App() {
  const state = useSyncExternalStore(subscribe, getState);
  useEffect(() => {
    fetchPokemons();
  }, []);
  return (
    <div>
      <h1>Pokémon List</h1>
      {state.pokemons.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {state.pokemons.map((pokemon, index) => (
            <li key={index}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
