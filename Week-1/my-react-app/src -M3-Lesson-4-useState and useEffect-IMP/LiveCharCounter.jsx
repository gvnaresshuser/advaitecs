// LiveCharCounter.jsx
import React, { useState, useEffect } from "react";

const LiveCharCounter = () => {
  const [input, setInput] = useState("");
  const [lastTypedTime, setLastTypedTime] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
    setLastTypedTime(new Date().toLocaleTimeString());
    setShowWarning(false); // Reset warning if user types
  };

  // Log input change
  useEffect(() => {
    if (input !== "") {
      console.log("Input changed to:", input);
    }
  }, [input]);

  // Show warning if no input in 10 seconds
  useEffect(() => {
    if (input === "") return; // Skip timer if nothing typed yet

    const timer = setTimeout(() => {
      setShowWarning(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Clean up on input change
  }, [input]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <input
        type="text"
        placeholder="Type something..."
        value={input}
        onChange={handleChange}
        style={{
          padding: "8px",
          width: "300px",
          border: input.length > 50 ? "2px solid red" : "1px solid #ccc",
        }}
      />

      <p style={{ color: input.length > 25 ? "red" : "black" }}>
        Character count: {input.length}
      </p>

      {lastTypedTime && <p>Last typed at: {lastTypedTime}</p>}

      {showWarning && (
        <>
          <p style={{ color: "orange", fontWeight: "bold" }}>
            ⚠️ You haven’t typed anything in the last 10 seconds!
          </p>
          <p style={{ color: "red", fontWeight: "bold" }}>
            {new Date().toLocaleTimeString()}
          </p>
        </>
      )}
    </div>
  );
};

export default LiveCharCounter;
//An empty string '' is a falsy value in JavaScript.
//{condition && <Component />}
/*
lastTypedTime
      │
      ├── ''                 → falsy  → don't render
      │
      └── '8:35:42 AM'       → truthy → render
*/
