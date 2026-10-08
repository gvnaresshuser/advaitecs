import React from 'react';
import { ThemeProvider } from './ThemeContextWithReducer';
import { ProfileCardWithReducer } from './ProfileCardWithReducer';
import './App.css';
import { CounterWithCallback } from './CounterWithCallback';

function App() {
  return (
    <>
      <CounterWithCallback/>
      </>
  );
}

export default App;
