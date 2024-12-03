import { useState } from "react";

function PokemonForm({ onAddPokemon }) {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonType, setPokemonType] = useState("");
  const [error, setError] = useState(null);

  const handleNameChange = async (e) => {
    const name = e.target.value;
    setPokemonName(name);
    setError(null);

    if (name) {
      try {
        const response = await fetch(
          `https://tyradex.vercel.app/api/v1/pokemon/${name.toLowerCase()}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.types) {
            setPokemonType(data.types.map((type) => type.name).join(", "));
          } else {
            setPokemonType("");
          }
        } else {
          setPokemonType("");
        }
      } catch (err) {
        setPokemonType("");
        setError("Erreur lors de la récupération du type");
      }
    } else {
      setPokemonType("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `https://tyradex.vercel.app/api/v1/pokemon/${pokemonName.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokémon non trouvé");
      }
      const data = await response.json();

      if (data && data.name && data.name.fr && data.types && data.sprites) {
        const pokemonInfo = {
          name: data.name.fr,
          type: data.types.map((type) => type.name).join(", "),
          image: data.sprites.regular,
        };

        onAddPokemon(pokemonInfo);
        setPokemonName("");
        setPokemonType("");
      } else {
        throw new Error("Données du Pokémon incomplètes");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={pokemonName}
        onChange={handleNameChange}
        placeholder="Nom du Pokémon"
        required
      />
      <input
        type="text"
        value={pokemonType}
        placeholder="Type du Pokémon"
        readOnly
      />
      <button type="submit">Ajouter</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default PokemonForm;
