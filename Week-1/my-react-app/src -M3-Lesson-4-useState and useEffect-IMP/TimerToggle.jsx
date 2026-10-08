import { useState, useEffect } from "react";

function TimerToggle() {
    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        console.log("useEffect called..running:" + running);
        let timer;
        if (running) {
            timer = setInterval(() => {
                setCount(prev => prev + 1);
            }, 1000);
        }

        return () => {
            console.log("cleaning up timer..");
            clearInterval(timer); // cleanup every time running changes
        };
    }, [running]);

    return (
        <div>
            <h2>Timer: {count} seconds</h2>
            <button style={{ background: 'green' }} onClick={() => setRunning(true)}>Start</button>&nbsp;
            <button style={{ background: 'red' }} onClick={() => setRunning(false)}>Stop</button>&nbsp;
            <button style={{ background: 'orange' }} onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}

export default TimerToggle;
