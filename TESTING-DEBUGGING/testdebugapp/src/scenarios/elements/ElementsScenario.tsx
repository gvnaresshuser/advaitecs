import { useState } from "react";
import ProblemComponent from "./ProblemComponent";
import SolutionComponent from "./SolutionComponent";

function ElementsScenario() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 p-5 text-slate-100 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Scenario 04 · Chrome DevTools
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Elements — CSS and Tailwind Debugging
        </h1>

        <p className="mt-3 leading-7 text-slate-400">
          Investigate incorrect text colors, button styling, and spacing using
          the Styles and Computed panels.
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
            <li>Open Chrome DevTools and select Elements.</li>
            <li>Use the element picker to select the heading.</li>
            <li>
              In Styles, locate the <code>text-white</code> class.
            </li>
            <li>
              Select the Register button and inspect its text and background
              colors.
            </li>
            <li>
              Select the information panel and inspect its margin-top value.
            </li>
            <li>Temporarily disable or modify CSS declarations in DevTools.</li>
            <li>Switch to View Solution and compare the corrected classes.</li>
          </ol>
        </section>

        <section className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
          <h2 className="font-semibold text-cyan-300">Key learning</h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Elements lets you inspect the actual DOM and test CSS changes
            immediately. These changes are temporary; update the Tailwind
            classes in your source code to make the fix permanent.
          </p>
        </section>
      </div>
    </div>
  );
}

export default ElementsScenario;
