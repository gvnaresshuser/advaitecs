import React, { useRef } from "react";
import Timer from "./components/Timer";

const App = () => {
    const timerRef = useRef();

    return (
        <div style={{ padding: "20px", border: "2px solid blue", textAlign: "center" }}>
            <h1>🎯 useImperativeHandle Timer Example</h1>

            {/* Timer controlled by parent */}
            <Timer ref={timerRef} />

            <div style={{ marginTop: "20px" }}>
                <button onClick={() => timerRef.current.start()}>Start Timer</button>
                <button onClick={() => timerRef.current.pause()} style={{ marginLeft: "10px" }}>
                    Pause Timer
                </button>
                <button onClick={() => timerRef.current.reset()} style={{ marginLeft: "10px" }}>
                    Reset Timer
                </button>
                <button onClick={() => timerRef.current.getTime()} style={{ marginLeft: "10px" }}>
                    Log Time
                </button>
            </div>
        </div>
    );
};

export default App;
