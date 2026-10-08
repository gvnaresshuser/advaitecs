interface UserHeaderProps {
  userCount: number;
}

function UserHeader({ userCount }: UserHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
              ⚡ React + TypeScript + Redux Toolkit
            </div>

            <h1 className="text-4xl font-bold md:text-5xl">User Management</h1>

            <p className="mt-3 max-w-2xl text-blue-100">
              Complete CRUD application using Redux Toolkit, TypeScript, Express
              and PostgreSQL.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 px-8 py-5 text-center">
            <div className="text-4xl font-bold">{userCount}</div>

            <div className="mt-1 text-sm text-blue-100">Total Users</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
