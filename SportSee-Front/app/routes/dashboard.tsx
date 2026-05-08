import { mockUsers, mockActivities } from "../data/mockData";
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

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
    <main>
      <h1>Bonjour {user.firstName}</h1>
      <p>Objectif hebdomadaire : {user.weeklyGoal}</p>

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
