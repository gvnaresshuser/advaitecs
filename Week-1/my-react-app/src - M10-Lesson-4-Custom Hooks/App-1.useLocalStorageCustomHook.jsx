import './App.css';

import Counter from './Counter';

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
/*
A simple example demonstrating a custom hook called useLocalStorage for storing 
and retrieving data from local storage:

In this example:

We define a custom hook called useLocalStorage which takes a key (to identify the data 
  in local storage) and an initialValue.
Inside the custom hook, we use useState to manage the state and local storage to 
persist the data.
The useLocalStorage hook returns an array with the current value and a function to 
update the value.
We use the useLocalStorage hook inside the Counter component to manage the count state. 
The count value is stored and retrieved from local storage with the key 'count'.
When the increment button is clicked, the count is updated and stored in local storage.
This example demonstrates how to create and use a custom hook to encapsulate logic for 
interacting with browser APIs like local storage.





*/