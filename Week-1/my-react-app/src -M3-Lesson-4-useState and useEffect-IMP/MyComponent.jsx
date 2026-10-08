import React, { useState, useEffect } from 'react';

//Example: Multiple useEffect hooks

function MyComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Effect for count
/*   useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  // Effect for name
  useEffect(() => {
    console.log('Name changed:', name);
  }, [name]); */

  useEffect(() => {
    console.log('Count changed 22222:', count);
    console.log('Name changed 222222:', name);
  }, [count, name]);


  // Effect that runs once (on mount)
  useEffect(() => {
    console.log('Component mounted');
  }, []);

    useEffect(() => {
      console.log("Component ALWAYS");
    });

  return (
    <div className="flex flex-col gap-3">
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      <input value={name} 
      onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
    </div>
  );
}
export default MyComponent;
/*
When to combine vs. separate:
✅ Combine useEffect	
If the logic is related or simple (like logging both values).	
Reduces repetition.

⚠️ Keep useEffects separate
If side effects are independent (e.g., one updates local storage, another fetches data).
Avoids unnecessary re-runs of unrelated logic.

⚠️ Just be mindful of what depends on what—separate them if the logic is not 
related or has different concerns.
*/
