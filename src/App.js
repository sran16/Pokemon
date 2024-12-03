import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Pokemon from "./components/PokemonList";
import Home from "./components/Home";
import "./App.css";

import PokemonList from "./components/PokemonList";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <div className="App">
      <Home />
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <h1>Bienvenue {user}</h1>
          <PokemonList />
        </div>
      )}
    </div>
  );
}

export default App;
