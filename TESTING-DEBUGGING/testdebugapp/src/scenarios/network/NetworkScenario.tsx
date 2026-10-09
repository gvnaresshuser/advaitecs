import { useState } from "react";
import ProblemComponent from "./ProblemComponent";
import SolutionComponent from "./SolutionComponent";

function NetworkScenario() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 p-5 text-slate-100 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Scenario 02 · Chrome DevTools
        </p>

        <h1 className="mt-3 text-3xl font-bold">Network — API Returns 404</h1>

        <p className="mt-3 leading-7 text-slate-400">
          Find the failed request in Network, inspect its URL and status code,
          and identify the incorrect endpoint.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setShowSolution(false)}
            className={`rounded-lg px-4 py-2 ${
              !showSolution ? "bg-red-600" : "border border-slate-700"
            }`}
          >
            Problem Code
          </button>

          <button
            onClick={() => setShowSolution(true)}
            className={`rounded-lg px-4 py-2 ${
              showSolution ? "bg-emerald-600" : "border border-slate-700"
            }`}
          >
            View Solution
          </button>
        </div>

        <div className="mt-6">
          {showSolution ? <SolutionComponent /> : <ProblemComponent />}
        </div>

        <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-xl font-semibold">
            Student Debugging Instructions
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-300">
            <li>Open Chrome DevTools and select Network.</li>
            <li>Select Fetch/XHR and click Fetch Users.</li>
            <li>
              Find the request to <code>/api/user</code>.
            </li>
            <li>Inspect Headers and identify the HTTP status code: 404.</li>
            <li>Compare the requested URL with the backend endpoint.</li>
            <li>Switch to View Solution and repeat the request.</li>
            <li>
              Confirm that <code>/api/users</code> returns HTTP 200.
            </li>
          </ol>
        </section>

        <section className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
          <h2 className="font-semibold text-cyan-300">Key learning</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            A 404 response means the requested resource was not found. Check the
            URL, HTTP method, route configuration, and backend logs before
            changing frontend code randomly.
          </p>
        </section>
      </div>
    </div>
  );
}

export default NetworkScenario;
