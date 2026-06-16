import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import { obtenerAuditorias } from "../services/auditoriaService";

export default function AuditoriaPage({ onLogout }) {

    const [auditorias, setAuditorias] = useState([]);
    const [filtro, setFiltro] = useState("TODOS");

    useEffect(() => {
        cargarAuditorias();
    }, []);

    const cargarAuditorias = async () => {
        try {
            const data = await obtenerAuditorias();
            setAuditorias(data);
        } catch (error) {
            console.error(
                "Error cargando auditoria",
                error
            );
        }
    };

    const auditoriasFiltradas =
        auditorias.filter(a => {

            if (filtro === "TODOS")
                return true;

            if (filtro === "PRODUCTOS")
                return a.accion.startsWith(
                    "PRODUCTO"
                );

            if (filtro === "MOVIMIENTOS")
                return (
                    a.accion.includes("INGRESO")
                    ||
                    a.accion.includes("EGRESO")
                );

            return true;
        });

    const getActionClass = (accion) => {

        switch (accion) {

            case "PRODUCTO_CREADO":
                return "audit-success";

            case "PRODUCTO_EDITADO":
                return "audit-warning";

            case "PRODUCTO_ELIMINADO":
                return "audit-danger";

            case "INGRESO_REGISTRADO":
                return "audit-info";

            case "EGRESO_REGISTRADO":
                return "audit-purple";

            default:
                return "";
        }
    };

    return (

        <DashboardLayout onLogout={onLogout}>

            <div className="dashboard-header">
                <div>
                    <h1>Auditoría</h1>
                    <p>
                        Historial de acciones del sistema
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

                <div className="table-toolbar">

                    <div className="table-toolbar-left">

                        <select
                            value={filtro}
                            onChange={(e) =>
                                setFiltro(e.target.value)
                            }
                        >

                            <option value="TODOS">
                                Todos
                            </option>

                            <option value="PRODUCTOS">
                                Productos
                            </option>

                            <option value="MOVIMIENTOS">
                                Movimientos
                            </option>

                        </select>

                    </div>

                </div>

                <div className="dashboard-card">

                    <table className="data-table">

                        <thead>

                        <tr>

                            <th style={{ width: "150px" }}>
                                Fecha
                            </th>

                            <th style={{ width: "220px" }}>
                                Usuario
                            </th>

                            <th style={{ width: "220px" }}>
                                Acción
                            </th>

                            <th>
                                Detalle
                            </th>

                        </tr>

                        </thead>

                        <tbody>

                        {auditoriasFiltradas.map(a => (

                            <tr key={a.id}>

                                <td>

                                    {new Date(a.fecha)
                                        .toLocaleDateString()}

                                    <br />

                                    <small>

                                        {new Date(a.fecha)
                                            .toLocaleTimeString()}

                                    </small>

                                </td>

                                <td>
                                    {a.usuario}
                                </td>

                                <td>

                                    <span
                                        className={
                                            getActionClass(
                                                a.accion
                                            )
                                        }
                                    >

                                        {a.accion}

                                    </span>

                                </td>

                                <td>
                                    {a.detalle}
                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>
    );
}