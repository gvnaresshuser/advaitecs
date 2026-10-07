import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

import {
  showConfirm,
  showError,
  showSuccess,
} from "../components/common/Alert";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    const confirmed = await showConfirm(
      "Logout",
      "Are you sure you want to logout?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await logout();

      showSuccess(
        "Logout Successful",
        "You have been logged out successfully.",
      );

      navigate("/login", { replace: true });
    } catch {
      showError("Logout Failed", "Unable to logout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">JWT Authentication</h1>

            <p className="text-sm text-blue-100">Secure Full-Stack Dashboard</p>
          </div>

          <button
            type="button"
            onClick={() => void handleLogout()}
            className="rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/30"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.email}
          </h2>

          <p className="mt-1 text-gray-500">
            You are successfully authenticated.
          </p>
        </div>

        {/* User Information */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Authentication Card */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl">
                🔐
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Authentication
                </h3>

                <p className="text-sm text-gray-500">Current session</p>
              </div>
            </div>

            <div className="rounded-lg bg-green-50 p-4">
              <p className="font-semibold text-green-700">✓ Authenticated</p>

              <p className="mt-1 text-sm text-green-600">
                Your session is active.
              </p>
            </div>
          </div>

          {/* User Card */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-2xl">
                👤
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  User Information
                </h3>

                <p className="text-sm text-gray-500">Logged-in user</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">
                  User ID
                </p>

                <p className="font-medium text-gray-700">{user?.userId}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Email
                </p>

                <p className="font-medium text-gray-700">{user?.email}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Roles
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {user?.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Information */}
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="font-bold text-blue-800">
            🔒 Authentication Security
          </h3>

          <p className="mt-2 text-sm leading-6 text-blue-700">
            This application uses JWT authentication with HTTP-only cookies. The
            access token is not stored in browser localStorage or
            sessionStorage.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
