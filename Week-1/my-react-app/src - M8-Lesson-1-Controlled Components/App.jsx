import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MyForm from './MyForm';
function App() {
  return (
    <div className="App">
      <MyForm />
    </div>
  );
}

export default App;
/*
1. Controlled Components:
In React, form elements such as <input>, <textarea>, and <select> maintain their 
own state. However, in most cases, it's recommended to use controlled components 
where form data is controlled by React state.

2. Handling Form Submission:
Use the onSubmit event handler on the <form> element to handle form submission.
Prevent the default form submission behavior using e.preventDefault().

3. Controlled Inputs:
Bind each input field value to a corresponding piece of state (formData) and update it 
via the onChange event handler.

4. Form Validation:
Implement form validation logic within the handleChange function to validate user input 
and update state accordingly.

5. Submitting Form Data:
Once the form is submitted, handle the form data as needed, such as sending it to a 
server or performing client-side operations.

6. Libraries and Tools:
Consider using form libraries like Formik or react-hook-form for more advanced form 
handling, validation, and state management.
By following these guidelines, you can effectively create and manage forms in React 
while ensuring a smooth user experience and robust data handling.

*/