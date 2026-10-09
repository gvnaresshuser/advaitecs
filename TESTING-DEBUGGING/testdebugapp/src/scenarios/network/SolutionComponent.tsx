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

function SolutionComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoadUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data: UsersResponse = await response.json();
      setUsers(data.users);
    } catch (err) {
      console.error("Failed to load users:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
      <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
        FIXED VERSION
      </span>

      <h3 className="mt-4 text-lg font-semibold">Load Users</h3>

      <button
        onClick={handleLoadUsers}
        disabled={loading}
        className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Loading..." : "Fetch Users"}
      </button>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-4 space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-lg border border-slate-700 bg-slate-950 p-3"
          >
            <p className="font-medium">{user.name}</p>
            <p className="mt-1 text-sm text-slate-400">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolutionComponent;
