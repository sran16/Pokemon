import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import PokemonList from "./components/PokemonList";
import Home from "./components/Home";
import { TradeProvider } from "./context/TradeContext";
import NotFound from "./components/NotFound";
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
          {user && (
            <div className="header">
              <div className="user-welcome">{user}</div>
              <button onClick={handleLogout} className="logout-button">
                Déconnexion
              </button>
            </div>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/pokemons"
              element={
                user ? (
                  <div>
                    <PokemonList
                      pokemons={userPokemons}
                      setPokemons={setUserPokemons}
                      user={user}
                    />
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </TradeProvider>
  );
}

export default App;
