import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
//STEP 2 - PROVIDE THE CONTEXT
//ALL THE COMPONENTS INSIDE APP COMPONENT CAN USE CONTEXT DATA
import ContextProvider from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
)

/* createRoot(document.getElementById('root')).render(
 <App/>,
) */

/*
 <StrictMode>
    <App />
  </StrictMode>
*/

