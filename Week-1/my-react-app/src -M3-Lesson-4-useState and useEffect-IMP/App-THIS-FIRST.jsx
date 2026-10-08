import React, { useState, useEffect } from "react";
import "./App.css";

//REMEMBER
//useState = "Store data and update the UI when the data changes.";
//useEffect = "After rendering, do something.";
//StrictMode in development intentionally performs additional checks.

const App = () => {
  /*  let count = 10;
  console.log(count); */
  const [count, setCount] = useState(10);
  console.log("Component rendered", count);
  function handleClick() {
    console.log("handleClick::", count);
    //setCount(10);//IF VALUE IS NOT CHANGED - USE EFFECT WILL NOT RUN
    //setCount(11);
    /*  setCount(count + 1); //0 + 1
    setCount(count + 1); //0 + 1
    setCount(count + 1); //0 + 1
    setCount(count + 1); //0 + 1
    setCount(count + 1); //0 + 1 */
    /* setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prev) => prev + 1);
    //Because you used { } around the arrow function body, you need an explicit return statement
    setCount((count) => {
      console.log("fourth increment");
      return count + 1;
    }); */
    //------------------
    //The reason is ASI (Automatic Semicolon Insertion).
    //WILL RETURN UNDEFINED AS THERE IS NOTHING AFTER RETURN - JAVASCRIPT WILL INSERT SEMICOLON
    /* setCount((count) => {
      console.log("fifth increment");
      return;
      count + 1;
    }); */
    //------------------
    //THIS WILL WORK
    /* setCount((count) => {
      console.log("fifth increment");
      return count + 1;//KEEP IN SAME LINE
    }); */
    //------------------

    //console.log("handleClick", count); //showing old value
  }
  useEffect(() => {
    console.log("useEffect", count); // showing the updated value
  });
  //---------------------------------------------------
  //Every render
  useEffect(() => {
    console.log("Runs after every render");
  });
  //Only once after initial render
  useEffect(() => {
    console.log("Runs once");
  }, []);
  //Whenever count changes
  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);
  //---------------------------------------------------
  return (
    <div className="flex flex-col gap-6">
      <div style={{ fontSize: "62px", fontWeight: "bold", color: "green" }}>
        {count}
      </div>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default App;
