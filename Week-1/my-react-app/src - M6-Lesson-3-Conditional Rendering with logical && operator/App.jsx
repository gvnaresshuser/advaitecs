import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { UserDashboard, LoginButton } from './UserComponents';
import { AdminDashboard, DefaultDashboard } from './DashboardComponent';
function App({ userType, isLoggedIn }) {
  return (
    <div className="App">
      <div>
        {isLoggedIn && (userType === 'admin' ? <AdminDashboard /> : <UserDashboard />)}
        {!isLoggedIn && <DefaultDashboard />}
        {!isLoggedIn && <LoginButton />}
      </div>

    </div>
  );
}

export default App;
/*
We use the logical AND (&&) operator to conditionally render the admin or user dashboard 
component when the user is logged in. If isLoggedIn is true, it evaluates the user type 
(userType === 'admin') and renders the appropriate dashboard component.
If the user is not logged in (isLoggedIn is false), we render the default dashboard component 
and the LoginButton component using the logical AND operator.

*/
