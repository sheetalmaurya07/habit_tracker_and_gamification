import axios from "axios";

// Spring Boot backend URL
const API_BASE_URL = "http://localhost:8081";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Automatically attach JWT token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle common API errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {

            // Unauthorized - token expired/invalid
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }

            console.error(
                "API Error:",
                error.response.status,
                error.response.data
            );

        } else if (error.request) {
            console.error(
                "Server not responding. Make sure Spring Boot is running on port 8081."
            );
        } else {
            console.error("Request Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default api;