import "./DistanceCharts.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import { useCallback, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { getUserActivity } from "../../services/userService";

type ActivitySession = {
  date: string;
  distance: number;
  duration: number;
  caloriesBurned: number;
  heartRate: {
    min: number;
    max: number;
    average: number;
  };
};

export default function DistanceCharts() {

   
    const [weekOffset, setWeekOffset] = useState(0);
  
    const startDate = new Date("2025-05-28");
    startDate.setDate(startDate.getDate() + weekOffset * 28);
  
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 28);

      const startWeek = startDate.toISOString().split("T")[0];
      const endWeek = endDate.toISOString().split("T")[0];
    
      const fetchActivity = useCallback(() => {
        return getUserActivity(startWeek, endWeek);
      }, [startWeek, endWeek]);
    
      const { data: activity } = useApi<ActivitySession[]>(fetchActivity);
    
     const weeklyDistances = [0, 0, 0, 0];

      activity?.forEach((session) => {
        const sessionDate = new Date(session.date);
       const diffInDays = Math.floor(
      (sessionDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      const weekIndex = Math.floor(diffInDays / 7);

      if (weekIndex >= 0 && weekIndex < 4) {
      weeklyDistances[weekIndex] += session.distance;
    }
});

    const chartData = weeklyDistances.map((distance, index) => ({
      week: `S${index + 1}`,
      km: Number(distance.toFixed(1)),
}));


    const formattedDate = `${startDate.toLocaleDateString("fr-FR", {
     day: "numeric",
     month: "short",
    })} - ${endDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    })}`;

  return (
    <div className="distance-card">   
      <div className="distance-header">
        <div className="distance-info">
      <h3 className="distance-card__title">18km en moyenne</h3>
      <p className="distance-card__subtitle">
        Total des kilomètres 4 dernières semaines
      </p>
      </div>

        <div className="distance-navigation">
          <button onClick={() => setWeekOffset(weekOffset - 1)}>{"<"}</button>

        
          
          <span> {formattedDate}</span>
          
          
          <button onClick={() => setWeekOffset(weekOffset + 1)}>{">"}</button>
          
      </div>
      </div>

      <div className="distance-card__chart">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Bar dataKey="km" fill="#B9BEFF" radius={[10, 10, 10, 10]} barSize={6}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}