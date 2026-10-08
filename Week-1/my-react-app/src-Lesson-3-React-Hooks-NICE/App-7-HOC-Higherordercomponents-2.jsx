import React, { useEffect, useState } from "react";
import "./Hoc.css";

// -----------------------------------------
// HOC: withLoading
// -----------------------------------------
function withLoading(Component) {
  return ({ loading, ...props }) => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600"></div>
          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading users...
          </p>
        </div>
      );
    }
    return <Component {...props} />;
  };
}

// -----------------------------------------
// UserList component
// -----------------------------------------
function UserList({ users }) {
  return (
    <div className="user-list">
      <h2>Users</h2>

      {users.map((user) => (
        <div className="user-card" key={user.id}>
          <h3>{user.name}</h3>

          <div className="user-info">
            <p>📧 {user.email}</p>
            <p>🏢 {user.company.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// -----------------------------------------
// Send UserList to HOC
// -----------------------------------------
const UserListWithLoading = withLoading(UserList);

// -----------------------------------------
// App component
// -----------------------------------------
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);

        // Keep spinner visible for 3 seconds
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>User Management</h1>
      <div className="app">
        <UserListWithLoading loading={loading} users={users} />
      </div>
    </>
  );
}

export default App;
/*
The complete flow
App
 │
 │ fetch()
 ↓
JSONPlaceholder
 │
 │ users data
 ↓
setUsers(data)
 │
 ↓
setLoading(false)
 │
 ↓
UserListWithLoading
 │
 ├── loading === true
 │       ↓
 │    🔄 Spinner
 │
 └── loading === false
         ↓
      UserList
         ↓
      Display users
*/
