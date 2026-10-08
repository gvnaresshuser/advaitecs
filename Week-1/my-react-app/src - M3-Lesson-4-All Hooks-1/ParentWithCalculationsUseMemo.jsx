// ParentWithCalculationsUseMemo.jsx
import React, { useState, useMemo } from "react";

// Expensive calculation: factorial
const factorial = (n) => {
    console.log("🧮 Calculating factorial...");
    if (n <= 0) return 1;
    let result = 1;
    for (let i = 1; i <= n; i++) {
        // Simulate expensive work
        for (let j = 0; j < 1000000; j++) { }
        result *= i;
    }
    return result;
};

const ParentWithCalculationsUseMemo = () => {
    const [count, setCount] = useState(0);
    const [number, setNumber] = useState(5);

    // Memoize factorial result
    //WITH USEMEMO
    const fact = useMemo(() => factorial(number), [number]);
    //WITHOUT USEMEMO
    //const fact = factorial(number);

    return (
        <div style={{ border: "2px solid green", padding: "20px", margin: "20px" }}>
            <h2>Count: {count}</h2>
            <button onClick={() => setCount((c) => c + 1)}>Increment Count</button>

            <hr />

            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
            />
            <h3>Factorial of {number} = {fact}</h3>
        </div>
    );
};

export default ParentWithCalculationsUseMemo;
