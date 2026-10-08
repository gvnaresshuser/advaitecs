//✅ Example 2: Sharing Data WITH Context Provider
import "./App.css";
import React, { createContext, useContext } from "react";
//STEPS
// 1. Create the context
// 2. Create a provider
// 3. Create a consumer
//Context is a store of useful information that can be accessed 
//by different parts of an application.

// Create context
const SharedDataContext = createContext();

// Components consuming context
function MyComponent1() {
  const data = useContext(SharedDataContext);
  return <div>Component 1: {data}</div>;
}

function MyComponent2() {
  const data = useContext(SharedDataContext);
  return <div>Component 2: {data}</div>;
}

function MyComponent3() {
  const data = useContext(SharedDataContext);
  return <div>Component 3: {data}</div>;
}

function MyComponent4() {
  const data = useContext(SharedDataContext);
  return <div>Component 4: {data}</div>;
}

function App() {
  const sharedData = "Hello from Context";

  return (
    <SharedDataContext.Provider value={sharedData}>
      <h1>With Context</h1>
      <MyComponent1 />
      <MyComponent2 />
      <MyComponent3 />
      <MyComponent4 />
    </SharedDataContext.Provider>
  );
}

export default App;
