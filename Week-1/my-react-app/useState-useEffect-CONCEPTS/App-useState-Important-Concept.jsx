import React, { useState } from "react";
import "./App.css";

const App = () => {
  /*   let count = 10;
  console.log(count);
  function increment() {
    count = count + 1;
    console.log("Inside increment:"+count);
  } */
  const [count, setCount] = useState(10);

  function increment() {
    setCount(count + 1);
    //setCount((prevCount) => prevCount + 1);
    console.log("Inside increment:" + count);
  }

  return (
    <div style={{ fontSize: "62px", fontWeight: "bold", color: "green" }}>
      {count}
      <br />
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default App;
