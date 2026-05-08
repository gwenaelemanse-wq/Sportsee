import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export function meta() {
  return [{ title: "Profil - SportSee" }];
}

export default function Profile() {
  const authContext = useContext(AuthContext);

  if (authContext?.loading) {
    return <p>Chargement...</p>;
  }
  if (!authContext?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main>
      <h1>Profil utilisateur</h1>
      <p>Page protégée.</p>
    </main>
  );
}
