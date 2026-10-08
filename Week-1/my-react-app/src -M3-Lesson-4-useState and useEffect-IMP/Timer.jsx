import React, { useState, useEffect } from "react";

//USE EFFECT HOOK EXAMPLE
// This component demonstrates a simple timer using the useEffect hook
const Timer = () => {
  console.log("TIMER");  
  const [count, setCount] = useState(0);

  // Event handler to increment count
  const incrementCount = () => {
    console.log("INCREMENT COUNT");
    //setCount(count + 1);//RISKY'
    setCount((prevCount) => prevCount + 1); // safer way to update state based on previous value
  };

  //-----------------1111111111111111------------------------
  /*
    Runs:
        ✅ Initial render
        ✅ Every state change
        ✅ Every prop change
        ✅ Every re-render
    */
  /*   useEffect(() => {
    console.log("useEffect called : " + count);
    //}, []);
  }); */

  //------------------22222222222222-----------------------

  // useEffect runs after the component renders
  useEffect(() => {
    console.log("USE EFFECT");
    console.log("Component mounted or count updated");
    const timer = setInterval(() => {
      console.log("USE EFFECT - SET INTERVAL");
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // Cleanup function
    return () => {
      console.log("USE EFFECT - CLEARING TIMER");
      clearInterval(timer);
      console.log("Timer cleared");
    };
  }, []); //--> 1.Runs only once on mount because the dependency array is empty
  //}, [count]); //--> 2.Runs after the initial render and whenever 'count' changes.
  //}); //--> 3.Runs after every render (usually avoid unless needed). (not recommended)
  //-------------------------------------------------------------------
  //------------------33333333333333333333-----------------------
  /* useEffect(() => {
    console.log("Effect");

    const timer = setInterval(() => {
      console.log("Timer running...");
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      console.log("Cleanup");
      clearInterval(timer);
    };
  }, [count]); */
  return (
    <div>
      {console.log("RENDERING")}
      <h2>Timer: {count} seconds</h2>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
};

export default Timer;
/*
setInterval and clearInterval are built-in JavaScript functions — 
they come out of the box with the browser (and Node.js), not React.

🔹 What is setInterval?
setInterval is a built-in JavaScript function that repeatedly executes a function 
after a specified time interval (in milliseconds).
*/
/*
You can add these comments:

useEffect(() => {
  console.log("useEffect called: " + count);

  // Runs after EVERY render:
  // - Initial render (component mount)
  // - Every state update
  // - Every prop update
  // - Any re-render
});

If you use an empty dependency array:

useEffect(() => {
  console.log("useEffect called: " + count);

  // Runs ONLY ONCE after the initial render (component mount).
  // Does NOT run again on state or prop changes.
}, []);

For completeness, here are the three common useEffect patterns:

1. No dependency array
useEffect(() => {
  console.log("Runs after every render.");
});

Runs:

✅ Initial render
✅ Every state change
✅ Every prop change
✅ Every re-render

2. Empty dependency array
useEffect(() => {
  console.log("Runs only once.");
}, []);

Runs:

✅ Initial render only

3. Specific dependency
useEffect(() => {
  console.log("Count changed:", count);
}, [count]);

Runs:

✅ Initial render
✅ Whenever count changes
❌ Does not run if other state variables change

This third pattern is the one you'll use most often in real-world 
React applications because it lets you run side effects only when the 
relevant state or props change.
*/
/*
//------------------333333333333333-----------------------
*/

//OUTPUT
//11111111111111111
// }, []);  //--> 1.Runs only once on mount because the dependency array is empty
/*
Component mounts
      ↓
Render #1
      ↓
useEffect runs
      ↓
setInterval() creates Timer #1
      ↓
Timer #1 keeps running every 1 second
      ↓
setCount()
      ↓
Render #2
      ↓
useEffect does NOT run again
      ↓
Timer #1 continues
      ↓
setCount()
      ↓
Render #3
      ↓
useEffect does NOT run again
      ↓
Timer #1 continues
*/
//22222222222222222222222222222
//}, [count]); //--> 2.Runs after the initial render and whenever 'count' changes.
//React's rule is:
//Before React runs an effect again, it first cleans up the previous effect.
/*
React's rule is:
Before React runs an effect again, it first cleans up the previous effect.

And more specifically:
When the dependency array changes, React first runs the cleanup function from the previous effect, and then runs the new effect.

For this example:
[count] changes → Cleanup old timer → Run new effect → Create new timer.

And when the component is unmounted:
Component unmounts → Cleanup the last effect → Component is removed.
*/
//333333333333333333333333333333333333
//});//--> 3.Runs after every render (usually avoid unless needed). (not recommended)
/*
                    INITIAL RENDER
                         ↓
                    useEffect
                         ↓
                    Timer #1
                         ↓
                     1 second
                         ↓
                    setCount()
                         ↓
                    Re-render
                         ↓
                  CLEANUP Timer #1
                         ↓
                    useEffect
                         ↓
                    Timer #2
                         ↓
                     1 second
                         ↓
                    setCount()
                         ↓
                    Re-render
                         ↓
                  CLEANUP Timer #2
                         ↓
                    useEffect
                         ↓
                    Timer #3
                         ↓
                        ...
*/
