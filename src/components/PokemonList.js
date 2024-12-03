import { useState, useEffect } from "react";
import PokemonForm from "./PokemonForm";
import EditPokemonForm from "./EditPokemonForm";

function PokemonList({ pokemons, setPokemons, user }) {
  const [loading, setLoading] = useState(false);
  const [editingPokemon, setEditingPokemon] = useState(null);

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

  const handleDeletePokemon = (name) => {
    const filteredPokemons = pokemons.filter(
      (pokemon) => pokemon.name !== name
    );
    setPokemons(filteredPokemons);
    localStorage.setItem(`pokemons_${user}`, JSON.stringify(filteredPokemons));
  };

  const handleEditPokemon = (pokemon) => {
    setEditingPokemon(pokemon);
  };

  const handleSaveEdit = (oldName, updatedPokemon) => {
    const updatedPokemons = pokemons.map((pokemon) =>
      pokemon.name === oldName ? updatedPokemon : pokemon
    );
    setPokemons(updatedPokemons);
    localStorage.setItem(`pokemons_${user}`, JSON.stringify(updatedPokemons));
    setEditingPokemon(null);
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
              position: "relative",
            }}
          >
            {editingPokemon?.name === pokemon.name ? (
              <EditPokemonForm
                pokemon={pokemon}
                onSave={handleSaveEdit}
                onCancel={() => setEditingPokemon(null)}
              />
            ) : (
              <>
                <img src={pokemon.image} alt={pokemon.name} />
                <p>{pokemon.name}</p>
                <p>Type: {pokemon.type}</p>
                <div className="pokemon-actions">
                  <button
                    onClick={() => handleEditPokemon(pokemon)}
                    className="edit-button"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeletePokemon(pokemon.name)}
                    className="delete-button"
                  >
                    X
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <PokemonForm onAddPokemon={addPokemon} />
    </div>
  );
}

export default PokemonList;
