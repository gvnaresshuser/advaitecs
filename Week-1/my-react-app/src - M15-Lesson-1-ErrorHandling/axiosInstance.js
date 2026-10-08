// axiosInstance.js
import axios from "axios";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 5000,
});

// ✅ Track retry count per request
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;

        // Retry only once for network errors
        if (!config._retry && error.message === "Network Error") {
            config._retry = true;
            alert("🌐 Network error! Retrying...");
            return instance(config);
        }

        // Custom global error handling
        let message = "Something went wrong!";
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    message = "Bad Request (400)";
                    break;
                case 404:
                    message = "Resource Not Found (404)";
                    break;
                case 500:
                    message = "Internal Server Error (500)";
                    break;
                default:
                    message = error.response.data?.message || message;
            }
        } else if (error.request) {
            message = "No response received from server!";
        }

        // 🔥 Global alert
        alert(`⚠️ Global Error: ${message}`);

        // Always reject to allow local handling too
        return Promise.reject(error);
    }
);

export default instance;
