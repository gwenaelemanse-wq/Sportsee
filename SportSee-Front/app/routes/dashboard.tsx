import "./dashboard.css";
import { useCallback, useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";
import { getUserInfo, getUserActivity } from "../services/userService";
import BPMcharts from "../components/charts/BPMcharts";
import DistanceCharts from "../components/charts/DistanceCharts";
import ObjectifsCharts from "../components/charts/ObjectifsCharts";
import StatCard from "../components/StatCard";

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
  return [
    { title: "SportSee" },
    { name: "description", content: "Bienvenue sur SportSee" },
    { name: "h1", content: "Bienvenue sur SportSee" },
  ];
}

export default function Dashboard() {
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

  const totalDistance = sessions.reduce(
    (sum, session) => sum + session.distance,
    0,
  );

const imageSrc = userInfo.profile.profilePicture || "";

  return (
    <main className="dashboard">
      <section className="dashboard-header">
        {imageSrc && (
          <img
            className="dashboard-profile-image"
            src={imageSrc}
            alt={`${userInfo.profile.firstName} ${userInfo.profile.lastName}`}
          />
        )}

        <div className="dashboard-user-info">
          <h1 className="dashboard-user-name">
            {userInfo.profile.firstName}
          </h1>

          <p className="dashboard-user-text">
            Membre depuis {userInfo.profile.createdAt}
          </p>

          <p className="dashboard-user-text">
            Distance totale : {totalDistance.toFixed(1)} km
          </p>
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="dashboard-section-title">
          Vos dernières performances
        </h2>

        <div className="dashboard-charts-grid">
          <DistanceCharts />
          <BPMcharts />
        </div>
      </section>

      <section className="dashboard-section">
        <p className="dashboard-goal">
          Sessions cette semaine : {sessions.length}
        </p>

        <div className="dashboard-bottom-grid">
          <ObjectifsCharts />

          <div className="dashboard-stats">
            <StatCard
              title="Durée d'activité"
              value={String(totalDuration)}
              unit="minutes"
              color="blue"
            />

            <StatCard
              title="Distance"
              value={totalDistance.toFixed(1)}
              unit="kilomètres"
              color="orange"
            />
          </div>
        </div>
      </section>
    </main>
  );
}