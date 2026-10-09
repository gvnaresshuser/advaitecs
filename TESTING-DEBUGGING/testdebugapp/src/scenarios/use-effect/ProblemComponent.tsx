import { useEffect, useRef, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

function ProblemComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [requestCount, setRequestCount] = useState(0);
  const [error, setError] = useState("");

  const attempts = useRef(0);
  const maxRequests = 5;

  useEffect(() => {
    // INTENTIONAL BUG: no dependency array.
    if (attempts.current >= maxRequests) {
      return;
    }

    attempts.current += 1;
    setRequestCount(attempts.current);

    console.count("ProblemComponent useEffect executed");
    console.log("API request number:", attempts.current);

    fetch("/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        return response.json();
      })
      .then((data: { users: User[] }) => {
        setUsers(data.users);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Request failed");
      });
  });

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <span className="rounded-md bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
        INTENTIONAL BUG
      </span>

      <h3 className="mt-4 text-lg font-semibold">Repeated API Requests</h3>

      <p className="mt-2 text-sm text-slate-400">
        The effect runs after every render. Requests are capped at five for this
        demonstration.
      </p>

      <div className="mt-4 rounded-lg bg-slate-900 p-4">
        <p className="text-sm text-slate-400">Requests initiated</p>
        <p className="mt-1 text-3xl font-bold text-red-400">
          {requestCount} / {maxRequests}
        </p>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

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

export default ProblemComponent;
/*
This component deliberately omits the dependency array. To keep the classroom 
demonstration safe, it caps the repeated requests at five.
*/
