import React from "react";
import "./App.css";
import ImperativeHandleExample from "./ImperativeHandleExample";

function App() {
  return (
    <section id="center">
      <ImperativeHandleExample />
    </section>
  );
}

export default App;
/*
Definition of useImperativeHandle

useImperativeHandle is a React Hook that allows a child component to 
control which functions or values are exposed to the parent component through 
a ref.
*/