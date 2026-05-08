import "./DistanceCharts.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "S1", km: 20 },
  { week: "S2", km: 24 },
  { week: "S3", km: 16 },
  { week: "S4", km: 30 },
];

export default function DistanceCharts() {
  return (
    <div className="distance-card">
      <h3 className="distance-card__title">18km en moyenne</h3>
      <p className="distance-card__subtitle">
        Total des kilomètres 4 dernières semaines
      </p>

      <div className="distance-card__chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="week" />
            <YAxis />
            <Bar dataKey="km" fill="#B9BEFF" radius={[10, 10, 10, 10]} barSize={6}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}