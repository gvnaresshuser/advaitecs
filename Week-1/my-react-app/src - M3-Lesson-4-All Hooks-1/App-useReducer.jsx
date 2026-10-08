import React from 'react';
import { ThemeProvider } from './ThemeContextWithReducer';
import { ProfileCardWithReducer } from './ProfileCardWithReducer';
import './App.css';
import { CounterProvider } from './CounterReducerContext';
import { CounterComponent } from './CounterComponent';
function App() {
  return (
    <>
    <ThemeProvider>
      <h1 style={{ textAlign: 'center' }}>useReducer Theme Switcher</h1>
      <ProfileCardWithReducer />
    </ThemeProvider>

      <CounterProvider>
        <h1 style={{ textAlign: 'center' }}>Context + useReducer Example</h1>
        <CounterComponent />
      </CounterProvider>
      </>
  );
}

export default App;
