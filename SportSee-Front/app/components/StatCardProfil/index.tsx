import "./style.css"

type StatCardProfilProps = {
    title: string
    value: string | number
    unit?: string
    color?: string
}

function StatCardProfil({ title, value, unit, color }: StatCardProfilProps) {
    return (
        <div className="stat-card-profil">
           <h3>{title}</h3>
             < p style={{ color }}>
                {value} {unit && <span>{unit}</span>}
            </p>
        </div>)
}

export default StatCardProfil