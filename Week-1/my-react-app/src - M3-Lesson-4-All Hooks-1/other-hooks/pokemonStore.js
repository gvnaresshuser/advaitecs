// pokemonStore.js
let state = {
  pokemons: [],
};
let listeners = [];
// Fetch Pokémon data and update the external store
export const fetchPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const data = await response.json();
  // Update external state
  state = {
    pokemons: data.results,
  };
  // Notify all subscribers
  listeners.forEach((listener) => listener());
};
// Return current state
export const getState = () => {
  return state;
};
// Subscribe to changes
export const subscribe = (listener) => {
  listeners.push(listener);
  // Cleanup / unsubscribe
  return () => {
    listeners = listeners.filter((item) => item !== listener);
  };
};
