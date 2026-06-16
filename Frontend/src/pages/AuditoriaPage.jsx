import { useEffect, useState } from "react";

import DashboardLayout
from "../components/layout/DashboardLayout";

import { obtenerAuditorias }
from "../services/auditoriaService";

export default function AuditoriaPage({

    onLogout

}) {

    const [auditorias, setAuditorias] =
        useState([]);

    useEffect(() => {

        cargarAuditorias();

    }, []);

    const cargarAuditorias = async () => {

        try {

            const data =
                await obtenerAuditorias();

            setAuditorias(data);

        } catch (error) {

            console.error(
                "Error cargando auditoria",
                error
            );
        }
    };

    return (

        <DashboardLayout
            onLogout={onLogout}
        >

            <div className="dashboard-header">

                <div>

                    <h1>
                        Auditoría
                    </h1>

                    <p>
                        Historial de acciones
                    </p>

                </div>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-card-label">
                        Registros
                    </div>

                    <div className="stat-card-value">
                        {auditorias.length}
                    </div>

                </div>

            </div>

            <div className="table-container">

                <table className="table">

                    <thead>

                    <tr>

                        <th>Fecha</th>

                        <th>Usuario</th>

                        <th>Acción</th>

                        <th>Detalle</th>

                    </tr>

                    </thead>

                    <tbody>

                    {auditorias.map(a => (

                        <tr key={a.id}>

                            <td>
                                {new Date(
                                    a.fecha
                                ).toLocaleString()}
                            </td>

                            <td>
                                {a.usuario}
                            </td>

                            <td>
                                {a.accion}
                            </td>

                            <td>
                                {a.detalle}
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </DashboardLayout>
    );
}