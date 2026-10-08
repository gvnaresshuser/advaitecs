import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  /*  let count = 10;
  //console.log(count);
  function handleClick() {
    count = count + 1;
    console.log(count);
  } */
  const [count, setCount] = useState(10);
  function handleClick() {
    /* setCount(count+1);
    setCount(count + 1);
    setCount(count + 1); */
    setCount(() =>  + 1);
    setCount(() =>  + 1);
    setCount((prevCount) => prevCount + 1);
    //console.log(count);
  }
  useEffect(() => {
    console.log(count);
  });
  return (
    <>
      <div style={{ fontSize: "62px", fontWeight: "bold", color: "green" }}>
        {count}
      </div>
      <button onClick={handleClick}>Increment</button>
    </>
  );
};

export default App;
/*
Definition of useEffect (React)

useEffect is a React Hook that lets you perform side effects in a functional component 
after it renders.

A side effect is any operation that interacts with something outside the 
component's rendering process, such as:

Fetching data from an API
Calling a backend service
Setting up timers (setInterval, setTimeout)
Adding or removing event listeners
Updating the document title
Working with localStorage or sessionStorage
Connecting to WebSockets
*/
//useState = "Store data and update the UI when the data changes."
//useEffect = "After rendering, do something."
