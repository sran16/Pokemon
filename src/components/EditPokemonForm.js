import { useState } from 'react';

function EditPokemonForm({ pokemon, onSave, onCancel }) {
  const [editedPokemon, setEditedPokemon] = useState({
    name: pokemon.name,
    type: pokemon.type,
    image: pokemon.image
  });
  const [error, setError] = useState(null);

  const handleNameChange = async (e) => {
    const name = e.target.value;
    setEditedPokemon(prev => ({ ...prev, name }));
    setError(null);

    if (name) {
      try {
        const response = await fetch(
          `https://tyradex.vercel.app/api/v1/pokemon/${name.toLowerCase()}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.types && data.sprites) {
            setEditedPokemon({
              name: data.name.fr,
              type: data.types.map((type) => type.name).join(", "),
              image: data.sprites.regular
            });
          }
        }
      } catch (err) {
        setError("Erreur lors de la récupération des données");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `https://tyradex.vercel.app/api/v1/pokemon/${editedPokemon.name.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokémon non trouvé");
      }
      const data = await response.json();

      if (data && data.name && data.name.fr && data.types && data.sprites) {
        const updatedPokemon = {
          name: data.name.fr,
          type: data.types.map((type) => type.name).join(", "),
          image: data.sprites.regular
        };
        onSave(pokemon.name, updatedPokemon);
      } else {
        throw new Error("Données du Pokémon incomplètes");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onCancel}>×</button>
        <h2>Modifier le Pokémon</h2>
        <div className="pokemon-preview">
          <img 
            src={editedPokemon.image} 
            alt={editedPokemon.name}
            className="preview-image"
          />
        </div>
        <form onSubmit={handleSubmit} className="edit-pokemon-form">
          <input
            type="text"
            value={editedPokemon.name}
            onChange={handleNameChange}
            placeholder="Nom du Pokémon"
            required
          />
          <input
            type="text"
            value={editedPokemon.type}
            placeholder="Type du Pokémon"
            readOnly
          />
          <div className="button-group">
            <button type="button" onClick={onCancel}>Annuler</button>
            <button type="submit">Sauvegarder</button>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default EditPokemonForm;