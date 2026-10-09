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

function ProblemComponent() {
  const user: User = {
    id: 1,
    name: "Ravi Kumar",
    email: "ravi@example.com",
  };

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <span className="rounded-md bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
        INTENTIONAL BUG
      </span>

      <h2 className="mt-4 text-lg font-semibold">User Profile</h2>

      <p className="mt-2 text-sm text-slate-400">
        Inspect the props passed from the parent to UserCard.
      </p>

      <UserCard name={user.email} email={user.email} />
    </div>
  );
}

export default ProblemComponent;
/*
Expected problem: The User Name field displays ravi@example.com instead of Ravi Kumar.
Notice that TypeScript does not report an error. Both values are strings, 
so the compiler cannot determine that the wrong string was passed.
*/
