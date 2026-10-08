import React from "react";
import { Link } from "react-router-dom";

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "#fff",
    },
    title: {
        margin: 0,
        fontSize: "1.5rem",
    },
    links: {
        display: "flex",
        gap: "15px",
    },
    link: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "1rem",
    },
    logout: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "5px 10px",
        cursor: "pointer",
        borderRadius: "5px",
    },
};

const Navbar = () => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login"; // Redirect to login after logout
    };

    return (
        <nav style={styles.navbar}>
            <h2 style={styles.title}>App Navigation</h2>
            <div style={styles.links}>
                <Link style={styles.link} to="/login">
                    User Login
                </Link>
                <Link style={styles.link} to="/admin-login">
                    Admin Login
                </Link>
                <Link style={styles.link} to="/dashboard">
                    User Dashboard
                </Link>
                <Link style={styles.link} to="/admin-dashboard">
                    Admin Dashboard
                </Link>
                <button style={styles.logout} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};



export default Navbar;
