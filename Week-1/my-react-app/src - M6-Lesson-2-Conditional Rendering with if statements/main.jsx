import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   {/*  <App /> */}

    {/* src - M6-Lesson-2-Conditional Rendering with if statements */}
    {/* <App userType="admin" isLoggedIn={false} />  */}
        {/* <App isLoggedIn={true} /> */}
        <App userType="admin" />
   
  </StrictMode>,
);
