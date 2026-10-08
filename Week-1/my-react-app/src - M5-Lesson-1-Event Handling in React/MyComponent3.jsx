import React from 'react';

function MyComponent3() {
    function handleClick(parameter) {
        console.log('Button clicked with parameter:', parameter);
    }

    return (
        <button onClick={() => handleClick('parameter')}>Click me</button>
    );
}

export default MyComponent3;
/*
Passing Parameters to Event Handlers: If you need to pass parameters to an event handler, 
you can use arrow function syntax:

 <button onClick={() => handleClick('parameter')}>Click me</button>
  <button onClick={handleClick('parameter')}>Click me</button> NEVER USE

  <button onClick={handleClick}>Click me</button>
   <button onClick={() => handleClick()}>Click me</button>
*/
