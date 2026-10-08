import React from 'react';

function MyComponent() {
    function handleClick() {
        console.log('Button clicked');
    }

    return (
        <button onClick={handleClick}>Click me</button>
    );
}

export default MyComponent;
/*
Inline Event Handlers: You can directly specify event handlers as attributes in JSX:
*/