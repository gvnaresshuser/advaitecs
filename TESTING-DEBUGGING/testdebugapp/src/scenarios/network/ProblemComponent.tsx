import { useState } from "react";

function ProblemComponent() {
  const [message, setMessage] = useState("Click the button to load users.");
  const [loading, setLoading] = useState(false);

  const handleLoadUsers = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Intentional bug: incorrect endpoint.
      const response = await fetch("/api/user");

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Failed to load users:", error);
      setMessage(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <span className="rounded-md bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
        INTENTIONAL BUG
      </span>

      <h3 className="mt-4 text-lg font-semibold">Load Users</h3>

      <p className="mt-2 text-sm text-slate-400">
        Investigate why the users API request fails.
      </p>

      <button
        onClick={handleLoadUsers}
        disabled={loading}
        className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Loading..." : "Fetch Users"}
      </button>

      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-slate-950 p-4 text-sm text-slate-300">
        {message}
      </pre>
    </div>
  );
}

export default ProblemComponent;
