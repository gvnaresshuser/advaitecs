import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6">
      <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
        Advanced Full Stack
      </h1>

      <div className="flex items-center gap-3">
        {user && (
          <span className="hidden text-sm text-slate-600 sm:block">
            {user.name}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
