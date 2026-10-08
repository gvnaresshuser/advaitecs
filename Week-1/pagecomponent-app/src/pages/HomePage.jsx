import MainLayout from "../layout/MainLayout";
import Card from "../components/Card";

function HomePage() {
    return (
        <MainLayout>
            <h1>🏠 Welcome to the Home Page</h1>
            <p>Explore our latest products below:</p>
            <Card title="Product 1" description="High-quality item for everyday use." />
            <Card title="Product 2" description="Durable and affordable for all." />
            <Card title="Product 3" description="Best-selling product of 2025!" />
        </MainLayout>
    );
}

export default HomePage;
