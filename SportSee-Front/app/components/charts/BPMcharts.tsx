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

const data = [
  { day: "Lun", min: 132, max: 168, avg: 164 },
  { day: "Mar", min: 140, max: 171, avg: 166 },
  { day: "Mer", min: 145, max: 175, avg: 163 },
  { day: "Jeu", min: 141, max: 169, avg: 161 },
  { day: "Ven", min: 134, max: 167, avg: 164 },
  { day: "Sam", min: 145, max: 162, avg: 157 },
  { day: "Dim", min: 135, max: 171, avg: 166 },
];

export default function BPMcharts() {
  return (
    <div className="bpm-card">
      <p className="bpm-card__value">163 BPM</p>
      <p className="bpm-card__subtitle">Fréquence cardiaque moyenne</p>

      <div className="bpm-card__chart">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
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