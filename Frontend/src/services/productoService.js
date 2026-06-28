import api from "../api/axios";

// Tipos UI
export const PRODUCT_TYPES = [

    {
        id: 1,
        nombre: "Accesorios"
    },

    {
        id: 2,
        nombre: "Construcción"
    },

    {
        id: 3,
        nombre: "Ferretería"
    },

    {
        id: 4,
        nombre: "Indumentaria"
    },

    {
        id: 5,
        nombre: "Industrial"
    },

    {
        id: 6,
        nombre: "Informática"
    },

    {
        id: 7,
        nombre: "Mecánica"
    },

    {
        id: 8,
        nombre: "Nautica"
    }
];

// GET productos
export const obtenerProductos = async () => {

    const response = await api.get("/productos");

    // 🔥 adaptar backend → frontend
    return response.data.map(p => ({

        id: p.codProd,

        codigo: `PROD-${p.codProd}`,

        nombre: p.nombre,

        descripcion: p.descripcion,

        tipo: p.categoria,

        cantidad: p.stock
    }));
};


// Crear Producto
export const crearProducto = async (producto) => {

    // Usar categoriaId directo si viene del form, sino buscar por nombre
    let catId = producto.categoriaId;
    if (!catId && producto.tipo) {
        const categoria = PRODUCT_TYPES.find(
            t => t.nombre === producto.tipo
        );
        catId = categoria?.id;
    }

    const payload = {

        nombre: producto.nombre,

        descripcion: producto.descripcion,

        cantidadInicial: producto.cantidad,

        categoriaId: catId
    };

    const response = await api.post(
        "/productos",
        payload
    );

    return response.data;
};


// Actualizar Producto
export const actualizarProducto = async (
    id,
    producto
) => {

    // Usar categoriaId directo si viene del form, sino buscar por nombre
    let catId = producto.categoriaId;
    if (!catId && producto.tipo) {
        const categoria = PRODUCT_TYPES.find(
            t => t.nombre === producto.tipo
        );
        catId = categoria?.id;
    }

    const payload = {

        nombre: producto.nombre,

        descripcion: producto.descripcion,

        cantidadInicial: producto.cantidad,

        categoriaId: catId
    };

    const response = await api.put(
        `/productos/${id}`,
        payload
    );

    return response.data;
};

// Eliminar Producto
export const eliminarProducto = async (id) => {

    await api.delete(`/productos/${id}`);
};