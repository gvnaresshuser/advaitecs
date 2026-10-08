import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0);

  // A NEW function is created on every App render
  const newFn = () => {
    console.log("Hello");
  };

  return (
    <>
      <section id="center">

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useCallback Hook
          </h1>
        </div>

        <Header newFn={newFn} />

        <h1>Count: {count}</h1>

        <button onClick={() => setCount(prev => prev + 1)}>
          Click Here
        </button>

      </section>
    </>
  );
}

export default App;