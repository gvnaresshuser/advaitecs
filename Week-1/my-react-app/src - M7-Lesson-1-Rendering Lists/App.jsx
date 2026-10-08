import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { MyListComponent } from './MyListComponent';
import { MyListComponent1 } from './MyListComponent1';
import { MyListComponent2 } from './MyListComponent2';
function App() {
  const items = ['Apple', 'Banana', 'Orange'];

  const items1 = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' },
    { id: 4, name: 'Grapes' }
  ];


  return (
    <div className="App">
      <>Using Array.map():</>
      <MyListComponent items={items} />

      <>Using Array.map() with Unique Keys:</>
      <MyListComponent1 items={items1} />

      <>Using Array.map() with Components:</>
      <MyListComponent2 items={items1} />

    </div>
  );
}

export default App;
