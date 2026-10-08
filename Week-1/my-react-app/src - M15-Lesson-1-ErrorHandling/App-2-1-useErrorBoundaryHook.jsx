import { useState } from "react";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import "./App.css";
/*
npm install react-error-boundary
npm install axios
*/

// -----------------------------
// 1️⃣ Custom Fallback Component
// -----------------------------
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ border: "2px solid red", padding: "10px" }}>
      <h2>Something went wrong 😢</h2>
      <pre style={{ color: "darkred" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

// -----------------------------
// 2️⃣ Component that uses useErrorBoundary
// -----------------------------
function ComponentWithErrorTrigger() {
  const { showBoundary } = useErrorBoundary(); // 👈 hook from react-error-boundary
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    if (count >= 2) {
      // 👇 Programmatically trigger an error after 3 clicks
      showBoundary(new Error("💥 Oops! You clicked too many times!"));
    }
  };

  return (
    <div>
      <h3>Click count: {count}</h3>
      <button onClick={handleClick}>Increase Count</button>
      <p>After 3 clicks, an error will be triggered automatically.</p>
    </div>
  );
}

// -----------------------------
// 3️⃣ App wrapped with ErrorBoundary
// -----------------------------
function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()} // optional reset action
    >
      <ComponentWithErrorTrigger />
    </ErrorBoundary>
  );
}

export default App;
