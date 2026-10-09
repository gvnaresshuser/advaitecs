function SolutionComponent() {
  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
      <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
        FIXED STYLING
      </span>

      <div className="mt-5 rounded-xl bg-white p-5">
        <h2 className="text-xl font-bold text-gray-900">User Registration</h2>

        <p className="mt-2 text-gray-500">Fill in your details to register.</p>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          onClick={() => console.log("Register clicked")}
        >
          Register
        </button>

        <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
          This information should appear closer to the button.
        </div>
      </div>
    </div>
  );
}

export default SolutionComponent;
