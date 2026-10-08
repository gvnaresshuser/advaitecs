import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <App userType="admin" isLoggedIn={false} /> 
    {/* <App userType="admin" isLoggedIn={true} /> 
        <App isLoggedIn={true} />
        <App userType="admin" />
    */}
  </StrictMode>,
)
