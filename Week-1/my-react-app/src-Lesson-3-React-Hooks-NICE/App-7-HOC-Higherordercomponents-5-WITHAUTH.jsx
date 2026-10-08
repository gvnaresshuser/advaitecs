import React from "react";

import Dashboard from "./components/Dashboard";
import withAuth from "./hocs/withAuth";

const ProtectedDashboard = withAuth(Dashboard);

function App() {
  const login = () => {
    localStorage.setItem("token", "abc123");

    // Refresh component so we can see the change
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("token");

    window.location.reload();
  };

  return (
    <div>
      <h1>HOC Authentication Demo</h1>

      <button onClick={login}>Login</button>

      <button onClick={logout}>Logout</button>

      <hr />

      <ProtectedDashboard />
    </div>
  );
}

export default App;
/*
App
 │
 ├── Login
 ├── Logout
 │
 └── ProtectedDashboard
          │
          ↓
      withAuth()
          │
     authentication
          │
     ┌────┴────┐
     ↓         ↓
  No Token   Token
     ↓         ↓
 Access      Dashboard
 Denied      displayed
*/