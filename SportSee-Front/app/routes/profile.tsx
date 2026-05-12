import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { mockUsers, mockActivities } from "../data/mockData";
import StatCardProfil from "../components/StatCardProfil";
import "./profile.css";


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


   const user: any = mockUsers[0];

  const userActivity: any = mockActivities.find(
    (activity: any) => activity.userId === user.id,
  );

  return (
    <main className="profile-container">
      <section className="profile-header">
        <img
          className="profile-image"
          src={user.profilePicture}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <div className="profile-user-info">
          <h1 className="profile-user-name">{user.firstName}</h1>
          <p className="profile-user-text">Membre depuis {user.memberSince}</p>
          <p className="profile-user-text">{userActivity ? "Actif" : "Inactif"}</p>
        </div>
      </section>

      <section className="profile-stats">
          <h2 className="profile-stats-title">Vos statistiques depuis le {user.memberSince}</h2>
        <div className="profile-stats-grid">
          <StatCardProfil title="Temps total couru" value={user.totalTime} unit="h" color="#ffffff" />
          <StatCardProfil title="Calories brûlées" value={user.caloriesBurned} unit="kcal" color="#ffffff" />
          <StatCardProfil title="Distance totale parcourue" value={user.totalDistance} unit="km" color="#ffffff" />
          <StatCardProfil title="Nombre de jours de repos" value={user.restDays} unit="jours" color="#ffffff" />
          <StatCardProfil title="Nombre de sessions" value={user.sessions} unit="sessions" color="#ffffff" />
         </div>

         </section>


    
    </main>
  );
}
