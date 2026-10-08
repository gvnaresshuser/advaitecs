import React, { useState, useEffect } from "react";

// Custom hook for storing and retrieving data from local storage

const useLocalStorage = (key, initialValue) => {
  const [name, setName] = useState(
    localStorage.getItem(key) ? Number(localStorage.getItem(key)) : initialValue,
  );
  useEffect(() => {
    localStorage.setItem(key, name);
  }, [name, key]);

  return [name, setName];
};

// Example usage of the custom hook
function Counter() {
  const [count, setCount] = useLocalStorage("count", 0);
  //with simple useState
  //const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
    //setCount(count + 1);//RISKY
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
