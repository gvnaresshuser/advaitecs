function ProblemComponent() {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <span className="rounded-md bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
        INTENTIONAL CSS BUGS
      </span>

      <div className="mt-5 rounded-xl bg-white p-5">
        {/* Bug 1: White text on a white background */}
        <h2 className="text-xl font-bold text-white">User Registration</h2>

        <p className="mt-2 text-gray-500">Fill in your details to register.</p>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Bug 2: Red background and red text */}
        <button
          className="mt-6 rounded-lg bg-red-600 px-5 py-3 font-semibold text-red-600"
          onClick={() => console.log("Register clicked")}
        >
          Register
        </button>

        {/* Bug 3: Unwanted excessive spacing */}
        <div className="mt-20 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
          This information should appear closer to the button.
        </div>
      </div>
    </div>
  );
}

export default ProblemComponent;
/*
There are three deliberate styling issues:
- The heading is white on a white background.
- The button has red text on a red background.
- The information panel has excessive top margin.
*/
