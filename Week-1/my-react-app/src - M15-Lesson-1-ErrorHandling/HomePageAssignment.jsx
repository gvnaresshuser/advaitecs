// HomePageAssignment.jsx
import React, { useEffect, useState } from "react";
import instance from "./axiosInstance";

function HomePageAssignment() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // ✅ Try both for testing
        // instance.get("/users"); // success
        instance.get("/users1"); // invalid endpoint → triggers global + local error

        instance
            .get("/users")
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((err) => {
                const message =
                    err?.response?.data?.message ||
                    err.message ||
                    "Something went wrong!";
                setError(message);
            });
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>🌍 Home Page with Global Axios Error Handling</h2>

            {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                !error && <p>⏳ Loading or waiting for response...</p>
            )}
        </div>
    );
}

export default HomePageAssignment;
