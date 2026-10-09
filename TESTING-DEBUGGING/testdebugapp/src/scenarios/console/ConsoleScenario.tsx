import { useState } from "react";
import ProblemComponent from "./ProblemComponent";
import SolutionComponent from "./SolutionComponent";

function ConsoleScenario() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 p-5 text-slate-100 sm:p-8">
      <div className="mx-auto max-w-5xl">
       {/*  <button
          onClick={() => window.history.back()}
          className="mb-6 text-sm text-cyan-400 hover:text-cyan-300"
        >
          ← Back
        </button> */}

        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Scenario 01 · Chrome DevTools
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Console — Undefined Data Error
        </h1>

        <p className="mt-3 max-w-3xl leading-7 text-slate-400">
          Investigate a runtime error caused by accessing a property of an
          undefined value. Use the browser Console to find the problem and
          understand the root cause.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => setShowSolution(false)}
            className={`rounded-lg px-4 py-2 font-medium ${
              !showSolution
                ? "bg-red-600 text-white"
                : "border border-slate-700 text-slate-300"
            }`}
          >
            Problem Code
          </button>

          <button
            onClick={() => setShowSolution(true)}
            className={`rounded-lg px-4 py-2 font-medium ${
              showSolution
                ? "bg-emerald-600 text-white"
                : "border border-slate-700 text-slate-300"
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
            <li>Open Chrome DevTools using F12.</li>
            <li>Select the Console tab.</li>
            <li>Click Show User Details.</li>
            <li>Observe the error message and identify the failing line.</li>
            <li>Expand the logged User data value and inspect it.</li>
            <li>Switch to View Solution and click the button again.</li>
            <li>Compare the Console output of both implementations.</li>
          </ol>
        </section>

        <section className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
          <h2 className="font-semibold text-amber-300">
            Expected learning outcome
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Students should understand that console errors are symptoms of
            underlying problems. Before accessing an object's properties, verify
            that the object contains a valid value.
          </p>
        </section>
      </div>
    </div>
  );
}

export default ConsoleScenario;
