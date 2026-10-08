// HomePage.jsx
import React, { useEffect, useState } from 'react';
import instance from './axios'; // ✅ use your axios instance
//npm install axios


function HomePage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null); // ✅ new error state

    useEffect(() => {
        //instance.get('/users') // Instead of full URL
        instance.get('/todos') // Instead of full URL

            //NO NEED OF FULL URL
            //instance.get('https://jsonplaceholder.typicode.com/users') // Valid endpoint

            // Uncomment the next line to test error handling
            //instance.get('https://jsonplaceholder.typicode.com/users1') // Invalid endpoint to trigger error
            .then(response => {
                setData(response.data);
                setError(null); // Clear error if successful
            })
            .catch(err => {
                // ✅ set local error message from interceptor
                const message = err?.response?.data?.message || err.message || 'Something went wrong!';
                setError(message);
                setData(null);
            });
    }, []);

    return (
        <div>
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
