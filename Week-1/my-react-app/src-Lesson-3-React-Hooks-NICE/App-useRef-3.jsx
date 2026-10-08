import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const inputElem = useRef();
  const btnClicked = () => {
    console.log(inputElem.current);
    inputElem.current.style.background = "blue";
    inputElem.current.style.color = "white";
    inputElem.current.style.padding = "10px";
  };
  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useRef Hook
          </h1>
        </div>
        <input placeholder="Enter your name" type="text" ref={inputElem} />
        <button onClick={btnClicked}>Click Here</button>
      </section>
    </>
  );
}

export default App;
