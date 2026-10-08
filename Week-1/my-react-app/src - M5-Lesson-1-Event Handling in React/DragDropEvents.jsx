//🔃 6. Drag and Drop Events
//👉 onDragStart, onDragOver, onDrop;
function DragDropEvents() {
    const handleDragStart = (e) => e.dataTransfer.setData("text/plain", "Hello!");
    const handleDrop = (e) => {
        e.preventDefault();
        console.log("Dropped")
        alert("Dropped: " + e.dataTransfer.getData("text"));
    };
    const handleDragOver = (e) => e.preventDefault();
    //const handleDragOver = (e) => console.log("Drag Over");

    return (
        <div>
            <div
                draggable
                onDragStart={handleDragStart}
                style={{ width: 100, height: 50, background: "skyblue", marginBottom: 10 }}
            >
                Drag Me
            </div>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ width: 200, height: 100, border: "2px dashed black" }}
            >
                Drop Here
            </div>
        </div>
    );
}
export default DragDropEvents;