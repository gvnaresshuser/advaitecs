// App.js
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  // 🔁 Counter increases every second
  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // ❌ Synchronous block - UI freezes
  const handleSyncBlock = () => {
    setMessage("⛔ UI freezing for 5 seconds...");
    const end = Date.now() + 5000;
    while (Date.now() < end) {
      // Blocking: UI completely halts
    }
    setMessage("✅ Done (sync block). You felt the freeze!");
  };

  // ✅ Asynchronous using async/await
  const handleAsyncWait = async () => {
    try {
      setMessage("⏳ Waiting 5 seconds asynchronously...");
      //await new Promise((resolve) => setTimeout(resolve, 5000));
      //------------------------------------------------------------
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
          //---------------------------------------------------
          //reject(new Error("handleAsyncWait - Something went wrong!"));
        }, 5000);
      });
      setMessage("handleAsyncWait - ✅ Done (async/await). Smooth!");
    } catch (error) {
      setMessage("handleAsyncWait - ❌ Something went wrong!");
      console.error("Async error:", error);
    }
  };

  // ✅ Asynchronous using plain Promise
  const handlePromiseWait = () => {
    setMessage("⏳ Waiting 5 seconds using Promise...");
    simulateAsyncTask()
      .then(() => {
        setMessage("handlePromiseWait - ✅ Done (Promise). Smooth as well!");
      })
      .catch((error) => {
        setMessage(`handlePromiseWait - ❌ Error: ${error.message}`);
        console.error(error);
      });
  };

  // 👇 Simulated Promise-based function
  const simulateAsyncTask = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        //-----------------------------------
        //reject(new Error("Something went wrong!"));
      }, 5000);
    });
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>🔁 Synchronous vs Async/Await vs Promise</h2>
      <p>⏱️ Counter: {count}</p>

      <button onClick={handleSyncBlock} style={buttonStyleRed}>
        Freeze UI (Sync)
      </button>

      <button onClick={handleAsyncWait} style={buttonStyleGreen}>
        Wait with Async/Await
      </button>

      <button onClick={handlePromiseWait} style={buttonStyleBlue}>
        Wait with Promise
      </button>

      <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}

const buttonStyleRed = {
  marginRight: "10px",
  padding: "10px 20px",
  backgroundColor: "#d32f2f",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const buttonStyleGreen = {
  marginRight: "10px",
  padding: "10px 20px",
  backgroundColor: "#388e3c",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const buttonStyleBlue = {
  padding: "10px 20px",
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default App;
