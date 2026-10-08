import React, { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";

function App() {
  //THOUGH THIS IS FIRST - WE CAN SEE IN THE CONSOLE LOG THAT THIS - Message from useLayoutEffect - COMES FIRS
  useEffect(() => {
    //3333333333333 - called
    console.log("Message from useEffect!"); //SECOND THIS IS PRINTED IN CONSOLE
  }, []);
  useLayoutEffect(() => {
    //111111111111 - called
    console.log("Message from useLayoutEffect!"); //FIRST THIS IS PRINTED IN CONSOLE
  }, []);

  return (
    //22222222222222222 - called
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useLayoutEffect Hook
          </h1>
          <h2>Test Message</h2>
          {Array(40000)
            .fill("")
            .map((item, index) => (
              <li key={index}>{Math.pow(Math.random(), 10)}</li>
            ))}
        </div>
      </section>
    </>
  );
}

export default App;
/*
Math.random()
generates a random decimal number between 0 (inclusive) and 1 (exclusive).
0.1234
0.8271
0.4567
0.9912
Generate a random number between 0 and 1, then raise it to the power of 10.
For example:
Math.pow(0.5, 10)
gives approximately:
0.0009765625

1. React renders JSX
        ↓
2. DOM is updated
        ↓
3. useLayoutEffect runs
        ↓
4. Browser paints the screen
        ↓
5. useEffect runs
--------------------------
useLayoutEffect
useLayoutEffect(() => {
  // runs after DOM update
  // before the browser paints
}, []);

It runs synchronously after React has updated the DOM but before the 
browser paints the updated screen.

That's why it is useful when you need to:

measure an element's width/height
read its position
make a DOM change before the user sees the result
prevent visual flickering
------------------------------
useEffect
useEffect(() => {
  // runs after browser painting
}, []);

It generally runs after the browser has had an opportunity to paint the updated UI.

It's normally used for things such as:

API calls
subscriptions
timers
event listeners
synchronization with external systems
*/
