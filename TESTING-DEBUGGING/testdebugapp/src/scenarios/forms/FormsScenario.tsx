import { useState } from "react";
import ProblemComponent from "./ProblemComponent";
import SolutionComponent from "./SolutionComponent";

function FormsScenario() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-800">
          Scenario 10: Form Validation Debugging
        </h1>

        <p className="mb-6 text-slate-600">
          Identify why invalid form data is being accepted, then compare the
          corrected implementation.
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
            Debugging Tasks
          </h2>

          <ol className="list-decimal space-y-2 pl-5 text-sm text-blue-900">
            <li>
              Enter an invalid email and a password with at least 6 characters.
            </li>
            <li>
              Enter a valid email and a password shorter than 6 characters.
            </li>
            <li>Open Chrome DevTools using F12 and inspect the Console.</li>
            <li>
              Set a breakpoint inside <code>handleSubmit</code> in the Sources
              panel.
            </li>
            <li>
              Inspect <code>email</code> and <code>password</code> in the Scope
              panel.
            </li>
            <li>
              Find the incorrect logical operator and explain why it causes the
              bug.
            </li>
            <li>Switch to Solution and repeat the tests.</li>
          </ol>

          <p className="mt-4 text-sm text-blue-800">
            Learning outcome: understand form submission, controlled inputs,
            validation conditions, logical operators, and breakpoints.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormsScenario;
