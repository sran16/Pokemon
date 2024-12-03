import { useState } from 'react';
import loginImage from '../img/login.png';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="container">
      <img src={loginImage} alt="Logo Pokémon" className="pokemon" />
      <form onSubmit={handleSubmit} className="login-form">
      <h2>Connexion Pokémon</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Entrez votre nom d'utilisateur"
        required/>
      <button type="submit">Se connecter</button>
      </form>
    </div> 
  );
}

export default Login; 