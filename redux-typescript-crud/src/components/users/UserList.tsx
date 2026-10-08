import type { User } from "../../types/user.types";

import UserCard from "./UserCard";

interface UserListProps {
  users: User[];
  userCount: number;
  updating: boolean;
  deletingId: number | null;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

function UserList({
  users,
  userCount,
  updating,
  deletingId,
  onEdit,
  onDelete,
}: UserListProps) {

/*   userCount = "10";
  let x = 10;
  x = "20"; */

  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-4xl">
          👥
        </div>

        <h3 className="mt-5 text-xl font-bold text-slate-800">
          No users found
        </h3>

        <p className="mt-2 text-slate-500">
          Add your first user using the form above.
        </p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            User Directory
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-800">All Users</h2>
        </div>

        <div className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
          {userCount} Users
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            updating={updating}
            deletingId={deletingId}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default UserList;
