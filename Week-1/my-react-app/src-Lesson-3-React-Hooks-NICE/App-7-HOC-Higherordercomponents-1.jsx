import React, { useEffect, useState } from "react";
import "./Hoc1.css";

// ==================================================
// 1. HOC: withLoading
// ==================================================
// This HOC adds loading behavior to any component.
//
// Component = the component we want to enhance
// loading   = loading status
// props     = all remaining props
// ==================================================
function withLoading(Component) {
  return function EnhancedComponent({ loading, ...props }) {
    if (loading) {
      return (
        <div className="flex min-h-[250px] flex-col items-center justify-center gap-4">
          {/* Spinner */}
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

          {/* Loading text */}
          <p className="text-lg font-medium text-gray-600">Loading users...</p>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
// ==================================================
// 2. Normal Component
// ==================================================
// This component only knows how to DISPLAY users.
// It does NOT know anything about loading.
// ==================================================
function UserList({ users }) {
  return (
    <div className="user-list">
      <h2>Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div className="user-card" key={user.id}>
            <h3>👤 {user.name}</h3>
            <p>📧 {user.email}</p>
            <p>🏢 {user.company.name}</p>
          </div>
        ))
      )}
    </div>
  );
}
// ==================================================
// 3. Create Enhanced Component
// ==================================================
// withLoading() takes UserList and returns a NEW
// enhanced component.
//
// UserList
//    ↓
// withLoading(UserList)
//    ↓
// UserListWithLoading
// ==================================================
const UserListWithLoading = withLoading(UserList);
// ==================================================
// 4. App Component
// ==================================================
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // ==================================================
  // Fetch users from API
  // ==================================================
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        ////setLoading(false);
        //------------------------------------
        // Stop loading after 3 seconds
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1500);
        // Cleanup timer
        return () => clearTimeout(timer);
        //------------------------------------
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      }); /* .finally(() => {
        setLoading(false);
      }) */
  }, []);
  // ==================================================
  // UI
  // ==================================================
  return (
    <div className="app">
      <h1>Higher-Order Component (HOC)</h1>

      <p className="description">
        Real-world example: Adding loading behavior to a UserList component.
      </p>
      <section>
        <UserListWithLoading loading={loading} users={users} />
        {/* <UserList users={users} /> */}
      </section>
    </div>
  );
}
export default App;
