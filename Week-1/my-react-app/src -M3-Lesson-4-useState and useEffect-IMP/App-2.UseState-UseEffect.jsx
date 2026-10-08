import { useState, useEffect } from 'react';
import './App.css';

//USE STATE AND USE EFFECT EXAMPLE
// This component demonstrates a simple counter using the useState hook and the useEffect hook
function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    //setCount(count + 1);//RISKY
    setCount((prevCount) => prevCount + 1); //SAFER 
  };

  useEffect(() => {
    console.log(`Count has been updated to: ${count}`);
  }, [count]);

  return (
    <>
      <div>
        <button onClick={increment}>Increment</button>
        <p>Count: {count}</p>

      </div>
    </>
  );
}

export default App;
