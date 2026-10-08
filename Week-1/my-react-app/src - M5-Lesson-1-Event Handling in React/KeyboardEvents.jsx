//🧠 2. Keyboard Events
//👉 KeyDown, KeyUp, KeyPress(deprecated);
function KeyboardEvents() {
    const handleKeyDown = (e) => {
        console.log(`Key Down: ${e.key}`);
    };

    const handleKeyUp = (e) => {
        console.log(`Key Up: ${e.key}`);
    };

    return (
        <input
            type="text"
            placeholder="Type something..."
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        />
    );
}
export default KeyboardEvents;