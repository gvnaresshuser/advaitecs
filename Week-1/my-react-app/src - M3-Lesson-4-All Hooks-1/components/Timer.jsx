import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react";

const Timer = forwardRef((props, ref) => {
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
        start: () => {
            if (!running) {
                setRunning(true);
                intervalRef.current = setInterval(() => {
                    setSeconds((prev) => prev + 1);
                }, 1000);
            }
        },
        pause: () => {
            setRunning(false);
            clearInterval(intervalRef.current);
        },
        reset: () => {
            setRunning(false);
            clearInterval(intervalRef.current);
            setSeconds(0);
        },
        getTime: () => {
            console.log("⏱ Current time:", seconds, "seconds");
            return seconds;
        }
    }));

    // Cleanup on unmount
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <h2 style={{ color: running ? "green" : "red" }}>
            Timer: {seconds} seconds
        </h2>
    );
});

export default Timer;
