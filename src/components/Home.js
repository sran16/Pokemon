// Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <div className="homepage">
      <div className="pokemon-card">
        <header className="card-header">
          <h1>Bienvenue dans le monde des Pokémon</h1>
        </header>
        <div className="card-content">
          <p>
            Découvrez une application interactive pour gérer votre collection de
            Pokémon ! Voici ce que vous pouvez faire :
          </p>
          <ul>
            <li>
              <strong>Authentification :</strong> Connectez-vous pour accéder à
              votre collection personnelle.
            </li>
            <li>
              <strong>Ajout et modification :</strong> Enrichissez votre
              collection avec vos Pokémon préférés.
            </li>
            <li>
              <strong>Échanges :</strong> Proposez des échanges avec d'autres
              dresseurs.
            </li>
          </ul>
        </div>
        <button className="btn-start" onClick={handleStartClick}>
          <p>Attrapez-les tous et commencez votre aventure !</p>
        </button>
      </div>
    </div>
  );
};

export default Home;
