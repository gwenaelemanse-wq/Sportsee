import "./dashboard.css";
import { mockUsers, mockActivities } from "../data/mockData";
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import BPMcharts from "../components/charts/BPMcharts";
import DistanceCharts from "../components/charts/DistanceCharts";
import ObjectifsCharts from "../components/charts/ObjectifsCharts";
import StatCard from "../components/StatCard";

export function meta() {
  return [
    { title: "SportSee" },
    { name: "description", content: "Bienvenue sur SportSee" },
    { name: "h1", content: "Bienvenue sur SportSee" },
  ];
}

export default function Dashboard() {
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
    <main className="dashboard">
      <section className="dashboard-header">
        <img
          className="dashboard-profile-image"
          src={user.profilePicture}
          alt={`${user.firstName} ${user.lastName}`}
        />

        <div className="dashboard-user-info">
          <h1 className="dashboard-user-name">{user.firstName}</h1>
          <p className="dashboard-user-text">Membre depuis {user.memberSince}</p>
          <p className="dashboard-user-text">
            Distance totale : {user.totalDistance} km
          </p>
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="dashboard-section-title">Vos dernières performances</h2>

        <div className="dashboard-charts-grid">
          <DistanceCharts />
          <BPMcharts />
        </div>
      </section>

      <section className="dashboard-section">
        <p className="dashboard-goal">
          Objectif hebdomadaire : {user.weeklyGoal}
        </p>

        <div className="dashboard-bottom-grid">
          <ObjectifsCharts />
          <div className="dashboard-stats">
            <StatCard
              title="Durée d'activité"
              value="140"
              unit="minutes"
              color="blue"
            />
          <StatCard
              title="Distance"
              value="21.7"
              unit="kilomètres"
              color="orange"
            />
          </div>
         </div>
       
      </section>

     
    </main>
  );
}