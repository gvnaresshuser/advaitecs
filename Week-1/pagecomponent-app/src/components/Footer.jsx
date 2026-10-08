function Footer() {
    const footerStyle = {
        background: "#1e293b",
        color: "white",
        padding: "10px",
        textAlign: "center",
    };

    return (
        <footer style={footerStyle}>
            <p>© {new Date().getFullYear()} My React Site | All rights reserved</p>
        </footer>
    );
}

export default Footer;
