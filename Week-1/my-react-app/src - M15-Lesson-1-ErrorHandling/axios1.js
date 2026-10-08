import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/', // ✅ Base URL
    timeout: 5000, // Optional: timeout after 5 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// ✅ Optional: Add a response interceptor
instance.interceptors.response.use(
    response => response, // Return response as-is if successful
    error => {
        // You can customize or log the error globally here
        console.error('API Error:', error.message);

        // Optional: Customize error message
        if (error.response?.status === 404) {
            error.message = 'Requested resource not found (404)';
        } else if (error.code === 'ECONNABORTED') {
            error.message = 'Request timed out';
        }

        return Promise.reject(error); // Let component handle it via catch
    }
);

export default instance;
