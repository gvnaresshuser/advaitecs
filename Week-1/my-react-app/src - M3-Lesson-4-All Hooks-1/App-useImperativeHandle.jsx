// App.js
import React, { useRef } from 'react';
import './App.css';
import FancyInput from './components/FancyInput';
import CustomInput from './components/CustomInput';
import Modal from './components/Modal';
const App = () => {
  const inputRef = useRef();
  const modalRef = useRef();
  return (
    <div>
      {/* 111111111111111111111111 */}
      {/*  

     <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.clear()}>Clear</button> */}

      {/* 22222222222222222222222222222 */}
      {/* <div style={{ padding: '20px' }}>
        <CustomInput ref={inputRef} />
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => inputRef.current.focus()}>Focus</button>
          <button onClick={() => inputRef.current.clear()}>Clear</button>
          <button onClick={() => inputRef.current.blur()}>Blur</button>
          <button onClick={() => inputRef.current.setValue('Hello!')}>Set Value</button>
          <button onClick={() => alert(inputRef.current.getValue())}>Get Value</button>
          <button onClick={() => inputRef.current.highlight()}>Highlight</button>
          <button onClick={() => inputRef.current.toggleVisibility()}>Toggle</button>
          <button onClick={() => inputRef.current.shake()}>Shake</button>
          <button onClick={() => inputRef.current.log()}>Log</button>
        </div>
      </div> 
      */}
      {/* 333333333333333333333333333 */}
      <div>
        {/*        <h1>useImperativeHandle Modal Example</h1>
        <button onClick={() => modalRef.current.open()}>Open Modal</button>
        <button onClick={() => modalRef.current.toggle()}>Toggle Modal</button>
        <button onClick={() => modalRef.current.close()}>Close Modal</button>

        <Modal ref={modalRef} title="Welcome!">
          Hello from inside the modal 👋
        </Modal> */}
        <div>
          <button onClick={() => modalRef.current.open()}>Open Modal</button>
          <Modal ref={modalRef} title="Hello Modal">
            Hello from inside the modal 👋
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default App;
