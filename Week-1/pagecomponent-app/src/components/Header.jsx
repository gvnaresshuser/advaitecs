import { Link } from "react-router-dom";

function Header() {
    const headerStyle = {
        background: "#1e293b",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };

    const navStyle = {
        display: "flex",
        gap: "15px",
    };

    return (
        <header style={headerStyle}>
            <h2>My React Site</h2>
            <nav style={navStyle}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
                <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
                <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
            </nav>
        </header>
    );
}

export default Header;
