import React, { useState, useEffect } from "react";
import useDebounce from "./hooks/useDebounce";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Wait for 1 second after the user stops typing
  const debouncedText = useDebounce(text, 1000);

  useEffect(() => {
    // Don't make API call for empty search
    if (!debouncedText.trim()) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?name=${debouncedText}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedText]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Search Users with Debounce</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search users..."
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <p>
        <strong>Immediate Value:</strong> {text}
      </p>

      <p>
        <strong>Debounced Value:</strong> {debouncedText}
      </p>

      {loading && <p>Searching...</p>}

      <h3>Search Results</h3>

      {users.length === 0 && debouncedText && !loading && (
        <p>No users found.</p>
      )}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
