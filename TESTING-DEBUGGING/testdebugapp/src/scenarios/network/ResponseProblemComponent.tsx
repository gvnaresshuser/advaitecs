import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

function ResponseProblemComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");

  const handleLoadUsers = async () => {
    setMessage("");

    try {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("API response:", data);

      // Intentional bug:
      // The API returns { success: true, users: [...] }.
      // This code incorrectly expects the response itself to be an array.
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
      setMessage(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <span className="rounded-md bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
        INTENTIONAL BUG
      </span>

      <h3 className="mt-4 text-lg font-semibold">Users List</h3>

      <button
        onClick={handleLoadUsers}
        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white"
      >
        Load Users
      </button>

      {message && <p className="mt-4 text-sm text-red-400">{message}</p>}

      <div className="mt-5 space-y-3">
        {users.map((user) => (
          <div key={user.id} className="rounded-lg bg-slate-900 p-3">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-slate-400">{user.email}</p>
          </div>
        ))}
      </div>

      {users.length === 0 && !message && (
        <p className="mt-4 text-sm text-slate-400">No users displayed.</p>
      )}
    </div>
  );
}

export default ResponseProblemComponent;
