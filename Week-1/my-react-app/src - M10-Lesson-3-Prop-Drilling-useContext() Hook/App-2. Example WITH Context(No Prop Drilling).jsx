//✅ 2. Example WITH Context(No Prop Drilling)
import "./App.css";
import React, { createContext, useContext } from "react";

//STEPS
// 1. Create the context
// 2. Create a provider
// 3. Create a consumer
//Context is a store of useful information that can be accessed
//by different parts of an application.

// Create the context
const SharedDataContext = createContext();

function MyComponent4() {
  const data = useContext(SharedDataContext);
  return <div>Component 4: {data}</div>;
}

function MyComponent3() {
  return (
    <div>
      Component 3
      <MyComponent4 />
    </div>
  );
}

function MyComponent2() {
  return (
    <div>
      Component 2
      <MyComponent3 />
    </div>
  );
}

function MyComponent1() {
  return (
    <div>
      Component 1
      <MyComponent2 />
    </div>
  );
}

function App() {
  const sharedData = "Hello from Context";

  return (
    <SharedDataContext.Provider value={sharedData}>
      <h1>With Context</h1>
      <MyComponent1 />
    </SharedDataContext.Provider>
  );
}

export default App;
