import { useState } from "react";
import StateProblemComponent from "./StateProblemComponent";
import StateSolutionComponent from "./StateSolutionComponent";

function StateScenario() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 p-5 text-slate-100 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Scenario 07 · React Developer Tools
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Debug Incorrect State Updates
        </h1>

        <p className="mt-3 leading-7 text-slate-400">
          Investigate why a counter does not display its updated value even
          though the click handler executes.
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
            <StateSolutionComponent />
          ) : (
            <StateProblemComponent />
          )}
        </div>

        <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-xl font-semibold">
            Student Debugging Instructions
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-300">
            <li>Open Chrome DevTools and select Components.</li>
            <li>Find and select StateProblemComponent.</li>
            <li>Click Increment and observe the render count.</li>
            <li>Inspect its Hooks section in React Developer Tools.</li>
            <li>Compare the local variable with the actual React state.</li>
            <li>Switch to View Solution and inspect its count state.</li>
            <li>Click Increment several times and observe the result.</li>
          </ol>
        </section>

        <section className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
          <h2 className="font-semibold text-cyan-300">Key learning</h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            React state persists between renders. Ordinary local variables do
            not. Use a state setter to update state and trigger a re-render when
            the displayed UI depends on the value.
          </p>
        </section>
      </div>
    </div>
  );
}

export default StateScenario;
