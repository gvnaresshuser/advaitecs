import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  /*
  //RUNS INFINITELY  
  useEffect(()=>{
     setCount(prev => prev + 1)
   }); 
   */
  /*    useEffect(() => {
     setCount((prev) => prev + 1);
   },[value]);  */
  //USE useRef FOR THIS TYPE OF SITUATIONS...SEE NEXT EXAMPLE - App-useRef-2

  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useRef Hook
          </h1>
        </div>
        <button
          onClick={() => {
            setValue((prev) => prev - 1);
          }}
        >
          -1
        </button>
        <h1>{value}</h1>
        <button
          onClick={() => {
            setValue((prev) => prev + 1);
          }}
        >
          +1
        </button>
        <h1>Render Count:{count}</h1>
      </section>
    </>
  );
}

export default App;
