import SolutionComponent from "./SolutionComponent";

function TypeScriptScenario() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-800">
          Scenario 12: TypeScript Build Debugging
        </h1>

        <p className="mb-6 text-slate-600">
          Identify TypeScript errors, understand compiler messages, and correct
          invalid types.
        </p>

        <SolutionComponent />

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="mb-3 text-lg font-bold text-blue-900">
            Student Debugging Tasks
          </h2>

          <ol className="list-decimal space-y-2 pl-5 text-sm text-blue-900">
            <li>
              Open <code>ProblemComponent.tsx</code> in VS Code.
            </li>
            <li>Observe the TypeScript errors underlined in red.</li>
            <li>Hover over each error and read its explanation.</li>
            <li>Run the dedicated TypeScript checking command.</li>
            <li>Identify the TS2322, TS2345, and TS2339 errors.</li>
            <li>Compare the problem code with SolutionComponent.tsx.</li>
            <li>Fix the incorrect types and property names.</li>
            <li>Run the TypeScript checking command again.</li>
          </ol>

          <p className="mt-4 text-sm text-blue-800">
            Learning outcome: TypeScript error interpretation, static type
            checking, interface validation, and debugging build failures.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TypeScriptScenario;
