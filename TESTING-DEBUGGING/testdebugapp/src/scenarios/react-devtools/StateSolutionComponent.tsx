import { useState } from "react";

function StateSolutionComponent() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((previousCount) => previousCount + 1);
  };

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
      <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
        FIXED VERSION
      </span>

      <h3 className="mt-4 text-lg font-semibold">Counter</h3>

      <p className="mt-4 text-sm text-slate-400">Current count</p>

      <p className="mt-1 text-4xl font-bold text-white">{count}</p>

      <button
        onClick={handleIncrement}
        className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500"
      >
        Increment
      </button>

      <p className="mt-4 text-sm text-slate-400">
        The counter updates correctly with React state.
      </p>
    </div>
  );
}

export default StateSolutionComponent;
