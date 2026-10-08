import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { MyComponent } from './MyComponent';
import { MyComponent2 } from './MyComponent2';
import { MyComponent3 } from './MyComponent3';
import { MyComponent4 } from './MyComponent4';
import { MyComponent5 } from './MyComponent5';

function App() {

  return (
    <div className="App">
      {/* <MyComponent isLoggedIn={true} /> */}
      {/* <MyComponent isLoggedIn={false} /> */}

      {/* <MyComponent2 isLoggedIn={true} /> */}
    {/* <MyComponent2 isLoggedIn={false} /> */}

      {/* <MyComponent3 isLoggedIn={true} /> */}
      {/* <MyComponent3 isLoggedIn={false} /> */}

        {/* CLASS COMPONENT - NO NEED */}
      {/* <MyComponent4 isLoggedIn={true} />
      <MyComponent4 isLoggedIn={false} /> */}

     {/*  <MyComponent5 userType={'admin'} /> */}
    {/* <MyComponent5 userType={'user'} /> */}
   {/*  <MyComponent5 userType={''} /> */}
    
    </div>
  );
}

export default App;
