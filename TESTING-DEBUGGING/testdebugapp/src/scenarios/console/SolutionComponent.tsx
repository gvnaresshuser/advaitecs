interface User {
  name: string;
  email: string;
}

function SolutionComponent() {
  const user: User | null = null;

  const handleShowUser = () => {
    console.log("Button clicked");
    console.log("User data:", user);

    if (!user) {
      console.warn("User details are not available.");
      return;
    }

    console.log("User name:", user.name);
  };

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
      <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
        FIXED VERSION
      </span>

      <h3 className="mt-4 text-lg font-semibold text-white">User Profile</h3>

      <p className="mt-2 text-sm text-slate-400">
        The component safely handles missing user data.
      </p>

      <button
        onClick={handleShowUser}
        className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-500"
      >
        Show User Details
      </button>
    </div>
  );
}

export default SolutionComponent;
