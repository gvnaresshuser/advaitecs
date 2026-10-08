import React, { useState } from 'react';
import InputComponent from './components/InputComponent';
import DisplayComponent from './components/DisplayComponent';
import './styles.css';
import Calculator from './Calculator';

function App() {
  const [name, setName] = useState('');

  //First example: Components Communication & Lifting State Up
  return (
    <div className="container">
      <h1 className="heading">Components Communication & Lifting State Up</h1>
      <InputComponent onNameChange={setName} />
      <DisplayComponent name={name} />
    </div>
  );

  //Second example: Water Boiling Calculator
 /*   return (
     <div className="container">
       <Calculator />
     </div>
   ); */


}

export default App;
