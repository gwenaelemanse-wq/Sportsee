import "./profile.css";
import { useCallback, useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";
import { getUserInfo, getUserActivity } from "../services/userService";
import StatCardProfil from "../components/StatCardProfil";

type UserInfo = {
  profile: {
    firstName: string;
    lastName: string;
    createdAt: string;
    age: number;
    gender?: string;
    height: number;
    weight: number;
    profilePicture?: string;
  };
  statistics: {
    totalDistance: string;
    totalSessions: number;
    totalDuration: number;
  };
};

type ActivitySession = {
  date: string;
  duration: number;
  caloriesBurned: number;
  distance: number;
};

type UserActivity = ActivitySession[];

export function meta() {
  return [{ title: "Profil - SportSee" }];
}

export default function Profile() {
  const authContext = useContext(AuthContext);

  const today = new Date();
  const endWeek = today.toISOString().split("T")[0];

  const startDate = new Date();
  startDate.setDate(today.getDate() - 7);
  const startWeek = startDate.toISOString().split("T")[0];

  const {
    data: userInfo,
    loading: userLoading,
    error: userError,
  } = useApi<UserInfo>(getUserInfo);

  const fetchActivity = useCallback(() => {
    return getUserActivity(startWeek, endWeek);
  }, [startWeek, endWeek]);

  const {
    data: activity,
    loading: activityLoading,
    error: activityError,
  } = useApi<UserActivity>(fetchActivity);

  if (authContext?.loading || userLoading || activityLoading) {
    return <p>Chargement...</p>;
  }

  if (!authContext?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (userError || activityError) {
    return <p>Erreur lors du chargement des données.</p>;
  }

  if (!userInfo) {
    return <p>Aucune donnée utilisateur trouvée.</p>;
  }

  const sessions = activity ?? [];

  const totalDuration = sessions.reduce(
    (sum, session) => sum + session.duration,
    0,
  );

  const totalCalories = sessions.reduce(
    (sum, session) => sum + session.caloriesBurned,
    0,
  );

  const totalDistance = sessions.reduce(
    (sum, session) => sum + session.distance,
    0,
  );

  const totalSessions = sessions.length;
  const restDays = 7 - totalSessions > 0 ? 7 - totalSessions : 0;
  
  const imageSrc = userInfo.profile.profilePicture || "";

  return (
    <main className="profile-page">
      <div className="profile-grid">
        <div className="profile-left-column">
          <section className="profile-card profile-header-card">
            {imageSrc && (
              <img
                className="profile-avatar"
                src={imageSrc}
                alt={`${userInfo.profile.firstName} ${userInfo.profile.lastName}`}
              />
            )}

            <div>
              <h1 className="profile-name">
                {userInfo.profile.firstName} {userInfo.profile.lastName}
              </h1>
              <p className="profile-member-since">
                Membre depuis le {userInfo.profile.createdAt}
              </p>
            </div>
          </section>

          <section className="profile-card profile-info-card">
            <h2 className="profile-section-title">Votre profil</h2>

            <div className="profile-info-list">
              <p>Âge : {userInfo.profile.age}</p>
              <p>
                Genre :{" "}
                {userInfo.profile.gender === "female" ? "Femme" : "Homme"}
              </p>
              <p>Taille : {userInfo.profile.height} cm</p>
              <p>Poids : {userInfo.profile.weight} kg</p>
            </div>
          </section>
        </div>

        <div className="profile-right-column">
          <div className="profile-stats-header">
            <h2 className="profile-stats-title">Vos statistiques</h2>
            <p className="profile-stats-date">Données de la semaine</p>
          </div>

          <div className="profile-stats-grid">
            <StatCardProfil
              title="Temps total couru"
              value={String(totalDuration)}
              unit="min"
            />

            <StatCardProfil
              title="Calories brûlées"
              value={String(totalCalories)}
              unit="cal"
            />

            <StatCardProfil
              title="Distance totale parcourue"
              value={totalDistance.toFixed(1)}
              unit="km"
            />

            <StatCardProfil
              title="Nombre de jours de repos"
              value={String(restDays)}
              unit="jours"
            />

            <StatCardProfil
              title="Nombre de sessions"
              value={String(totalSessions)}
              unit="sessions"
            />
          </div>
        </div>
      </div>
    </main>
  );
}