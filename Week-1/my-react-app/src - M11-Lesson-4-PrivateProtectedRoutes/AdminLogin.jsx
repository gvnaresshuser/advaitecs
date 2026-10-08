import React from "react";

const AdminLogin = () => {
    const handleLogin = () => {
        localStorage.setItem("jwtToken", "admin-token");
        localStorage.setItem("adminid", "admin123");
        window.location.href = "/admin-dashboard";
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <button style={{
                backgroundColor: "green",
                fontSize: "20px",
                color: "white",
                padding: "10px",
                borderRadius: "10px"
            }} onClick={handleLogin}>Login as Admin</button>
        </div>
    );
};

export default AdminLogin;
