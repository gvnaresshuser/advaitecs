import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import Form from './Form';
import StudentRegistrationForm from './StudentRegistrationForm';

function App() {
  return (
    <div className="App">
     {/*  <Form /> */}
      <StudentRegistrationForm/>
    </div>
  );
}

export default App;
