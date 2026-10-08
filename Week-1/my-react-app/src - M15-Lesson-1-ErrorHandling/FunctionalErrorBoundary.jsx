import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
//npm install react-error-boundary

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div style={{ color: 'red', padding: 20 }}>
            <h2>❌ Something went wrong</h2>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try Again</button>
        </div>
    );
}

const FunctionalErrorBoundary = ({ children }) => (
    <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
            // Optionally reload page or reset state
            window.location.reload();
        }}
    >
        {children}
    </ErrorBoundary>
);

export default FunctionalErrorBoundary;
