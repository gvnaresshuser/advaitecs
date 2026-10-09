import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersResponse {
  success: boolean;
  users: User[];
}

function ResponseSolutionComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const handleLoadUsers = async () => {
    setError("");

    try {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data: UsersResponse = await response.json();

      console.log("API response:", data);
      console.log("Users array:", data.users);

      // Correctly extract the array from the response object.
      setUsers(data.users);
    } catch (err) {
      console.error("Failed to load users:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
      <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
        FIXED VERSION
      </span>

      <h3 className="mt-4 text-lg font-semibold">Users List</h3>

      <button
        onClick={handleLoadUsers}
        className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-white"
      >
        Load Users
      </button>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-5 space-y-3">
        {users.map((user) => (
          <div key={user.id} className="rounded-lg bg-slate-900 p-3">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-slate-400">{user.email}</p>
          </div>
        ))}
      </div>

      {users.length === 0 && !error && (
        <p className="mt-4 text-sm text-slate-400">No users loaded yet.</p>
      )}
    </div>
  );
}

export default ResponseSolutionComponent;
