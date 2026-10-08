import React from "react";
import Dashboard from "./components/Dashboard";
import withAuth from "./hocs/withAuth";

const ProtectedDashboard = withAuth(Dashboard);

function App() {
  const login = () => {
    localStorage.setItem("token", "abc123");

    // Refresh component so we can see the change
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("token");

    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                HOC Authentication Demo
              </h1>

              <p className="mt-2 text-slate-500">
                Higher-Order Component based authentication
              </p>
            </div>

            <div className="text-4xl">🔐</div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={login}
              className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold
                         hover:bg-green-700 transition duration-200
                         shadow-md hover:shadow-lg"
            >
              Login
            </button>

            <button
              onClick={logout}
              className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold
                         hover:bg-red-700 transition duration-200
                         shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Protected Component */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-700">
              Protected Component
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Dashboard is protected using the withAuth HOC.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <ProtectedDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
