import { useEffect, useLayoutEffect, useState } from "react";

function App() {
  const [width, setWidth] = useState(100);

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    //setWidth(500);//IF WE SET THE WIDTH HERE - NO FLICKER
  }, []);

  useEffect(() => {
    console.log("useEffect");
    setWidth(500); //IF WE SET THE WIDTH HERE - IT FLICKERS
  }, []);

  return (
    <div
      style={{
        width: width,
        height: 100,
        background: "orange",
      }}
    >
      Hello
    </div>
  );
}
export default App;
/*
Main benefit
useLayoutEffect runs after React updates the DOM but BEFORE the browser paints the 
updated UI on the screen.
Because of this, if you make a DOM-related change inside useLayoutEffect, 
the user generally doesn't see the intermediate state, so you can avoid visual flickering.

| `useEffect`                                              | `useLayoutEffect`                                          |
| -------------------------------------------------------- | ---------------------------------------------------------- |
| Runs **after browser paint**                             | Runs **before browser paint**                              |
| User may see intermediate UI                             | Helps prevent intermediate UI from being visible           |
| Can cause visual flickering for DOM measurements/changes | Useful when you need to adjust DOM before the user sees it |
| Doesn't block painting                                   | Can block painting briefly                                 |
| Preferred for most side effects                          | Use when the effect must happen before paint               |

Typical use cases

useLayoutEffect is particularly useful when you need to:

Measure an element's width/height
Read its position
Calculate where something should appear
Position a tooltip/popover
Adjust layout before it becomes visible
Prevent a visual jump/flicker
*/
