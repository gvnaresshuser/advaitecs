import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10",
      );

      const data = await response.json();

      setPokemons(data.results);
    };

    fetchPokemons();
  }, []);

  return (
    <div>
      <h1>Pokémon List</h1>

      <ul>
        {pokemons.length === 0 ? (
          <p>Loading...</p>
        ) : (
          pokemons.map((pokemon, index) => <li key={index}>{pokemon.name}</li>)
        )}
      </ul>
    </div>
  );
}

export default App;
