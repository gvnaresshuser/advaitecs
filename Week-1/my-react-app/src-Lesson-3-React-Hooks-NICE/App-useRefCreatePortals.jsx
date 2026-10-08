import React, { useState, useRef, useEffect } from "react";
import ModalPortal from "./ModalPortal";
import "./App.css";
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null); // Step 1: Create a ref

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus(); // Step 2: Use the ref
    }
  }, [showModal]);

  const closeButtonStyle = {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
    border: "none",
    color: "white",
    padding: "8px 12px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "transform 0.2s ease, background 0.3s ease",
  };

  closeButtonStyle[":hover"] = {
    transform: "scale(1.1)",
    background: "linear-gradient(135deg, #e60039 0%, #ffa07a 100%)",
  };

  const btnStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "background 0.3s ease",
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
          React Portals Example
        </h1>
      </div>
      <br />
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      <p>{inputRef.current?.value}</p>
      {showModal && (
        <ModalPortal>
          <p>This is a modal rendered using a Portal!</p>
          <input ref={inputRef} placeholder="Focus me automatically" />
          <button style={btnStyle} onClick={() => setShowModal(false)}>
            Close
          </button>
          {/* <button style={closeButtonStyle} onClick={() => setShowModal(false)}>✖</button> */}
          {/* <button style={closeButtonStyle} onClick={() => setShowModal(false)}>Close</button> */}
        </ModalPortal>
      )}
    </div>
  );
};
export default App;
//NOTE: ADD THIS IN index.html
//<div id="modal-root"></div> <!-- 👈 For portal -->
