import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  //useEffect(cb,[d]) - cb = callback function, d = dependency array which is optional
  //------------------------------------------------------
  //3 types of usage
  //useEffect(cb)//no dependencies
  //useEffect(cb, [])//empty array
  //useEffect(cb, [variables])//array with variables
  //------------------------------------------------------

  const [count, setCount] = useState(0);
  const [name, setName] = useState("Naressh");
  const changeName = () => {
    setName("Gudimetla");
    console.log(name);
  };
  //11111111111111111
  /*     useEffect(() => {
      setTimeout(() => {
        setCount(count => count + 1);
      }, 2000);
    });//NO DEPENDENCY ARRAY 
    */
  //222222222222222
  /*   useEffect(() => {
    setTimeout(() => {
      setCount(count => count + 1);
    }, 2000);
  }, []);//EMPTY DEPENDENCY ARRAY */

  //3333333333333
  /* useEffect(() => {
    setTimeout(() => {
      setCount(count => count + 1);
    }, 2000);
  }, [count]);//WITH DEPENDENCY ARRAY  */
  // - whenever count changes it will again execute the callback function, also whenever the component is loaded first time

  //444444444444444
  /*   useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 2000);
  }, [count, name]); //WITH MORE THAN ONE DEPENDENCIES IN DEPENDENCY ARRAY */

  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useEffect Hook
          </h1>
        </div>
        {/* <h1>I've Rendered 0 times</h1> */}
        {/*  WE WILL SEE 0,2,3,4,5 AND SO ON AND NOT 1 as it is in StrictMode
        remove StrictMode in main.jsx file */}
        {/* <h1>I've Rendered {count} times</h1> */}
        <h1>
          I've Rendered {count} times - {name}
        </h1>
        {/* <button onClick={changeName}>Gudimetla</button> */}
        <button onClick={() => changeName()}>Gudimetla</button>
      </section>
    </>
  );
}

export default App;
/*
What happens without StrictMode
Component renders.
useEffect runs once.
One setTimeout is created.

After 2 seconds:

setCount(count => count + 1);
Count becomes:
0 → 1 → 2 → 3 → 4 ...
What happens with StrictMode

In development, React does something like:

Mount component
Run effect
Unmount component
Mount component again
Run effect again

As a result, two timeouts get created.

After 2 seconds:

Timeout #1: 0 → 1
Timeout #2: 1 → 2

So the UI quickly jumps from:

0 → 2 → 4 → 6 ...

and you may never visually notice 1.
*/
