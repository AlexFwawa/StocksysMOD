import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import InformeFilters from "../components/informes/InformeFilters";

import InformeTable from "../components/informes/InformeTable";

import { obtenerMovimientos }
from "../services/movimientoService";

export default function InformesPage({

    onLogout

}) {

    const [movimientos, setMovimientos] =
        useState([]);

    const [filters, setFilters] =
        useState({

            tipo: "",

            producto: "",

            desde: "",

            hasta: ""
        });

    useEffect(() => {

        cargarMovimientos();

    }, []);

    const cargarMovimientos = async () => {

    try {
        console.log("Iniciando carga");
        const data =
            await obtenerMovimientos();

        console.log("MOVIMIENTOS:", data);
        setMovimientos(data);

    } catch (error) {
        console.error("ERROR:", error);
    }
};

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]:
                e.target.value
        });
    };

    const filteredMovimientos =
        movimientos.filter((mov) => {
            const tipoMatch =
            !filters.tipo ||
            mov.tipo === filters.tipo;

        const productoMatch =
            mov.producto
                .toLowerCase()
                .includes(
                    filters.producto
                        .toLowerCase()
                );

        const desdeMatch =
            !filters.desde ||
            mov.fecha >= filters.desde;

        const hastaMatch =
            !filters.hasta ||
            mov.fecha <= filters.hasta;

        return (
            tipoMatch &&
            productoMatch &&
            desdeMatch &&
            hastaMatch
        );
    });

    const totalMovimientos =
        filteredMovimientos.length;

    const totalIngresos =
        filteredMovimientos
        .filter(
            mov =>
                mov.tipo === "INGRESO"
        )
        .reduce(
            (total, mov) =>
                total + mov.cantidad,
            0
        );

    const totalEgresos =
        filteredMovimientos
        .filter(
            mov =>
                mov.tipo === "EGRESO"
        )
        .reduce(
            (total, mov) =>
                total + mov.cantidad,
            0
        );

    const balanceStock = totalIngresos - totalEgresos;

    //Render:
    return (
        <DashboardLayout
            onLogout={onLogout}
        >
            <div className="dashboard-header">
                <div>
                    <h1>
                        Informes
                    </h1>

                    <p>
                        Reporte de movimientos
                    </p>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-label">
                         Movimientos
                    </div>

                    <div className="stat-card-value">
                        {totalMovimientos}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-label">
                        Ingresos
                    </div>

                    <div className="stat-card-value">
                        {totalIngresos}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-label">
                        Egresos
                    </div>

                    <div className="stat-card-value">
                        {totalEgresos}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-label">
                        Balance
                    </div>

                    <div className="stat-card-value">
                        {balanceStock}
                    </div>
                </div>
            </div>

            <InformeFilters
                filters={filters}
                onChange={
                    handleFilterChange
                }
            />

            <InformeTable
                movimientos={
                    filteredMovimientos
                }
            />

        </DashboardLayout>
    );
}