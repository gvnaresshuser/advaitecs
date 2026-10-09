function ProblemComponent() {
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
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <span className="rounded-md bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
        INTENTIONAL RESPONSIVE BUGS
      </span>

      {/* Bug 1: Fixed width */}
      <div className="mt-5 w-[900px] rounded-xl bg-white p-6 text-slate-900">
        <h2 className="text-2xl font-bold">User Management</h2>

        <p className="mt-2 text-slate-500">Manage your application users.</p>

        {/* Bug 2: Wide table without a scrollable wrapper */}
        <table className="mt-6 w-[850px] border-collapse text-left">
          <thead>
            <tr className="bg-slate-200">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email Address</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-200">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white">
          Add User
        </button>
      </div>
    </div>
  );
}

export default ProblemComponent;
/*
Expected problem: On a narrow viewport, the 900-pixel container extends beyond 
the available screen width, causing horizontal overflow.
*/
