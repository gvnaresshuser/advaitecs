function TryCatchExample() {
    const handleClick = () => {
        try {
            // Example error
            throw new Error("Something went wrong!");
        } catch (error) {
            console.error("Caught an error:", error.message);
            console.log("Caught an error:", error.message);
        }
    };

    return <button onClick={handleClick}>Trigger Error</button>;
}
export default TryCatchExample;