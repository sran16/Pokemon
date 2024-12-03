import React, { useState, useEffect } from "react";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  // Charger les données depuis localStorage au premier rendu
  useEffect(() => {
    const storedPokemons = localStorage.getItem("pokemons");
    if (storedPokemons) {
      setPokemons(JSON.parse(storedPokemons));
    } else {
      // Si aucune donnée, initialiser avec un Pokémon par défaut
      const initialPokemons = [
        {
          name: "Pikachu",
          type: "Électrique",
          image:
            "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
        },
      ];
      setPokemons(initialPokemons);
      localStorage.setItem("pokemons", JSON.stringify(initialPokemons));
    }
  }, []);

  // Ajouter un Pokémon (par exemple pour démonstration)
  const addPokemon = () => {
    //   const newPokemon = {
    //     name: "Bulbizarre",
    //     type: "Plante/Poison",
    //     image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    //   };
    //   const updatedPokemons = [...pokemons, newPokemon];
    //   setPokemons(updatedPokemons);
    //   localStorage.setItem("pokemons", JSON.stringify(updatedPokemons));
  };

  return (
    <div>
      <h2>Ma Liste de Pokémon</h2>
      <button onClick={addPokemon}>Ajouter</button>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              style={{ width: "100px", height: "100px", marginRight: "20px" }}
            />
            <div className="pokemon-info">
              <div className="pokemon-name">{pokemon.name}</div>
              <div className="pokemon-type">Type : {pokemon.type}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
