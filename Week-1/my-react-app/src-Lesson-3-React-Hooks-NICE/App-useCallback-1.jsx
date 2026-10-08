import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './App.css';
import Header from './components/Header';

function App() {

  //--------------------------------------
  //TRY THIS IN DEVELOPER TOOLS CONSOLE
  //const f1 = () => "Hello"
  //const f2 = () => "Hello"
  //f1 === f2
  //false
  //IN THE SAME WAY newFn FUNCTION WILL BE A NEW COPY AND PASSED TO HEADER
  // COMPONENT <Header newFn={newFn} />...SO IT GETS RE-RENDERED
  //--------------------------------------

  const [count, setCount] = useState(0);
  //  const newFn = ()=>{};
  //const newFn = useCallback(()=>{},[]);//HEADER COMPONENT IS NOT RENDERED - it will use cached function copy of newFn
  const newFn = useCallback((count) => { }, [count]);//WHEN COUNT CHANGES HEADER COMP IS CALLED
  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useCallback Hook
          </h1>
        </div>
        {/* <Header/> */}
        {/* PASS newFn AS A PROP TO HEADER COMPONENT */}
        <Header newFn={newFn} />
        <h1>{count}</h1>
        <button onClick={() => setCount(prev => prev + 1)}>Click Here</button>
      </section>
    </>
  );
}

export default App;
