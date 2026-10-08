import React from "react";

const Login = () => {
    const handleLogin = () => {
        localStorage.setItem("jwtToken", "user-token");
        localStorage.setItem("userid", "user123");
        window.location.href = "/dashboard";
    };

    return (
        <div>
            <h2>User Login</h2>
            <button style={{
                backgroundColor: "blue",
                fontSize: "20px",
                color: "white",
                padding: "10px",
                borderRadius: "10px"
            }} onClick={handleLogin}>Login as User</button>
        </div >
    );
};

export default Login;
