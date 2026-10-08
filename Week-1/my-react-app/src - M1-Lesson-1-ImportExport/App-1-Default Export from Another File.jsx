//1. Default Export from Another File
import MyComponent from './MyComponent'; // No curly braces
import "./App.css";
function App() {
  return <MyComponent />;
}

export default App;
