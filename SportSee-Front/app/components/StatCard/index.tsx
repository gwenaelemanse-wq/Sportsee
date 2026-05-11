import './style.css'

type StatCardProps = {
  title: string
  value: string | number
  unit?: string
  color?: string
}

function StatCard({ title, value, unit, color }: StatCardProps) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>

      <p style={{ color }}>
        {value} {unit && <span>{unit}</span>}
      </p>
    </div>
  )
}

export default StatCard