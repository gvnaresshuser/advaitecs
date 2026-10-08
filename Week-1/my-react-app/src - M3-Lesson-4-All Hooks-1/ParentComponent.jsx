import React, { useState } from 'react';
import { ChildDisplay } from './ChildDisplay';

export const ParentComponent = () => {
    const [count, setCount] = useState(0);

    console.log('👨‍👩‍👧‍👦 ParentComponent rendered');

    return (
        <div style={{ padding: '20px', border: '2px solid orange' }}>
            <h2>Count: {count}</h2>
            <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>

            {/* Child receives a fixed prop */}
            <ChildDisplay name="Naresh2" />
        </div>
    );
};
