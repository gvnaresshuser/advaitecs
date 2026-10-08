import React from 'react';
import './App.css';
import InputWithEvent from './components/InputWithEvent';
import InputWithRef from './components/InputWithRef';
import InputWithRefOnly from './components/InputWithRefOnly';
import NoRerenderComponent from './components/NoRerenderComponent';
import FocusInput from './components/FocusInput';
import Timer from './Timer';
import PreviousValue from './PreviousValue';
import PreviousValueDemo from './PreviousValueDemo';

function App() {
  return (
    <>
     {/*  <InputWithEvent /> */}
       {/* <InputWithRef /> */}
      {/* <InputWithRefOnly /> */}
      {/* <NoRerenderComponent />  */}

      {/* 1. Storing a DOM element reference */}
      {/* 👉 Here, no need for state — you just need a reference to the input. */}
      {/* <FocusInput/> */}

      {/* 2. Storing setInterval ID */}
      {/* 👉 intervalRef is used to store the ID — no need to re-render UI when ID changes. */}
      {/* <Timer/> */}

      {/* 3. Storing a previous value */}
      {/* 👉 State updates trigger re-render, but useRef keeps the old value safe across renders. */}
      {/* <PreviousValue/> */}
      {/* <PreviousValueDemo/> */}

    </>
  );
}

export default App;
/*
📌 Summary:
useRef → best for values you don’t want to trigger a re-render 
(DOM refs, timers, prev values, counters, etc.).

useState → best when UI must re-render to show updated data.
*/