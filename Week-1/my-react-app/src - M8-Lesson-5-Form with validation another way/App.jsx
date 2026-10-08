import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import Form from './Form';

function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
/*
Another way to write a React form with validation using the mentioned HTML 
elements is by encapsulating each input element in a separate component. 
This can help modularize your code and make it more maintainable.

In this approach:

Each input element is encapsulated in its own component (e.g., TextInput, EmailInput, 
  SelectInput, etc.).
Each component receives props such as label, name, value, onChange, and error.
The form logic, including form state management, validation, and submission, 
is centralized within the Form component.
CSS styling is applied using a separate CSS file (Form.css).




*/