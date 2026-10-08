import React, { useState } from "react";
import './App.css';

const App = () => {
    const [countBad, setCountBad] = useState(0);
    const [countGood, setCountGood] = useState(0);

    // ❌ BAD: This may not increment correctly in rapid calls
    const handleBadIncrement = () => {
        setCountBad(countBad + 1);
        setCountBad(countBad + 1);
        setCountBad(countBad + 1);
    };

    // ✅ GOOD: This always works correctly
    const handleGoodIncrement = () => {
        setCountGood((prev) => prev + 1);
        setCountGood((prev) => prev + 1);
        setCountGood((prev) => prev + 1);
    };

    return (
        <div style={{ fontFamily: "Arial", padding: "20px" }}>
            <h2>🔁 React State Update Demo</h2>

            <div style={{ marginBottom: "30px" }}>
                <h3>❌ Bad Way (stale value)</h3>
                <p>Count (Bad): {countBad}</p>
                <button onClick={handleBadIncrement}>
                    setCount(count + 1) x 3
                </button>
            </div>

            <div>
                <h3>✅ Good Way (correct value)</h3>
                <p>Count (Good): {countGood}</p>
                <button onClick={handleGoodIncrement}>
                    setCount(prev =&gt; prev + 1) x 3
                </button>
            </div>
        </div>
    );
};

export default App;
