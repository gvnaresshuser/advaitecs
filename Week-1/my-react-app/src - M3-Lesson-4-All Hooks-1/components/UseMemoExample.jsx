import React, { useState, useMemo } from 'react';

export const UseMemoExample = () => {
    const [count, setCount] = useState(0);
    const doubled = useMemo(() => {
        console.log('Calculating...');
        return count * 2;
    }, [count]);

    return (
        <>
            <h3>Double: {doubled}</h3>
            <button onClick={() => setCount(c => c + 1)}>Increase</button>
        </>
    );
};
