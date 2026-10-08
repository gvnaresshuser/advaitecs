//React useRef Assignment Solution
import React, { useRef, useState, useEffect } from "react";
import './App.css';
export default function App() {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>useRef Assignment</h1>
            <FocusInput />
            <hr />
            <Timer />
            <hr />
            <PreviousValue />
            <hr />
            <NoRerenderDemo />
        </div>
    );
}

/* ---------------- 1. DOM Element Reference ---------------- */
function FocusInput() {
    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.focus(); // ✅ directly access DOM element
    };

    return (
        <div>
            <h2>1. Focus Input</h2>
            <input ref={inputRef} placeholder="Click button to focus me" />
            <button onClick={handleFocus}>Focus Input</button>
        </div>
    );
}

/* ---------------- 2. Storing setInterval ID ---------------- */
function Timer() {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef(null);

    const startTimer = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    const resetTimer = () => {
        stopTimer();
        setSeconds(0);
    };

    // cleanup
    useEffect(() => {
        return () => stopTimer();
    }, []);

    return (
        <div>
            <h2>2. Timer</h2>
            <p>Seconds: {seconds}</p>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
}

/* ---------------- 3. Storing Previous Value ---------------- */
function PreviousValue() {
    const [value, setValue] = useState("");
    const previousValue = useRef("");

    useEffect(() => {
        previousValue.current = value; // update after render
    }, [value]);

    return (
        <div>
            <h2>3. Previous Value</h2>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type something"
            />
            <p>Current Value: {value}</p>
            <p>Previous Value: {previousValue.current}</p>
        </div>
    );
}

/* ---------------- 4. No Re-render with Ref ---------------- */
function NoRerenderDemo() {
    const refCounter = useRef(0);
    const [stateCounter, setStateCounter] = useState(0);

    const increaseRef = () => {
        refCounter.current += 1;
        console.log("Ref Counter:", refCounter.current);
        // ✅ Won’t cause re-render
    };

    const increaseState = () => {
        setStateCounter((prev) => prev + 1); // ✅ Causes re-render
    };

    return (
        <div>
            <h2>4. Ref vs State Counter</h2>
            <p>State Counter (re-renders UI): {stateCounter}</p>
            <p>Ref Counter (check console): {refCounter.current}</p>
            <button onClick={increaseState}>Increase State Counter</button>
            <button onClick={increaseRef}>Increase Ref Counter</button>
        </div>
    );
}
