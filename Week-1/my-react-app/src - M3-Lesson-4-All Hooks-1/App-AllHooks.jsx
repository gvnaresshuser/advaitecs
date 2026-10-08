import React from 'react';
import { ThemeProvider, UseTheme } from './ThemeContext';
import { Counter } from './components/Counter';
import { UseCallbackExample } from './components/UseCallbackExample';
import { UseMemoExample } from './components/UseMemoExample';
import { UseRefExample } from './components/UseRefExample';
import { ImperativeHandleExample } from './components/ImperativeHandleExample';
import { LayoutEffectExample } from './components/LayoutEffectExample';
import { DebugValueExample } from './components/DebugValueExample';
import './App.css';
function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: 20 }}>
        <h1>React Hook Examples</h1>
        <UseTheme />
        <hr />
        <Counter />
        <hr />
        <UseCallbackExample />
        <hr />
        <UseMemoExample />
        <hr />
        <UseRefExample />
        <hr />
        <ImperativeHandleExample />
        <hr />
        <LayoutEffectExample />
        <hr />
        <DebugValueExample />
      </div>
    </ThemeProvider>
  );
}

export default App;
