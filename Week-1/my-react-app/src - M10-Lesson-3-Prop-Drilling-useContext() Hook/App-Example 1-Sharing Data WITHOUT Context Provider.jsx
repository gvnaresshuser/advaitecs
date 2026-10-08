//✅ Example 1: Sharing Data WITHOUT Context Provider
import './App.css';
import React from 'react';

function MyComponent1({ data }) {
  return <div>Component 1: {data}</div>;
}

function MyComponent2({ data }) {
  return <div>Component 2: {data}</div>;
}

function MyComponent3({ data }) {
  return <div>Component 3: {data}</div>;
}

function MyComponent4({ data }) {
  return <div>Component 4: {data}</div>;
}

function App() {
  const sharedData = "Hello from App";

  return (
    <div>
      <h1>Without Context</h1>
      <MyComponent1 data={sharedData} />
      <MyComponent2 data={sharedData} />
      <MyComponent3 data={sharedData} />
      <MyComponent4 data={sharedData} />
    </div>
  );
}

export default App;
