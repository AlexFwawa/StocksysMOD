export default function InformeTable({

    movimientos

}) {
    console.log(movimientos);
    return (

        <div className="content-card">

            <table className="data-table">

                <thead>

                    <tr>

                        <th>#</th>

                        <th>Fecha</th>

                        <th>Tipo</th>

                        <th>Producto</th>

                        <th>Cantidad</th>

                        <th>Usuario</th>

                    </tr>

                </thead>

                <tbody>

                    {movimientos.map((mov, index) => (

                        <tr key={index}>

                            <td>{index + 1}</td>

                            <td>{mov.fecha}</td>

                            <td>{mov.tipo}</td>

                            <td>{mov.producto}</td>

                            <td>{mov.cantidad}</td>

                            <td>{mov.usuario}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}