function Card({ title, description }) {
    const cardStyle = {
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
        margin: "10px 0",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    };

    return (
        <div style={cardStyle}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default Card;
