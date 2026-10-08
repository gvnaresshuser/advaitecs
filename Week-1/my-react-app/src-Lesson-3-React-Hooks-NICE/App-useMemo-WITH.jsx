import React, { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0);
  const [counter, setCounter] = useState(0);
  //WITH USEEFFECT
  //const [result, setResult] = useState(0);

  function cubeNum(num) {
    console.log("Calculation Done!");
    return Math.pow(num, 3);
  }

  //const result = cubeNum(number);//WHEN WE CLICK COUNTER++ BUTTON AS THE COUNTER CHANGES IT RE-RENDERS THE COMPONENT
  //SO cubeNum FUNCTION IS CALLED ALWAYS..TO AVOID THIS WE USE useMemo

  //SYNTAX OF useMemo - useMemo(cb,[dependencies])
  //const result = useMemo(() => { return cubeNum(number); }, [number]);
  const result = useMemo(() => cubeNum(number), [number]); //cubeNum FUNCTION WILL EXECUTE ONLY WHEN number GETS CHANGED
  /*
//WITH USEEFFECT   
useEffect(() => {
    console.log("useEffect called");
    setResult(cubeNum(number));
  }, [number]); 
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
          style={{ border: "1px solid green", textAlign: "center" }}
          type="number"
          value={number}
          onChange={(e) => {
            setNumber(Number(e.target.value));
          }}
        />
        <h1>Cube of the number:{result}</h1>
        <button
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          Counter++
        </button>
        <h1>Counter:{counter}</h1>
      </section>
    </>
  );
}

export default App;
/*
useMemo caches the calculated result, not the number itself.

In your code:

const result = useMemo(() => cubeNum(number), [number]);

Think of it as:

useMemo(
    calculation/function,
    dependency
)
       ↓
   number
       ↓
  cached result

So React is essentially remembering:

"For this particular dependency value, I already calculated the result. 
I can reuse that result."

Let's trace your example

Initially:

number = 2
counter = 0

React executes:

cubeNum(2)

and gets:

Calculation Done!
8

useMemo remembers the result 8, associated with the dependency value number = 2.

Conceptually:

Cached:
number = 2  →  result = 8
Now click Counter++

counter changes:

number = 2
counter = 1

The component re-renders.

React looks at:

[number]

and sees:

Previous number = 2
Current number  = 2

Since the dependency has not changed, React says:

"I don't need to execute cubeNum() again. I already have the memoized result."

So:

cubeNum() ❌ NOT executed

result = 8 ✅ reused from cache

This is the key benefit of useMemo.

Now change the number from 2 → 3

Now:

number = 3
counter = 1

React compares the dependency:

Previous number = 2
Current number  = 3

They are different.

Therefore React says:

"The dependency changed. The old cached result may no longer be valid. I need to execute the calculation again."

So:

cubeNum(3)

executes:

Calculation Done!

and returns:

27

Now the memoized value becomes:

number = 3  → result = 27
*/
