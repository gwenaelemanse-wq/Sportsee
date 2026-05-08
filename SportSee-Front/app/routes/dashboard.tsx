import "./dashboard.css";
import { mockUsers, mockActivities } from "../data/mockData";
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import BPMcharts from '../components/charts/BPMcharts';
import DistanceCharts from "../components/charts/DistanceCharts";
import ObjectifsCharts from "../components/charts/ObjectifsCharts";

export function meta() {
  return [
    { title: "SportSee" },
    { name: "description", content: "Bienvenue sur SportSee" },
    { name: "h1", content: "Bienvenue sur SportSee" },
  ];
}

export default function Dashboard() {
  const authContext = useContext(AuthContext);
console.log('loading:', authContext?.loading);
console.log('isAuthenticated:', authContext?.isAuthenticated);
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
    <main>
      <img src ={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} />
      <h1> {user.firstName}</h1>
      <p>Membre depuis {user.memberSince}</p>
      <p>Distance totale : {user.totalDistance} km</p>
      
      <h1>Vos dernières performances</h1>
      <DistanceCharts />
      <BPMcharts />
      

     

      <p>Objectif hebdomadaire : {user.weeklyGoal}</p>
       <ObjectifsCharts />
      <h2>Activités</h2>

      <ul>
        {userActivity?.runningData.map((session: any, index: number) => (
          <li key={index}>
            {session.date} - {session.distance} km - {session.duration} min
          </li>
        ))}
      </ul>
    </main>
  );
}
