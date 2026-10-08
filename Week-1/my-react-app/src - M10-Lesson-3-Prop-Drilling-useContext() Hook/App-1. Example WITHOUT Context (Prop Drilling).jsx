//✅ 1. Example WITHOUT Context (Prop Drilling)
import './App.css';

function MyComponent4({ data }) {
  return <div>Component 4: {data}</div>;
}

function MyComponent3({ data }) {
  return (
    <div>
      Component 3
      <MyComponent4 data={data} />
    </div>
  );
}

function MyComponent2({ data }) {
  return (
    <div>
      Component 2
      <MyComponent3 data={data} />
    </div>
  );
}

function MyComponent1({ data }) {
  return (
    <div>
      Component 1
      <MyComponent2 data={data} />
    </div>
  );
}

function App() {
  const sharedData = "Hello from App (prop drilling)";

  return (
    <div>
      <h1>Without Context</h1>
      <MyComponent1 data={sharedData} />
    </div>
  );
}

export default App;
