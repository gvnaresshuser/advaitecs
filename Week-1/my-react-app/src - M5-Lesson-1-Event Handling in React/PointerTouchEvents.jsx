//🖱️ 5. Pointer & Touch Events
//👉 onPointerDown, onTouchStart, etc.;
function PointerTouchEvents() {
    const handlePointerDown = () => console.log("Pointer down");
    const handleTouchStart = () => console.log("Touch start");

    return (
        <div
            onPointerDown={handlePointerDown}
            onTouchStart={handleTouchStart}
            style={{ padding: 20, border: "1px solid gray" }}
        >
            Touch or click here
        </div>
    );
}
export default PointerTouchEvents;
/*
 Use Chrome DevTools Mobile Emulation
You can simulate touch events using Chrome's DevTools:
🔧 Steps:
Open your app in Google Chrome.
Right-click → Inspect to open DevTools.
Click the Toggle Device Toolbar icon (or press Ctrl+Shift+M).
Choose a mobile device (like iPhone or Pixel).
Refresh the page.
Tap/click the box — it will now fire onTouchStart.
You should see "Touch start" in the console.
*/