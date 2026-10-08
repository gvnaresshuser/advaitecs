//🔥 1. Mouse Events
//👉 Click, Double Click, Mouse Enter, Mouse Leave, etc.;

function MouseEvents() {
    const handleClick = () => alert("Button clicked!");
    const handleDoubleClick = () => alert("Double-clicked!");
    const handleMouseEnter = () => console.log("Mouse entered!");
    const handleMouseLeave = () => console.log("Mouse left!");

    return (
        <div>
            <button onClick={handleClick}>Click Me</button>
            <button onDoubleClick={handleDoubleClick}>Double Click Me</button>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ marginTop: 20, padding: 10, border: "1px solid black" }}
            >
                Hover Over Me
            </div>
        </div>
    );
}
export default MouseEvents;