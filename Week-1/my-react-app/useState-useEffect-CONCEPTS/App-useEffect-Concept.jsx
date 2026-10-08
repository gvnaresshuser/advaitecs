import React, { useState, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Naresh");

  console.log("🔄 Component Rendered");

  //-----------------------------------------------------
  // 1. Runs AFTER EVERY render
  //-----------------------------------------------------
  useEffect(() => {
    console.log("1️⃣ Runs after EVERY render");
  });

  //-----------------------------------------------------
  // 2. Runs ONLY ONCE (Component Mounted)
  //-----------------------------------------------------
  useEffect(() => {
    console.log("2️⃣ Component Mounted");

    return () => {
      console.log("2️⃣ Component Unmounted");
    };
  }, []);

  //-----------------------------------------------------
  // 3. Runs whenever COUNT changes
  //-----------------------------------------------------
  useEffect(() => {
    console.log("3️⃣ Count Changed:", count);
  }, [count]);

  //-----------------------------------------------------
  // 4. Runs whenever NAME changes
  //-----------------------------------------------------
  useEffect(() => {
    console.log("4️⃣ Name Changed:", name);
  }, [name]);

  //-----------------------------------------------------
  // 5. Runs whenever COUNT or NAME changes
  //-----------------------------------------------------
  useEffect(() => {
    console.log("5️⃣ Count or Name Changed");
  }, [count, name]);

  //-----------------------------------------------------
  // 6. Cleanup Example
  //-----------------------------------------------------
  useEffect(() => {
    console.log("6️⃣ Timer Started");

    const timer = setInterval(() => {
      console.log("⏰ Timer Running...");
    }, 1000);

    return () => {
      console.log("6️⃣ Cleaning Timer");
      clearInterval(timer);
    };
  }, [count]);

  return (
    <div style={{ padding: "20px", fontSize: "22px" }}>
      <h2>React useEffect Demo</h2>

      <h3>Count : {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      <br />
      <br />

      <h3>Name : {name}</h3>
      <button onClick={() => setName(name === "Naresh" ? "React" : "Naresh")}>
        Change Name
      </button>
    </div>
  );
};

export default App;
