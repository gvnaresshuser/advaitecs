import React, { useState, useEffect } from 'react';
import './App.css';

//WITHOUT USEREDUCER HOOK

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useReducer Hook
          </h1>
        </div>
        <h1>{count}</h1>
        <button onClick={() => setCount(prev => prev + 1)}>Increase Count</button>
        <button onClick={() => setCount(prev => prev - 1)}>Decrease Count</button>

      </section>
    </>
  );
}

export default App;
