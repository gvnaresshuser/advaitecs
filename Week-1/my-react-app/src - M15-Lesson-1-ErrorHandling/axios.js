// axios.js
import axios from 'axios';//npm install axios

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

// Add response interceptor
instance.interceptors.response.use(
    response => response,// Return response as-is if successful
    error => {//You can customize or log the error globally here
        const message = error?.response?.data?.message || error.message || 'Something went wrong!';
        //alert("🔥 Error from Interceptor: " + message); // ✅ Will show only from here
        return Promise.reject(error);
    }
);

export default instance;
