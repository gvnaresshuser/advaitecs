import React, { useState } from "react";
import "./App.css";
function App() {
  /* let count = 10; */

  const [count, setCount] = useState(10);

  //console.log(count);
  function changeCount() {
    //count = count + 1;
    /*Because changing a normal variable does not
    tell React to render the component again.
    */
    //setCount(count + 1);//RISKY - DON'T USE THIS
    /*
     * `setCount()` **schedules** a state update.
     * React updates the state and re-renders the component afterward.
     * During the current function call, `count` still has the old value.
     * React will use the new value when rendering the component.
     */
    console.log("Inside changeCount:" + count);
    //IF YOU WANT TO CHANGE THE VALUE MULTIPLE TIMES
    //WILL NOT WORK
    /*  
    setCount(count + 1);//10 + 1
    setCount(count + 1);//11 + 1
    setCount(count + 1);//11 + 1
    */
    //-----------------------------
    /*
    //BEST WAY TO USE SETCOUNT
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    */
    /*  
    setCount((count) => count + 1); //11 + 1
    setCount((count) => count + 1); //12 + 1
    setCount((count) => count + 1); //13 + 1 
    */
    setCount((count) => count + 1); //10 + 1//Parentheses are optional when there's exactly one parameter.
    setCount((count) => count + 1); //10 + 1
    setCount((count) => count + 1); //10 + 1
    //-------------- OR DON'T FORGET RETURN ----------------
    /*  setCount((prev) => {
      return prev + 1;
    });
    setCount((prev) => {
      return prev + 1;
    }); */
    //-------------- OR DON'T FORGET RETURN ----------------
  }
  return (
    <div style={{ fontSize: "62px", fontWeight: "bold", color: "green" }}>
      {count}
      <button onClick={changeCount}>Increment</button>
    </div>
  );
}

export default App;

/*
1111111111111
> Because changing a normal variable does NOT 
tell React to render the component again.

2222222222222
The UI updates because `setCount()` tells React:
> "The state has changed. Render the component again."

3333333333333
* `setCount()` **schedules** a state update.
* React updates the state and re-renders the component afterward.
* During the current function call, `count` still has the old value.

444444444444
IF YOU WANT TO CHANGE THE VALUE MULTIPLE TIMES
USE ARROW FUNCTION TYPE
setCount((count) => count + 1);
OR - DON'T FORGET RETURN
 setCount((prev) => {
      return prev + 1;
    });

*/

/*
setCount((prev) => prev + 1);      // ✅ Best practice
setCount((count) => count + 1);    // ✅ Valid
setCount(count => count + 1);      // ✅ Valid
setCount((prev) => {
  return prev + 1;
});                                // ✅ Valid
*/
