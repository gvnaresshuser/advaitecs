import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout({ children }) {
    const layoutStyle = {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    };

    const mainStyle = {
        flex: "1",
        padding: "20px",
        backgroundColor: "#f8fafc",
    };

    return (
        <div style={layoutStyle}>
            <Header />
            <main style={mainStyle}>{children}</main>
            <Footer />
        </div>
    );
}

export default MainLayout;
