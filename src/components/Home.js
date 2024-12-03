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
      <header className="homepage-header">
        <h1>Bienvenue dans l'application de gestion de Pokémon</h1>
      </header>
      <main className="homepage-main">
        <section className="feature">
          <h2>Fonctionnalités principales</h2>
          <ul>
            <li>
              <strong>Authentification :</strong> Connectez-vous pour accéder à
              votre collection.
            </li>
            <li>
              <strong>Gestion des Pokémon :</strong> Ajoutez, modifiez et
              supprimez des Pokémon dans votre collection personnelle.
            </li>
            <li>
              <strong>Échanges :</strong> Proposez et acceptez des échanges avec
              d'autres dresseurs.
            </li>
          </ul>
        </section>
        <section className="steps">
          <h2>Comment ça marche ?</h2>
          <ol>
            <li>
              Inscrivez-vous ou connectez-vous pour accéder à votre collection.
            </li>
            <li>Ajoutez vos Pokémon préférés à votre collection.</li>
            <li>Explorez les collections d'autres utilisateurs.</li>
            <li>Proposez des échanges pour enrichir votre collection.</li>
          </ol>
        </section>
        <div>
          <button className="btn-start" onClick={handleStartClick}>
            Commencez votre aventure Pokémon dès maintenant !
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
