import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
  //TEST TO SEE CONSOLE LOGS TWICE
  // This is expected behavior in StrictMode, as it intentionally invokes components twice to help identify
  // side effects and ensure that components are resilient to being mounted and unmounted multiple times.
  // If you see console logs twice, it is likely due to the StrictMode behavior.
  // If you want to see the console logs only once, you can remove <StrictMode> from the render method.
  // However, it is generally recommended to keep StrictMode enabled during development to catch potential issues early.
  // If you want to see the console logs only once,
  // you can comment out the <StrictMode> line and just render the App component directly
  /*  <App /> */
);
