import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MyComponent from './MyComponent';
import MyComponent1 from './MyComponent1';
import MyComponent2 from './MyComponent2';
import MyComponent3 from './MyComponent3';
import MouseEvents from './MouseEvents';
import KeyboardEvents from './KeyboardEvents';
import FormEvents from './FormEvents';
import ClipboardEvents from './ClipboardEvents';
import PointerTouchEvents from './PointerTouchEvents';
import DragDropEvents from './DragDropEvents';
import SyntheticEventExample from './SyntheticEventExample';

function App() {

  return (
    <>
      <div className="App">
        <MyComponent />
        <MyComponent1 />

        {/* CLASS COMPONENT NO NEED */}
         <MyComponent2 />

        <MyComponent3 />
        <MouseEvents />
        <KeyboardEvents />
        <FormEvents />
        <ClipboardEvents />
        <PointerTouchEvents />
        <DragDropEvents />
        <SyntheticEventExample />
      </div>
    </>
  );
}

export default App
/*
Handling events in React.js is similar to handling events in regular JavaScript but with 
some syntactical differences due to JSX. Here's how you can handle events in React.js:
*/