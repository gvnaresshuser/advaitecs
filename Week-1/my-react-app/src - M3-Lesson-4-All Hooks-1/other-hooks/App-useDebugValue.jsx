//----------------------- useOnlineStatus.js [useDebugValue - HOOK] -----------------------------

import useOnlineStatus from "./other-hooks/useOnlineStatus";
import './App.css';
const App = () => {
  const isOnline = useOnlineStatus();

  return (
    <div>
      <h1
        style={{
          color: isOnline ? "green" : "red",
        }}
      >
        {isOnline ? "🟢 You are Online" : "🔴 You are Offline"}
      </h1>
    </div>
  );
};

export default App;

//----------------------- useCounter.js [useDebugValue - HOOK] -----------------------------
/* import useCounter from "./other-hooks/useCounter";
import './App.css';
const App = () => {
  const [count, setCount] = useCounter();

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default App; */
