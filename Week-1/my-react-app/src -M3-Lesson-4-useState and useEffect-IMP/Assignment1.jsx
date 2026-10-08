import React, { useState } from "react";

const Assignment1 = () => {
    // State for counter
    const [count, setCount] = useState(0);

    // Handlers
    const increment = () => setCount(prev => prev + 1);
    const decrement = () => setCount(prev => prev - 1);
    const reset = () => setCount(0);

    // Check even or odd
    const isEven = count % 2 === 0;

    return (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
            <h2>Counter: {count}</h2>
            <p>{isEven ? "Even" : "Odd"}</p>
            {/* <p>{count === 0 ? "Zero" : isEven ? "Even" : "Odd"}</p> */}

            <button onClick={increment}>Increment</button>{" "}
            <button onClick={decrement}>Decrement</button>{" "}
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default Assignment1;
