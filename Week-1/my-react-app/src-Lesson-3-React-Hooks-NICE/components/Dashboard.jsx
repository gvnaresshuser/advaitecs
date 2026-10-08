import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
      {/* Dashboard Header */}
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-md">
          📊
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>

          <p className="text-blue-700 mt-1">Welcome to the Dashboard!</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Card 1 */}
        <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Users</p>

          <p className="text-2xl font-bold text-slate-800 mt-2">120</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Products</p>

          <p className="text-2xl font-bold text-slate-800 mt-2">85</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Orders</p>

          <p className="text-2xl font-bold text-slate-800 mt-2">250</p>
        </div>
      </div>

      {/* Authentication Message */}
      <div className="mt-6 bg-blue-100 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          🔐 You are viewing this Dashboard because the{" "}
          <strong>withAuth</strong> HOC verified your authentication.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
