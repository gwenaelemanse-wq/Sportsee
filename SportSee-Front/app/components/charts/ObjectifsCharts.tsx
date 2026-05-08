import { PieChart, Pie, Label, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Réalisées", value: 4, fill: "#2433FF" },
  { name: "Restantes", value: 2, fill: "#D9DEFF" },
];

export default function ObjectifsCharts() {
  return (
    <div style={{ width: "100%", maxWidth: "420px" }}>
      <p>x4 sur objectif de 6</p>
      <p>Courses hebdomadaires réalisées</p>

      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={55}
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
              <Label value="4/6" position="center" fill="#2433FF" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}