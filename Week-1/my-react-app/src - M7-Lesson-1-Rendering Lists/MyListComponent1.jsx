import React from 'react';

function MyListComponent1({ items }) {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}
export { MyListComponent1 };

/*
React uses the key to:
Track each item uniquely across renders
Minimize re-rendering by updating only changed elements
Preserve component state properly during reordering or updating

🚫 What happens without a key?
If you omit the key or use a non-unique value (like the array index), React:
Will throw a warning in the console
May re-render the entire list unnecessarily
Can cause bugs with component state (e.g., form inputs losing focus unexpectedly)

✅ Best practices
Use a unique and stable ID:
✅ key={item.id}

Avoid using array indexes as keys unless you’re rendering static data that never 
changes order or length:
⚠️ key={index} (not recommended for dynamic lists)
*/