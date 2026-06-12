export default function StatsCards({

    stats

}) {

    const cards = [

        {
            title: "Productos",
            value: stats.totalProductos
        },

        {
            title: "Stock Total",
            value: stats.stockTotal
        },

        {
            title: "Ingresos Hoy",
            value: stats.ingresosHoy
        },

        {
            title: "Egresos Hoy",
            value: stats.egresosHoy
        },

        {
            title: "Stock Bajo",
            value: stats.stockBajo
        }
    ];

    return (

        <div className="stats-grid">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="stat-card"
                >

                    <h3>{card.title}</h3>

                    <p>{card.value}</p>

                </div>
            ))}

        </div>
    );
}