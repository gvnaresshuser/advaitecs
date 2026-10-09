import { useState } from "react";
import ProblemComponent from "./ProblemComponent";
import SolutionComponent from "./SolutionComponent";

function SourcesScenario() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 p-5 text-slate-100 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Scenario 05 · Chrome DevTools
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Sources — Debug with Breakpoints
        </h1>

        <p className="mt-3 leading-7 text-slate-400">
          Investigate an incorrect calculation by pausing execution, inspecting
          local variables, and stepping through the code.
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
            <li>Open Chrome DevTools and select Sources.</li>
            <li>
              Find the original ProblemComponent.tsx source under the Vite
              source tree.
            </li>
            <li>
              Locate the line containing the total calculation and click its
              line number.
            </li>
            <li>Return to the page and click Calculate Total.</li>
            <li>
              When execution pauses, inspect price, quantity, and discount in
              Scope.
            </li>
            <li>
              Use Step over (F10) to execute the next line without entering a
              function.
            </li>
            <li>Use Resume (F8) to continue execution.</li>
            <li>Compare the problem calculation with the solution.</li>
          </ol>
        </section>

        <section className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
          <h2 className="font-semibold text-cyan-300">Key learning</h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Breakpoints let developers inspect program execution at a particular
            line. Local variables and the Call Stack help reveal why a value is
            incorrect, even when no runtime exception occurs.
          </p>
        </section>
      </div>
    </div>
  );
}

export default SourcesScenario;
