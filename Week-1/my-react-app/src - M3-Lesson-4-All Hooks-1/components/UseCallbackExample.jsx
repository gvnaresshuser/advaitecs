import React, { useState, useCallback } from 'react';

export const UseCallbackExample = () => {
    const [count, setCount] = useState(0);
    const increment = useCallback(() => setCount(c => c + 1), []);

    const Child = React.memo(({ onClick }) => {
        console.log('Child rendered');
        return <button onClick={onClick}>Increment from Child</button>;
    });

    return (
        <>
            <h3>Count: {count}</h3>
            <Child onClick={increment} />
        </>
    );
};
