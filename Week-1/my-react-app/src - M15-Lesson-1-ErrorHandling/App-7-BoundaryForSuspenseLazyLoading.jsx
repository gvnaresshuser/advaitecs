//App.jsx (use Suspense + ErrorBoundary + Lazy)
//npm install react-error-boundary

//TO SIMULATE ERROR: UNCOMMENT the line in LazyComponent.jsx
/* LazyComponent() {
// 🔥 Uncomment to simulate error
//throw new Error("💥 Simulated error inside LazyComponent"); */

import './App.css';
import React, { Suspense, lazy } from 'react';
import FunctionalErrorBoundary from './FunctionalErrorBoundary';

const LazyComponent = lazy(() => import('./LazyComponent')); // ✅ Always use a valid path

function App() {
  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <h1>⚛️ Lazy + Suspense + Error Boundary</h1>

      <FunctionalErrorBoundary>
        <Suspense fallback={<div>Loading Lazy Component...</div>}>
          <LazyComponent />
        </Suspense>
      </FunctionalErrorBoundary>
    </div>
  );
}

export default App;
