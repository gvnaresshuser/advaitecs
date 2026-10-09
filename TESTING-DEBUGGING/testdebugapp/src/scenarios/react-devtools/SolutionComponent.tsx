interface User {
  id: number;
  name: string;
  email: string;
}

interface UserCardProps {
  name: string;
  email: string;
}

function UserCard({ name, email }: UserCardProps) {
  return (
    <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-sm text-slate-400">User Name</p>
      <h3 className="mt-1 text-xl font-semibold">{name}</h3>

      <p className="mt-4 text-sm text-slate-400">Email Address</p>
      <p className="mt-1 text-slate-200">{email}</p>
    </div>
  );
}

function SolutionComponent() {
  const user: User = {
    id: 1,
    name: "Ravi Kumar",
    email: "ravi@example.com",
  };

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
      <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
        FIXED VERSION
      </span>

      <h2 className="mt-4 text-lg font-semibold">User Profile</h2>

      <p className="mt-2 text-sm text-slate-400">
        The parent passes the correct values to UserCard.
      </p>

      <UserCard name={user.name} email={user.email} />
    </div>
  );
}

export default SolutionComponent;
