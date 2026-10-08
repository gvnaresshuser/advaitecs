import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { AdminDashboard, DefaultDashboard } from './DashboardComponent';
import { LoginButton, UserDashboard } from './UserComponents';

function App({ userType, isLoggedIn }) {
  return (
    <div className="App">
      <div>
        {isLoggedIn ? (
          userType === 'admin' ? <AdminDashboard /> : <UserDashboard />
        ) : (
          <DefaultDashboard />
        )}
        {isLoggedIn && <LoginButton />}
      </div>

    </div>
  );
}

export default App;
/*
We use the ternary operator isLoggedIn ? (...) : (...) to conditionally render either the admin or
 user dashboard component when the user is logged in. If isLoggedIn is true, it evaluates the user 
 type (userType === 'admin') and renders the appropriate dashboard component.
If the user is not logged in (isLoggedIn is false), we render the default dashboard component.
Additionally, we conditionally render the LoginButton component using another ternary operator 
!isLoggedIn && <LoginButton />, ensuring it's only rendered when the user is not logged in.
Using the ternary operator for conditional rendering keeps the code concise and easy to understand, 
especially for simple conditions. However, it's important to maintain readability and avoid overly 
complex ternary expressions.


*/