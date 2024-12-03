import { useState } from "react";
import Login from "./components/Login";
import Pokemon from "./components/PokemonList";

import "./App.css";
import PokemonList from "./components/PokemonList";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <h1>Bienvenue {user}</h1>
          <PokemonList/>
        </div>
      )}
    </div>
  );
}

export default App;
