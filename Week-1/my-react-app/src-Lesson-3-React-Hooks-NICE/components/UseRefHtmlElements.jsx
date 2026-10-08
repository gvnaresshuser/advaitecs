import React, { useRef, useEffect } from "react";

function UseRefHtmlElements() {
  const inputRef = useRef();
  const textAreaRef = useRef();
  const buttonRef = useRef();
  const divRef = useRef();
  const videoRef = useRef();
  const selectRef = useRef();

  // Input Focus on Load
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSelectTextArea = () => {
    textAreaRef.current.focus();
    textAreaRef.current.select();
    textAreaRef.current.style.backgroundColor = "lightyellow";
    textAreaRef.current.style.fontSize = "24px";
    textAreaRef.current.style.fontFamily = "Georgia";
  };

  const handleTriggerButtonClick = () => {
    buttonRef.current.click();
  };

  const handleRealButtonClick = () => {
    alert("Button was clicked!");
  };

  const changeDivStyle = () => {
    divRef.current.style.backgroundColor = "lightgreen";
    divRef.current.style.padding = "20px";
  };

  const playVideo = () => videoRef.current.play();
  const pauseVideo = () => videoRef.current.pause();

  const selectBanana = () => {
    selectRef.current.value = "banana";
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h2>🎯 useRef with Various HTML Elements</h2>

      {/* 1. Input */}
      <div>
        <h3>1️⃣ Input – Auto Focus on Load</h3>

        <input ref={inputRef} placeholder="Auto-focused on load" />
      </div>

      {/* 2. Textarea */}
      <div style={{ marginTop: "20px" }}>
        <h3>2️⃣ Textarea – Focus & Select Text</h3>

        <textarea
          ref={textAreaRef}
          rows="4"
          cols="40"
          defaultValue="Select this text on button click."
        />

        <br />

        <button onClick={handleSelectTextArea}>Focus & Select</button>
      </div>

      {/* 3. Button */}
      <div style={{ marginTop: "20px" }}>
        <h3>3️⃣ Button – Programmatic Click</h3>

        <button ref={buttonRef} onClick={handleRealButtonClick}>
          Actual Button
        </button>

        <br />

        <button onClick={handleTriggerButtonClick}>Trigger Click</button>
      </div>

      {/* 4. Div */}
      <div style={{ marginTop: "20px" }}>
        <h3>4️⃣ Div – Change Background with useRef</h3>

        <div
          ref={divRef}
          style={{
            border: "1px solid red",
            padding: "10px",
            width: "300px",
            margin: "0 auto",
          }}
        >
          This is a div box.
        </div>

        <br />

        <button onClick={changeDivStyle}>Highlight Div</button>
      </div>

      {/* 5. Video */}
      <div style={{ marginTop: "20px" }}>
        <h3>5️⃣ Video – Play / Pause</h3>

        <video
          ref={videoRef}
          width="320"
          height="240"
          controls
          src="https://www.w3schools.com/html/mov_bbb.mp4"
        />

        <br />

        <button onClick={playVideo}>Play</button>

        <button onClick={pauseVideo}>Pause</button>
      </div>

      {/* 6. Select */}
      <div style={{ marginTop: "20px" }}>
        <h3>6️⃣ Select – Change Selected Option</h3>

        <select ref={selectRef}>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
        </select>

        <br />

        <button onClick={selectBanana}>Select Banana</button>
      </div>
    </div>
  );
}

export default UseRefHtmlElements;

/*
The key idea of useRef

When you do:

textAreaRef.current.style.backgroundColor = "lightyellow";
textAreaRef.current.style.fontSize = "24px";
textAreaRef.current.style.fontFamily = "Georgia";

you are directly modifying the actual DOM element.

React does not re-render the component because of those changes.

Compare useState vs useRef

| `useState`                      | `useRef`                                         |
| ------------------------------- | ------------------------------------------------ |
| Stores data                     | Stores a mutable reference                       |
| Updating state causes re-render | Changing `.current` does **not** cause re-render |
| React controls the UI update    | You can directly access the DOM                  |
| `setValue(...)`                 | `ref.current = ...`                              |
| Used when UI needs to update    | Used when UI doesn't need React to re-render     |

useRef lets us persist a mutable value between renders without causing a 
re-render when that value changes. 
It can also be used to directly access DOM elements.

For example:
------------
const [color, setColor] = useState("white");

setColor("yellow");

React says:

State changed
     ↓
Re-render component
     ↓
React updates DOM

But:

textAreaRef.current.style.backgroundColor = "yellow";

is:

Ref points to DOM
       ↓
Direct DOM manipulation
       ↓
No React re-render
*/
