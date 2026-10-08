/*
2. Uncontrolled Component
An uncontrolled component is an input whose value is managed by the DOM, 
not React state.
We usually use useRef() to access its value.
*/
import { useRef } from "react"; //UNCONTROLLED COMPONENT
import "./App.css";
function App() {
  const nameRef = useRef();
  //useRef() does not trigger a React re-render when its value changes.

  const handleSubmit = () => {
    alert(nameRef.current.value);
  };

  return (
    <div>
      <input
        style={{
          padding: "8px",
          fontSize: "16px",
          marginRight: "10px",
          border: "1px solid black",
        }}
        type="text"
        ref={nameRef}
      />

      <button onClick={handleSubmit}>Submit</button>
      <p>Name: {nameRef.current?.value}</p>
      {/* NOTHING WILL BE DISPLAYED BECAUSE nameRef.current is undefined */}
    </div>
  );
}

export default App;
