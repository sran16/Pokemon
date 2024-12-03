import { useState } from "react";
import Login from "./components/Login";
import "./App.css";

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
          {/*  la collection de Pokémon */}
        </div>
      )}
    </div>
  );
}

export default App;
