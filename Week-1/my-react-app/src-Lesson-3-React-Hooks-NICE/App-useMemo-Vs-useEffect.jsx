import React, { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0);
  const [counter, setCounter] = useState(0);

  // useEffect version would need another state variable:
  // const [result, setResult] = useState(0);

  function cubeNum(num) {
    console.log("Calculation Done!");
    return Math.pow(num, 3);
  }

  /*
  ============================================================
                    WITHOUT useMemo
  ============================================================

  const result = cubeNum(number);

  Problem:
  Whenever ANY state changes, the component re-renders.

  For example, when we click Counter++:

      counter changes
           ↓
      Component re-renders
           ↓
      cubeNum(number) executes AGAIN
           ↓
      "Calculation Done!" appears in console

  Even though "number" did NOT change!

  So, if cubeNum() is an expensive calculation, this is
  unnecessary work.

  ============================================================
                    WITH useMemo
  ============================================================

  SYNTAX:

  useMemo(callback, [dependencies])

  Example:

  const result = useMemo(() => {
    return cubeNum(number);
  }, [number]);

  Meaning:

  "Calculate the result and remember/cache that calculated value.
   Recalculate it only when number changes."

  Our code:
  */

  const result = useMemo(() => cubeNum(number), [number]);

  /*
  ============================================================
                  HOW useMemo WORKS
  ============================================================

  useMemo(() => cubeNum(number), [number]);

                         dependency
                              ↓
                         [ number ]
                              ↓
                    Has number changed?
                       ↙            ↘
                     NO              YES
                     ↓                ↓
              Use cached value     Calculate
                     ↓                ↓
                     8              27


  IMPORTANT:

  useMemo does NOT cache the dependency variable.

  [number] tells React WHEN the cached value is still valid.

  The thing that is cached/memoized is the RETURN VALUE
  of the callback.

  Example:

      number = 2
          ↓
      cubeNum(2)
          ↓
          8
          ↓
      8 is memoized/cached


  ============================================================
                WHAT HAPPENS WHEN COUNTER CHANGES?
  ============================================================

  We click:

      setCounter(counter + 1);

              ↓

      counter changes
              ↓
      Component re-renders
              ↓
      useMemo checks [number]
              ↓
      number has NOT changed
              ↓
      useMemo uses cached result
              ↓
      cubeNum() is NOT called again


  ============================================================
                    useEffect VERSION
  ============================================================

  We CAN achieve the same visible result using useEffect,
  but we need another state variable:

      const [result, setResult] = useState(0);

      useEffect(() => {
        setResult(cubeNum(number));
      }, [number]);


  With this approach:

      number changes
           ↓
      Render #1
           ↓
      UI initially renders
           ↓
      useEffect runs AFTER rendering
           ↓
      cubeNum(number)
           ↓
      setResult(...)
           ↓
      Render #2
           ↓
      UI displays the new result


  ============================================================
              DISADVANTAGES OF useEffect HERE
  ============================================================

  Using useEffect for this calculation introduces:

  1. Extra state variable

       const [result, setResult] = useState(0);

  2. Extra render

       setResult(...)
            ↓
       causes another render

  3. result is actually DERIVED DATA

       result = cubeNum(number)

     We don't really need to store it separately.
     We can calculate it from number.

  Therefore, useMemo is simpler for this particular case.


  ============================================================
                    SIDE-BY-SIDE
  ============================================================

  useMemo:

      const result = useMemo(
        () => cubeNum(number),
        [number]
      );

      Meaning:

      "Calculate a value and remember it until
       the dependency changes."


  useEffect:

      const [result, setResult] = useState(0);

      useEffect(() => {
        setResult(cubeNum(number));
      }, [number]);

      Meaning:

      "After rendering, perform an action when
       number changes and update the result state."


  ============================================================
                     KEY DIFFERENCE
  ============================================================

  useMemo
  -------
  • Calculates a value
  • Returns a value
  • Runs during rendering
  • Can cache/memoize the calculated value
  • Useful for expensive calculations
  • No extra state required


  useEffect
  ---------
  • Performs a side effect
  • Runs AFTER rendering
  • Does not provide a value for rendering
  • Often used with state when an effect needs
    to update the UI
  • Used for things outside the normal calculation/rendering


  ============================================================
                       EASY MEMORY TRICK
  ============================================================

  useMemo:

      "WHAT VALUE SHOULD I CALCULATE?"

              ↓

      const result = useMemo(...);


  useEffect:

      "WHAT SHOULD I DO AFTER RENDERING?"

              ↓

      useEffect(() => {
        // perform side effect
      });


  ============================================================
                     VERY IMPORTANT
  ============================================================

  Don't use useMemo for every calculation.

  Our cube calculation is extremely simple:

      const result = number ** 3;

  This is perfectly fine.

  useMemo becomes useful when the calculation is expensive
  or when memoization/referential stability is actually needed.


  ============================================================
                        FINAL SUMMARY
  ============================================================

  useMemo:

      Calculate + remember a VALUE
              ↓
      During rendering


  useEffect:

      Perform an ACTION / SIDE EFFECT
              ↓
      After rendering


  BEST WAY TO REMEMBER:

      useMemo  → "What value should I calculate?"

      useEffect → "What should I DO after rendering?"
  */

  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useMemo Hook
          </h1>
        </div>

        <input
          style={{
            border: "1px solid green",
            textAlign: "center",
          }}
          type="number"
          value={number}
          onChange={(e) => {
            setNumber(Number(e.target.value));
          }}
        />

        <h1>Cube of the number: {result}</h1>

        <button
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          Counter++
        </button>

        <h1>Counter: {counter}</h1>
      </section>
    </>
  );
}

export default App;
/*
| `useMemo`                            | `useEffect`                          |
| ------------------------------------ | ------------------------------------ |
| Calculates a value                   | Performs an effect                   |
| Returns a value                      | Doesn't return a value for rendering |
| Runs during rendering                | Runs after rendering                 |
| Useful for expensive calculations    | Useful for side effects              |
| Doesn't require another state update | Often updates state when needed      |
| `const result = ...`                 | `setResult(...)`                     |

*/
