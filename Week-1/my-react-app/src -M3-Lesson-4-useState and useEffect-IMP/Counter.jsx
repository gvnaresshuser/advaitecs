import React, { useState } from 'react';

//USE STATE HOOK EXAMPLE
// This component demonstrates a simple counter using the useState hook

const Counter = () => {
    // Declare state variable `count` and a function to update it
    const [count, setCount] = useState(0);

    // Event handler to increment count
    const incrementCount = () => {
        //setCount(count + 1);//RISKY
        setCount(prevCount => prevCount + 1);
        //setCount((prevCount) => prevCount + 1); // safer way to update state based on previous value
        //setCount((x) => x + 1); // safer way to update state based on previous value
    };

    return (
        <div>
            <h2>Counter: {count}</h2>
            {/* Button to trigger incrementCount */}
            <button onClick={incrementCount}>Increment</button>
        </div>
    );
};

export default Counter;
