import { useState } from "react";
import ProblemComponent from "./ProblemComponent";
import SolutionComponent from "./SolutionComponent";

function UseEffectScenario() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 p-5 text-slate-100 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Scenario 08 · React Hooks
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Debug useEffect and Repeated API Calls
        </h1>

        <p className="mt-3 leading-7 text-slate-400">
          Investigate why an API request executes repeatedly after React renders
          and learn how effect dependencies control when an effect runs.
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
            <li>Select Fetch/XHR and reload the problem scenario.</li>
            <li>Observe repeated GET requests to /api/users.</li>
            <li>Open Console and inspect the effect execution count.</li>
            <li>Open Sources and inspect the useEffect callback.</li>
            <li>Identify the missing dependency array.</li>
            <li>Switch to View Solution and compare the request behavior.</li>
            <li>Observe the cleanup function and its AbortController.</li>
          </ol>
        </section>

        <section className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
          <h2 className="font-semibold text-cyan-300">Key learning</h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            An effect without a dependency array runs after every render. If
            that effect updates state, it can trigger another render and repeat
            the process. Choose dependencies based on the values the effect
            actually uses.
          </p>
        </section>
      </div>
    </div>
  );
}

export default UseEffectScenario;
