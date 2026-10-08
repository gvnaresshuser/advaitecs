import React, { useState, useCallback } from 'react';
import { ChildButton } from './ChildButton';

export const CounterWithCallback = () => {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState(0);

  const incrementCount = () => setCount(prev => prev + 1);

  //--------------------------------
  //USING useCallback IMPROVES PERFORMANCE BY PREVENTING 
  // UNNECESSARY RE-RENDERS of the ChildButton component when the parent state changes.
  // useCallback stores the same function reference unless `clicks` changes

  const handleClick = useCallback(() => {
    setClicks(prev => prev + 1);
  }, []);
  //}, [clicks]);//DEPENDENCY ON clicks WILL CAUSE RE-RENDER OF ChildButton
  //--------------------------------

  //--------------------------------
  // Using a simple function here to demonstrate the concept
  // without useCallback for simplicity in this example.

/*   const handleClick = () => {
    setClicks(prev => prev + 1);
  }; */
  //--------------------------------

  return (
    <div style={{ padding: '20px', border: '2px solid teal', background: 'yellow' }}>
      <h3>Count: {count}</h3>
      <h3>Button Clicks: {clicks}</h3>
      <button onClick={incrementCount}>Increment Count</button>

      <hr />
      <ChildButton onClick={handleClick} />
    </div>
  );
};
