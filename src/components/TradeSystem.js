import React, { useState, useEffect } from 'react';
import { useTrade } from '../context/TradeContext';

function TradeSystem({ currentUser, userPokemons, onClose }) {
  const { proposeTrade } = useTrade();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [requestedPokemon, setRequestedPokemon] = useState(null);

  useEffect(() => {
    const loadOtherUsers = () => {
      const allUsers = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('pokemons_') && !key.includes(currentUser)) {
          const username = key.replace('pokemons_', '');
          const pokemons = JSON.parse(localStorage.getItem(key));
          allUsers.push({ username, pokemons });
        }
      }
      setOtherUsers(allUsers);
    };
    loadOtherUsers();
  }, [currentUser]);

  const handleProposeTrade = () => {
    if (selectedUser && requestedPokemon && selectedPokemon) {
      proposeTrade(
        currentUser,
        selectedUser.username,
        selectedPokemon,
        requestedPokemon
      );
      onClose();
      alert('Proposition d\'échange envoyée !');
    }
  };

  return (
    <div className="trade-system">
      <div className="trade-proposal">
        <h3>Proposer un échange</h3>
        <div className="pokemon-selection">
          <h4>Sélectionnez votre Pokémon à échanger</h4>
          <div className="pokemon-grid">
            {userPokemons.map(pokemon => (
              <div
                key={pokemon.name}
                className={`pokemon-card ${selectedPokemon === pokemon ? 'selected' : ''}`}
                onClick={() => setSelectedPokemon(pokemon)}
              >
                <img src={pokemon.image} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sélection de l'autre user */}
        {selectedPokemon && (
          <div className="trainer-selection">
            <h4>Sélectionnez un dresseur</h4>
            <div className="trainers-grid">
              {otherUsers.map(user => (
                <div
                  key={user.username}
                  className={`trainer-card ${selectedUser === user ? 'selected' : ''}`}
                  onClick={() => setSelectedUser(user)}
                >
                  <p>{user.username}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sélection du Pokémon demandé */}
        {selectedUser && (
          <div className="pokemon-selection">
            <h4>Sélectionnez le Pokémon que vous souhaitez</h4>
            <div className="pokemon-grid">
              {selectedUser.pokemons.map(pokemon => (
                <div
                  key={pokemon.name}
                  className={`pokemon-card ${requestedPokemon === pokemon ? 'selected' : ''}`}
                  onClick={() => setRequestedPokemon(pokemon)}
                >
                  <img src={pokemon.image} alt={pokemon.name} />
                  <p>{pokemon.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bouton de proposition d'échange */}
        <button 
          className="propose-trade-btn"
          onClick={handleProposeTrade}
          disabled={!selectedUser || !requestedPokemon}
        >
          Proposer l'échange
        </button>
      </div>
    </div>
  );
}

export default TradeSystem; 