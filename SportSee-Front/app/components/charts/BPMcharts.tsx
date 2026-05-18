import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./BPMcharts.css";
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

export default function BPMcharts() {
  const [weekOffset, setWeekOffset] = useState(0);

  const startDate = new Date("2025-05-28");
  startDate.setDate(startDate.getDate() + weekOffset * 7);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);

  const startWeek = startDate.toISOString().split("T")[0];
  const endWeek = endDate.toISOString().split("T")[0];

  const fetchActivity = useCallback(() => {
    return getUserActivity(startWeek, endWeek);
  }, [startWeek, endWeek]);

  const { data: activity } = useApi<ActivitySession[]>(fetchActivity);

  const chartData =
    activity?.map((session) => ({
      day: new Date(session.date).toLocaleDateString("fr-FR", {
        weekday: "short",
      }),
      min: session.heartRate.min,
      max: session.heartRate.max,
      avg: session.heartRate.average,
    })) ?? [];

  const formattedDate = `${startDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  })} - ${endDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  })}`;

  return (
    <div className="bpm-card">
      <div className="bpm-header">
        <div className="bpm-info">
          <p className="bpm-card__value">163 BPM</p>
          <p className="bpm-card__subtitle">Fréquence cardiaque moyenne</p>
        </div>

        <div className="chart-navigation">
          <button onClick={() => setWeekOffset(weekOffset - 1)}>{"<"}</button>
          <span>{formattedDate}</span>
          <button onClick={() => setWeekOffset(weekOffset + 1)}>{">"}</button>
        </div>
      </div>

      <div className="bpm-card__chart">
        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="min" fill="#FFC5B8" barSize={6} radius={[8, 8, 0, 0]} />
            <Bar dataKey="max" fill="#FF3B1D" barSize={6} radius={[8, 8, 0, 0]} />
            <Line
              type="monotone"
              dataKey="avg"
              stroke="#C9D3FF"
              strokeWidth={2}
              dot={{ r: 3, fill: "#2433FF" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}