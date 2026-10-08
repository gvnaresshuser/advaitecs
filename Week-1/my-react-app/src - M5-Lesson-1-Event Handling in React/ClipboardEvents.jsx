//📱 4. Clipboard Events
//👉 onCopy, onPaste, onCut;
function ClipboardEvents() {
    const handleCopy = () => alert("Copied!");
    const handlePaste = () => alert("Pasted!");
    const handleCut = () => alert("Cut!");

    return (
        <input
            type="text"
            onCopy={handleCopy}
            onPaste={handlePaste}
            onCut={handleCut}
            placeholder="Try copying or pasting"
        />
    );
}
export default ClipboardEvents;
