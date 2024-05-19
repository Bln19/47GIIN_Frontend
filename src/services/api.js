// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // Cambia esto según tu configuración
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
