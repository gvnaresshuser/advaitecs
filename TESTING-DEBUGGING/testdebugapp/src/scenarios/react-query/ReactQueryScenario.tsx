import { useState } from "react";
import ProblemComponent from "./ProblemComponent";
import SolutionComponent from "./SolutionComponent";

function ReactQueryScenario() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-800">
          Scenario 11: React Query Cache Debugging
        </h1>

        <p className="mb-6 text-slate-600">
          Investigate why updated backend data does not immediately appear in
          the React UI.
        </p>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setShowSolution(false)}
            className={`rounded-lg px-5 py-2 font-semibold ${
              !showSolution
                ? "bg-red-600 text-white"
                : "border border-slate-300 bg-white text-slate-700"
            }`}
          >
            Problem
          </button>

          <button
            onClick={() => setShowSolution(true)}
            className={`rounded-lg px-5 py-2 font-semibold ${
              showSolution
                ? "bg-green-600 text-white"
                : "border border-slate-300 bg-white text-slate-700"
            }`}
          >
            Solution
          </button>
        </div>

        <div className="mb-6">
          {showSolution ? <SolutionComponent /> : <ProblemComponent />}
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="mb-3 text-lg font-bold text-blue-900">
            Student Debugging Tasks
          </h2>

          <ol className="list-decimal space-y-2 pl-5 text-sm text-blue-900">
            <li>Open Chrome DevTools and select the Network tab.</li>
            <li>Click Update Name and inspect the PUT request.</li>
            <li>Verify that the backend returns the updated user.</li>
            <li>
              Check whether another GET request to <code>/api/users</code>{" "}
              occurs.
            </li>
            <li>
              Inspect the React Query Devtools, if installed, or use the browser
              Network panel to investigate the cached data.
            </li>
            <li>
              Explain the purpose of <code>useQuery</code>,{" "}
              <code>useMutation</code>, and <code>invalidateQueries</code>.
            </li>
            <li>Switch to Solution and repeat the same test.</li>
          </ol>

          <p className="mt-4 text-sm text-blue-800">
            Learning outcome: understand query keys, cached server state,
            mutations, cache invalidation, and refetching.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReactQueryScenario;
