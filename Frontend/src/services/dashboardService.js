import api from "../api/axios";

export const obtenerStats =
    async () => {

        const response = await api.get(
            "/dashboard/stats"
        );

        return response.data;
    };