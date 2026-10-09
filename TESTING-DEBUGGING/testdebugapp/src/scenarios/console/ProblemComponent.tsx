function ProblemComponent() {
  const user = undefined;

  const handleShowUser = () => {
    console.log("Button clicked");
    console.log("User data:", user);

    // Intentional bug: user is undefined.
    console.log("User name:", user.name);
  };

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-md bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
          INTENTIONAL BUG
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white">User Profile</h3>

      <p className="mt-2 text-sm text-slate-400">
        Click the button to display the user details.
      </p>

      <button
        onClick={handleShowUser}
        className="mt-5 rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-500"
      >
        Show User Details
      </button>
    </div>
  );
}

export default ProblemComponent;
