// LazyComponent.jsx
import React from 'react';

function LazyComponent() {
    // 🔥 Uncomment to simulate error
    //throw new Error("💥 Simulated error inside LazyComponent");

    return (
        <div style={{ padding: 20, backgroundColor: '#e0f7fa' }}>
            <h2>This is a lazy-loaded component!</h2>
        </div>
    );
}

export default LazyComponent;
