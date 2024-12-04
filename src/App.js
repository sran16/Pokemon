import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import PokemonList from "./components/PokemonList";
import Home from "./components/Home";
import TradeSystem from "./components/TradeSystem";
import { TradeProvider } from './context/TradeContext';
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [userPokemons, setUserPokemons] = useState([]);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
    setUserPokemons([]);
  };

  return (
    <TradeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/pokemons"
              element={
                user ? (
                  <div>
                    <div className="header">
                      <h1>Bienvenue {user}</h1>
                      <button onClick={handleLogout} className="logout-button">
                        Déconnexion
                      </button>
                    </div>
                    <PokemonList
                      pokemons={userPokemons}
                      setPokemons={setUserPokemons}
                      user={user}
                    />
                    <TradeSystem 
                      currentUser={user}
                      userPokemons={userPokemons}
                    />
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </TradeProvider>
  );
}

export default App;
