import { useState, useEffect } from "react";
import PokemonForm from "./PokemonForm";

function PokemonList({ pokemons, setPokemons, user }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserPokemons = () => {
      setLoading(true);
      const savedPokemons = localStorage.getItem(`pokemons_${user}`);
      if (savedPokemons) {
        setPokemons(JSON.parse(savedPokemons));
      }
      setLoading(false);
    };

    if (pokemons.length === 0) {
      loadUserPokemons();
    }
  }, [pokemons.length, setPokemons, user]);

  const addPokemon = (newPokemon) => {
    const updatedPokemons = [...pokemons, newPokemon];
    setPokemons(updatedPokemons);
    localStorage.setItem(`pokemons_${user}`, JSON.stringify(updatedPokemons));
  };

  if (loading) {
    return <div>Chargement des Pokémon...</div>;
  }

  return (
    <div>
      <h2>Vos Pokémon</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
            <p>Type: {pokemon.type}</p>
          </div>
        ))}
      </div>
      <PokemonForm onAddPokemon={addPokemon} />
    </div>
  );
}

export default PokemonList;
