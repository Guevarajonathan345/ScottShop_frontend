import axios from 'axios';

// 1. Obtiene la URL de la API del archivo .env
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


// 2. 🔒 Interceptor de Solicitudes (Norma Profesional y Seguridad)
// Esta función añade el JWT a CADA solicitud saliente si existe.
api.interceptors.request.use (
    (config) => {
        const token = localStorage.getItem('authToken');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
