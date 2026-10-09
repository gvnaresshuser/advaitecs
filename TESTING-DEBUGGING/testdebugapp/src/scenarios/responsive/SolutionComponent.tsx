function SolutionComponent() {
  const users = [
    {
      id: 1,
      name: "Ravi Kumar",
      email: "ravi@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "Developer",
      status: "Active",
    },
    {
      id: 3,
      name: "Arjun Reddy",
      email: "arjun@example.com",
      role: "Tester",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Sneha Rao",
      email: "sneha@example.com",
      role: "Developer",
      status: "Active",
    },
  ];

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
      <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
        FIXED RESPONSIVE LAYOUT
      </span>

      <div className="mt-5 w-full min-w-0 rounded-xl bg-white p-4 text-slate-900 sm:p-6">
        <h2 className="text-xl font-bold sm:text-2xl">User Management</h2>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Manage your application users.
        </p>

        <div className="mt-6 max-w-full overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-200">
                <th className="p-3 sm:p-4">ID</th>
                <th className="p-3 sm:p-4">Name</th>
                <th className="p-3 sm:p-4">Email Address</th>
                <th className="p-3 sm:p-4">Role</th>
                <th className="p-3 sm:p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-200">
                  <td className="p-3 sm:p-4">{user.id}</td>
                  <td className="p-3 sm:p-4">{user.name}</td>
                  <td className="p-3 sm:p-4">{user.email}</td>
                  <td className="p-3 sm:p-4">{user.role}</td>
                  <td className="p-3 sm:p-4">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 text-white sm:w-auto">
          Add User
        </button>
      </div>
    </div>
  );
}

export default SolutionComponent;
