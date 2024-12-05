import { useState, useEffect } from "react";
import PokemonForm from "./PokemonForm";
import EditPokemonForm from "./EditPokemonForm";
import TradeSystem from "./TradeSystem";
import { useTrade } from "../context/TradeContext";

function PokemonList({ pokemons, setPokemons, user }) {
  const [loading, setLoading] = useState(false);
  const [editingPokemon, setEditingPokemon] = useState(null);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedPokemonForTrade, setSelectedPokemonForTrade] = useState(null);
  const { trades, respondToTrade } = useTrade();

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

  const handleTradeClick = (pokemon) => {
    setSelectedPokemonForTrade(pokemon);
    setShowTradeModal(true);
  };

  const handleAcceptTrade = (trade) => {
    const updatedPokemons = pokemons.map((p) =>
      p.name === trade.requestedPokemon.name ? trade.offeredPokemon : p
    );
    setPokemons(updatedPokemons);
    localStorage.setItem(`pokemons_${user}`, JSON.stringify(updatedPokemons));

    const otherUserPokemons = JSON.parse(
      localStorage.getItem(`pokemons_${trade.fromUser}`)
    );
    const updatedOtherPokemons = otherUserPokemons.map((p) =>
      p.name === trade.offeredPokemon.name ? trade.requestedPokemon : p
    );
    localStorage.setItem(
      `pokemons_${trade.fromUser}`,
      JSON.stringify(updatedOtherPokemons)
    );

    respondToTrade(trade.id, "accepted");
  };

  const handleRejectTrade = (tradeId) => {
    respondToTrade(tradeId, "rejected");
  };

  if (loading) {
    return <div>Chargement des Pokémon...</div>;
  }

  return (
    <div>
      <div className="pokemon-list-main">
        <div>
          <h2>Ajouter un Pokémon</h2>
          <PokemonForm onAddPokemon={addPokemon} />
        </div>
        <div>
          <h2>Mon Pokédex Personne</h2>
          <div className="pokemon-list-container">
            {pokemons.map((pokemon, index) => (
              <div key={index} className="pokemon-list-item">
                <img src={pokemon.image} alt={pokemon.name} />
                <p>{pokemon.name}</p>
                <p>Type: {pokemon.type}</p>
                <hr className="separator" />
                <div className="pokemon-actions">
                  <button
                    onClick={() => handleTradeClick(pokemon)}
                    className="trade-button"
                    title="Échanger"
                  >
                    ↔️
                  </button>
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
              </div>
            ))}
          </div>
        </div>
        {editingPokemon && (
          <EditPokemonForm
            pokemon={editingPokemon}
            onSave={handleSaveEdit}
            onCancel={() => setEditingPokemon(null)}
          />
        )}
        {showTradeModal && (
          <div className="trade-modal-overlay">
            <div className="trade-modal-content">
              <button
                className="trade-modal-close"
                onClick={() => {
                  setShowTradeModal(false);
                  setSelectedPokemonForTrade(null);
                }}
              >
                ×
              </button>
              <TradeSystem
                currentUser={user}
                userPokemons={pokemons}
                selectedPokemon={selectedPokemonForTrade}
                onClose={() => {
                  setShowTradeModal(false);
                  setSelectedPokemonForTrade(null);
                }}
                setPokemons={setPokemons}
              />
            </div>
          </div>
        )}
      </div>{" "}
      <div className="trade-proposals">
        <h2>Propositions d'échange reçues</h2>
        {trades
          .filter(
            (trade) => trade.toUser === user && trade.status === "pending"
          )
          .map((trade) => (
            <div key={trade.id} className="trade-proposal-card">
              <p>{trade.fromUser} propose d'échanger :</p>
              <div className="trade-pokemon-display">
                <div className="pokemon-offer">
                  <img
                    src={trade.offeredPokemon.image}
                    alt={trade.offeredPokemon.name}
                  />
                  <p>{trade.offeredPokemon.name}</p>
                </div>
                <span>⇄</span>
                <div className="pokemon-request">
                  <img
                    src={trade.requestedPokemon.image}
                    alt={trade.requestedPokemon.name}
                  />
                  <p>{trade.requestedPokemon.name}</p>
                </div>
              </div>
              <div className="trade-actions">
                <button
                  onClick={() => handleAcceptTrade(trade)}
                  className="accept-btn"
                >
                  Accepter
                </button>
                <button
                  onClick={() => handleRejectTrade(trade.id)}
                  className="reject-btn"
                >
                  Refuser
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PokemonList;
