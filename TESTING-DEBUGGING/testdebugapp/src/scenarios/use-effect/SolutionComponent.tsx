import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

function SolutionComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        console.count("SolutionComponent useEffect executed");

        const response = await fetch("/api/users", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: { users: User[] } = await response.json();

        setUsers(data.users);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(err instanceof Error ? err.message : "Request failed");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchUsers();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
      <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
        FIXED VERSION
      </span>

      <h3 className="mt-4 text-lg font-semibold">Fetch Users Once on Mount</h3>

      {loading && (
        <p className="mt-4 text-sm text-cyan-300">Loading users...</p>
      )}

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="mt-4 text-sm text-slate-400">No users found.</p>
      )}

      <div className="mt-4 space-y-2">
        {users.map((user) => (
          <div key={user.id} className="rounded-lg bg-slate-900 p-3">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-slate-400">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolutionComponent;
