import { useState, useEffect, useLayoutEffect, useRef } from "react";

function App() {
  const buttonRef = useRef();

  const [position, setPosition] = useState({
    top: 20,
    left: 20,
  });

  //useEffect(() => {
  useLayoutEffect(() => {
    //console.log("useEffect running");
    console.log("useLayoutEffect running");

    const rect = buttonRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + 10,
      left: rect.left,
    });
  }, []);

  return (
    <div>
      <button
        ref={buttonRef}
        style={{
          margin: "200px",
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: "lightblue",
          border: "2px solid blue",
        }}
      >
        Target Button
      </button>

      <div
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
          backgroundColor: "black",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "16px",
          zIndex: 1000,
        }}
      >
        👋 Tooltip
      </div>
    </div>
  );
}

export default App;
