import { useEffect, useState } from "react";
import { useToast } from "./useToast";

import {

    obtenerProductos,

    crearProducto,

    actualizarProducto,

    eliminarProducto

}
from "../services/productoService";

export const useProducts = () => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const { showToast } = useToast();

    // Carga de Productos:
    const cargarProductos = async () => {

        try {

            setLoading(true);

            const data = await obtenerProductos();

            setProducts(data);

        } catch (error) {

            console.error(error);
            showToast("Error al cargar productos", "error");

        } finally {

            setLoading(false);
        }
    };

    // Inicialización de productos:
    useEffect(() => {

        cargarProductos();

    }, []);

    // Crear Productos:
    const addProduct = async (producto) => {

        try {
            await crearProducto(producto);
            showToast("Producto creado con éxito", "success");
            // Refrescar tabla:
            await cargarProductos();
        } catch (error) {
            showToast("Error al crear producto", "error");
        }
    };

    // Editar Producto:
    const editProduct = async (id, producto) => {

        try {
            await actualizarProducto(id, producto);
            showToast("Producto actualizado", "success");
            await cargarProductos();
        } catch (error) {
            showToast("Error al actualizar producto", "error");
        }
    };

    // Eliminar Producto:
    const removeProduct = async (id) => {

        try {
            await eliminarProducto(id);
            showToast("Producto eliminado", "success");
            await cargarProductos();
        } catch (error) {
            showToast("Error al eliminar producto", "error");
        }
    };

    return {

        products,

        loading,

        addProduct,

        editProduct,

        removeProduct,

        cargarProductos
    };
};