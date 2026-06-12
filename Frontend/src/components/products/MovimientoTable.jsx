export default function MovimientoTable({

    movimientos

}) {

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

                    {movimientos.map(
                        (mov, index) => (

                        <tr key={index}>

                            <td>
                                {index + 1}
                            </td>

                            <td>
                                {mov.fecha}
                            </td>

                            <td>

                                <span
                                    style={{
                                        color:
                                            mov.tipo ===
                                            "INGRESO"

                                                ? "#16a34a"

                                                : "#dc2626",

                                        fontWeight:
                                            "bold"
                                    }}
                                >

                                    {mov.tipo}

                                </span>

                            </td>

                            <td>
                                {mov.producto}
                            </td>

                            <td>
                                {mov.cantidad}
                            </td>

                            <td>
                                {mov.usuario}
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}