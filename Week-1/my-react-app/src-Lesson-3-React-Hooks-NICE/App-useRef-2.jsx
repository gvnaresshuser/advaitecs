import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState(0);
  const count = useRef(0);//PROVIDE INITIAL VALUE - OPTIONAL
  console.log(count);
  /*
  //RUNS INFINITELY  
  useEffect(()=>{
     setCount(prev => prev + 1)
   }); 
   */
  //USE useRef FOR THIS TYPE OF SITUATIONS...SEE NEXT EXAMPLE
  useEffect(() => {
    //USE USEREF HOOK WHEN WE DO NOT WANT TO RE-REDNER THE COMPONENT
    count.current = count.current + 1;
  });

  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useRef Hook
          </h1>
        </div>
        <button onClick={() => { setValue(prev => prev - 1); }}>-1</button>
        <h1>{value}</h1>
        <button onClick={() => { setValue(prev => prev + 1); }}>+1</button>
        <h1>Render Count:{count.current}</h1>
      </section>
    </>
  );
}

export default App;
