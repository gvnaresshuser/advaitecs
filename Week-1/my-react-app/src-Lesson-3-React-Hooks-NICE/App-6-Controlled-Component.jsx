/*
1. Controlled Component
A controlled component is an input whose value is controlled by React state.
*/
import { useState } from "react";
import "./App.css";
function App() {
  const [name, setName] = useState(""); //CONTROLLED COMPONENT

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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>Name: {name}</p>
    </div>
  );
}

export default App;
