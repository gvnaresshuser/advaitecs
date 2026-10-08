//🧪 7. Synthetic Event Object Example
//React wraps native events in a synthetic event system:
function SyntheticEventExample() {
    const handleEvent = (e) => {
        console.log("Event type:", e.type);
        console.log("Target value:", e.target.value);
    };

    return (
        <>
            <p>Synthetic Event [Key-in below input box]</p>
            <input type="text" onChange={handleEvent} />
            {/* //💡 Extra Tip: Inline Event Handlers */}
            <br />
            <p>Inline Event Handlers</p>
            <button onClick={() => alert("Inline click!")}>Click Inline</button>

        </>
    );
}
export default SyntheticEventExample;
