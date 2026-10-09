import { useState } from "react";
import ProblemComponent from "./ProblemComponent";
import SolutionComponent from "./SolutionComponent";

function ReactDevToolsScenario() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 p-5 text-slate-100 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Scenario 06 · React Developer Tools
        </p>

        <h1 className="mt-3 text-3xl font-bold">Debug Incorrect React Props</h1>

        <p className="mt-3 leading-7 text-slate-400">
          Investigate why a component displays the wrong username even though
          the application renders without an error.
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
            <li>Open Chrome DevTools and select Components.</li>
            <li>Expand the component tree and locate UserCard.</li>
            <li>Select UserCard and inspect its props.</li>
            <li>Check the value of the name prop.</li>
            <li>Trace the value back to the parent component.</li>
            <li>Identify why the email was passed as the name.</li>
            <li>Switch to View Solution and inspect the props again.</li>
          </ol>
        </section>

        <section className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
          <h2 className="font-semibold text-cyan-300">Key learning</h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            React Developer Tools shows the component tree, props, and hooks.
            Use it to trace data flow from a parent component to its children,
            even when no JavaScript error occurs.
          </p>
        </section>
      </div>
    </div>
  );
}

export default ReactDevToolsScenario;
