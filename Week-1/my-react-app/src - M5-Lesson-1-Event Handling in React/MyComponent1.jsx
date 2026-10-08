import React from 'react';

function MyComponent1() {
    return (
        <button onClick={() => console.log('Button clicked')}>Click me</button>
    );
}

export default MyComponent1;
/*
Using Arrow Functions: You can use arrow functions to define event handlers directly in JSX. 
This allows you to pass arguments to the event handler:

*/