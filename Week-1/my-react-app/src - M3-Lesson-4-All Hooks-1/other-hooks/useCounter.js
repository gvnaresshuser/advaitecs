import { useDebugValue, useState } from "react";

function useCounter() {
  const [count, setCount] = useState(0);

  useDebugValue(`Count: ${count}`);

  return [count, setCount];
}

export default useCounter;
