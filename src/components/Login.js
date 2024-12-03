import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Connexion Pokémon</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Entrez votre nom d'utilisateur"
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default Login; 