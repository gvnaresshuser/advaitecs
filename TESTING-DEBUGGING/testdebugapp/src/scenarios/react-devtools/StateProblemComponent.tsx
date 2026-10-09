import { useState } from "react";

function StateProblemComponent() {
  const [renderCount, setRenderCount] = useState(0);

  // Intentional bug: this is not React state.
  let count = 0;
  //console.log('COUNT::'+count);

  const handleIncrement = () => {
    count = count + 1;

    console.log("Updated count:", count);

    // Forces a render, but count is recreated as 0.
    setRenderCount((previous) => previous + 1);
  };

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <span className="rounded-md bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
        INTENTIONAL BUG
      </span>

      <h3 className="mt-4 text-lg font-semibold">Counter</h3>

      <p className="mt-4 text-sm text-slate-400">Current count</p>

      <p className="mt-1 text-4xl font-bold text-white">{count}</p>

      <button
        onClick={handleIncrement}
        className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500"
      >
        Increment
      </button>

      <p className="mt-4 text-sm text-slate-400">Render count: {renderCount}</p>
    </div>
  );
}

export default StateProblemComponent;
