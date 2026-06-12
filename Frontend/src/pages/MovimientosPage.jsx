import { useEffect, useState } from "react";

import MovimientoTable
from "../components/movimientos/MovimientoTable";

import { obtenerMovimientos }
from "../services/movimientoService";

import DashboardLayout
from "../components/layout/DashboardLayout";

import { obtenerProductos }
from "../services/productoService";

import { registrarIngreso, registrarEgreso }
from "../services/movimientoService";

export default function MovimientosPage({

    onLogout

}) {

    const [productos, setProductos] =
        useState([]);

    const [productoId, setProductoId] =
        useState("");

    const [cantidad, setCantidad] =
        useState("");

    const [tipo, setTipo] =
        useState("INGRESO");

    const [loading, setLoading] =
        useState(false);
    
    const [movimientos, setMovimientos] =
        useState([]);

    // =========================
    // LOAD PRODUCTOS
    // =========================
    useEffect(() => {

        cargarProductos();

        cargarMovimientos();

    }, []);

    const cargarProductos = async () => {

        try {

            const data =
                await obtenerProductos();

            setProductos(data);

        } catch (error) {

            console.error(error);
        }
    };

    const cargarMovimientos = async () => {

        try {

            const data =
                await obtenerMovimientos();

            setMovimientos(data);

        } catch (error) {

            console.error(error);
        }
    };

    // =========================
    // SUBMIT
    // =========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            if (tipo === "INGRESO") {

                await registrarIngreso(
                    productoId,
                    Number(cantidad)
                );

            } else {

                await registrarEgreso(
                    productoId,
                    Number(cantidad)
                );
            }

            alert("Movimiento registrado");

            setCantidad("");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Error movimiento"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <DashboardLayout
            onLogout={onLogout}
        >

            <div className="dashboard-header">

                <div>

                    <h1>Movimientos</h1>

                    <p>
                        Gestión de ingresos y egresos
                    </p>

                </div>

            </div>

            <div className="content-card">

                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                >

                    {/* tipo */}
                    <div className="form-group">

                        <label>
                            Tipo Movimiento
                        </label>

                        <select
                            value={tipo}
                            onChange={(e) =>
                                setTipo(
                                    e.target.value
                                )
                            }
                        >

                            <option value="INGRESO">
                                Ingreso
                            </option>

                            <option value="EGRESO">
                                Egreso
                            </option>

                        </select>

                    </div>

                    {/* producto */}
                    <div className="form-group">

                        <label>
                            Producto
                        </label>

                        <select
                            value={productoId}
                            onChange={(e) =>
                                setProductoId(
                                    e.target.value
                                )
                            }
                            required
                        >

                            <option value="">
                                Seleccionar
                            </option>

                            {productos.map(prod => (

                                <option
                                    key={prod.id}
                                    value={prod.id}
                                >

                                    {prod.nombre}

                                </option>
                            ))}

                        </select>

                    </div>

                    {/* cantidad */}
                    <div className="form-group">

                        <label>
                            Cantidad
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={cantidad}
                            onChange={(e) =>
                                setCantidad(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >

                        {loading
                            ? "Procesando..."
                            : "Registrar Movimiento"}

                    </button>

                </form>
                
                <MovimientoTable movimientos={movimientos}/>

            </div>

        </DashboardLayout>
    );
}