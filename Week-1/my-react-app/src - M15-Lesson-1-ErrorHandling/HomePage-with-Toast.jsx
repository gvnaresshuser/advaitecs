// HomePage.jsx
import React, { useEffect, useState } from 'react';
import instance from './axios'; // ✅ use your axios instance
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Import toast styles

function HomePage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate invalid endpoint for testing error toast
        instance.get('https://jsonplaceholder.typicode.com/users1')
            .then(response => {
                setData(response.data);
                setError(null);
            })
            .catch(err => {
                const message = err?.response?.data?.message || err.message || 'Something went wrong!';
                setError(message);
                setData(null);
                toast.error(`❌ ${message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored"
                });
            });
    }, []);

    return (
        <div>
            <ToastContainer />
            <h2>Home Page</h2>

            {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                !error && <p>Loading or waiting for response...</p>
            )}
        </div>
    );
}

export default HomePage;
