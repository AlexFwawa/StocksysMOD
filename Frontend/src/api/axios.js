import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost:8080"
});

// =========================
// REQUEST INTERCEPTOR
// =========================
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    // 🔥 rutas auth
    const isAuthRoute =

        config.url.includes("/auth/login") ||

        config.url.includes("/auth/register");

    // 🔥 NO mandar token en login/register
    if (token && !isAuthRoute) {

        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

// =========================
// RESPONSE INTERCEPTOR
// =========================
api.interceptors.response.use(

    // success
    (response) => response,

    // error
    (error) => {

        // 🔥 token expirado o inválido
        if (
            error.response &&
            (
                error.response.status === 401 ||
                error.response.status === 403
            )
        ) {

            console.warn("Sesión expirada");

            // limpiar sesión
            localStorage.removeItem("token");

            localStorage.removeItem("isAuthenticated");

            localStorage.removeItem("user");

            // redirigir login
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default api;