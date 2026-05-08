import { useState } from "react";
import { useNavigate } from "react-router";
import "./login.css";

export function meta() {
  return [{ title: "Connexion - SportSee" }];
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      window.location.href = "/dashboard";

      console.log("Token stocké :", data.token);
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  }

  return (
    <main className="login-container">
      <div className="login-left">
        <div className="login-form">
          <h2>Transformez vos stats en résultat</h2>
          <h1>Se connecter</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit">Se connecter</button>

            <p>Mot de passe oublié ?</p>
          </form>
        </div>
      </div>

      <div className="login-right"></div>
    </main>
  );
}
