import { useState } from "react";
import ResponseProblemComponent from "./ResponseProblemComponent";
import ResponseSolutionComponent from "./ResponseSolutionComponent";

function ResponseScenario() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 p-5 text-slate-100 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Scenario 03 · Chrome DevTools
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Network — API Data Not Displaying
        </h1>

        <p className="mt-3 leading-7 text-slate-400">
          The request succeeds, but no users appear in the UI. Investigate the
          response structure and the React state update.
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
          {showSolution ? (
            <ResponseSolutionComponent />
          ) : (
            <ResponseProblemComponent />
          )}
        </div>

        <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-xl font-semibold">
            Student Debugging Instructions
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-300">
            <li>Open Chrome DevTools and select Network.</li>
            <li>Select Fetch/XHR and click Load Users.</li>
            <li>Confirm that the request returns HTTP 200.</li>
            <li>Open the Response tab and inspect the returned JSON.</li>
            <li>Open Console and inspect the API response log.</li>
            <li>
              Find the difference between the response object and its users
              array.
            </li>
            <li>Switch to View Solution and load the users again.</li>
          </ol>
        </section>

        <section className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
          <h2 className="font-semibold text-cyan-300">Key learning</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            HTTP 200 confirms a successful HTTP response, not that the frontend
            is consuming the response correctly. Inspect the JSON structure
            before updating React state.
          </p>
        </section>
      </div>
    </div>
  );
}

export default ResponseScenario;
