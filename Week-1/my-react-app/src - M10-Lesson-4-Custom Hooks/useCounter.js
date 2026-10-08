import { useState, useRef } from "react";

function useCounter(initialValue = 0) {
  console.log(initialValue);
  const [count, setCount] = useState(initialValue);
  //const initialRef = useRef(initialValue); // ✅ This always holds the original value

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);
  //const reset = () => setCount(initialRef.current); // ✅ Use the ref to preserve the original initial value across renders

  return { count, increment, decrement, reset };
}

export default useCounter;
/*
useRef is not required simply to remember the initial value in your 
current useCounter implementation. Both lines behave the same. 
useRef becomes useful when you need to preserve or modify a value 
independently of React's rendering cycle.
*/
