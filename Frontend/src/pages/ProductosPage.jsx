import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productoService";
import ProductTable from "../components/ProductTable";

export default function ProductosPage() {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {

            const data = await obtenerProductos();

            // 🔥 MAPEO CLAVE
            const adaptados = data.map(p => ({
                id: p.codProd,
                codigo: `PROD-${p.codProd}`,
                nombre: p.nombre,
                tipo: p.categoria,
                cantidad: p.stock
            }));

            setProductos(adaptados);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Productos</h1>

            <ProductTable
                products={productos}
                loading={loading}
                onAdd={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
            />
        </div>
    );
}