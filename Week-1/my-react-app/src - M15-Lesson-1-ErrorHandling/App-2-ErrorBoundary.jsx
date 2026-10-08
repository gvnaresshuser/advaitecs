import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function ComponentThatMayThrow({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error("Boom! This is a triggered error.");
  }

  return (
    <div>
      <h2>No error yet. Click button to trigger error.</h2>
    </div>
  );
}

function App() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => setShouldThrow(false)}
      resetKeys={[shouldThrow]} // 👈 REQUIRED to reset boundary
    >
      <ComponentThatMayThrow shouldThrow={shouldThrow} />
      <button onClick={() => setShouldThrow(true)}>Trigger Error</button>
    </ErrorBoundary>
  );
}

export default App;
