
import React, { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';

//WITHOUT USING CUSTOM HOOK

function App() {
  const [name, setName] = useState(
    localStorage.getItem('username') ?
      localStorage.getItem('username') : ''
  );
  useEffect(() => {
    localStorage.setItem('username',name) 
  }, [name]);
  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            Custom Hook
          </h1>

        </div>
        <input 
        value={name}
        onChange={(e)=>setName(e.target.value)}
        type="text" placeholder='Enter your name'/>
        <h2>Hello, {name}!</h2>

      </section>
    </>
  );
}

export default App;
