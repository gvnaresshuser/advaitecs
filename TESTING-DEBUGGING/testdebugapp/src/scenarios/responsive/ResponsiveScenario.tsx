import { useState } from "react";
import ProblemComponent from "./ProblemComponent";
import SolutionComponent from "./SolutionComponent";

function ResponsiveScenario() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-slate-100 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Scenario 09 · Responsive Design
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Debug Mobile Layout Overflow
        </h1>

        <p className="mt-3 leading-7 text-slate-400">
          Investigate a dashboard that overflows on mobile devices. Use Chrome's
          Device Toolbar and Elements panel to find the fixed-width elements.
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
            <li>Open Chrome DevTools.</li>
            <li>Enable Device Toolbar using Ctrl + Shift + M.</li>
            <li>Select a mobile preset or set the viewport to 375 pixels.</li>
            <li>Choose Problem Code and inspect the overflowing container.</li>
            <li>Use Elements to find the w-[900px] and w-[850px] classes.</li>
            <li>Temporarily disable the fixed-width styles in DevTools.</li>
            <li>Switch to View Solution and repeat the viewport test.</li>
            <li>
              Confirm that the page fits the viewport and only the table scrolls
              horizontally.
            </li>
          </ol>
        </section>

        <section className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
          <h2 className="font-semibold text-cyan-300">Key learning</h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Fixed widths can cause horizontal overflow on mobile devices. Use
            responsive sizing, min-w-0 where appropriate, and overflow-x-auto
            around wide tables or other content that genuinely needs horizontal
            scrolling.
          </p>
        </section>
      </div>
    </div>
  );
}

export default ResponsiveScenario;
