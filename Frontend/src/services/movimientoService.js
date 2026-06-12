import api from "../api/axios";

export const registrarIngreso =
    async (data) => {

        const response =
            await api.post(
                "/ingresos",
                data
            );

        return response.data;
    };

export const registrarEgreso =
    async (data) => {

        const response =
            await api.post(
                "/egresos",
                data
            );

        return response.data;
    };

//obtener movimientos:
export const obtenerMovimientos =
    async () => {

        const response = await api.get(
            "/movimientos"
        );

        return response.data;
    };