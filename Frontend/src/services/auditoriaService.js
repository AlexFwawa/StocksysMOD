import api from "../api/axios";

export const obtenerAuditorias = async () => {

    const response = await api.get("/auditoria");

    return response.data;
};