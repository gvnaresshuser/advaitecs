import React from 'react';
import useHttp from '../hooks/useHttp';

function UsersList() {
    const { sendRequest, data, loading, error } = useHttp();

    const fetchUsers = () => {
        //sendRequest({ url: 'https://jsonplaceholder.typicode.com/users' });
        //sendRequest({ url: "https://jsonplaceholder.typicode.com/post" });
    };

    return (
      <div style={{ padding: "20px" }}>
        <h2>Users List</h2>
        <button onClick={fetchUsers} disabled={loading}>
          {loading ? "Loading..." : "Fetch Users"}
        </button>

        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {data && (
          <ul>
            {data.map((user) => (
              <li key={user.id}>
                {user.id}-{user.name}-{user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}

export default UsersList;
