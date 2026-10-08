//import type { User } from "../../types/user.types";
// Before
//import type { User } from "../../types/user.types";

// After
import type { User } from "@/types/user.types";

interface UserCardProps {
  user: User;
  updating: boolean;
  deletingId: number | null;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

function UserCard({
  user,
  updating,
  deletingId,
  onEdit,
  onDelete,
}: UserCardProps) {
  return (
    <div className="flex flex-col gap-5 p-6 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-xl font-bold text-white">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800">{user.name}</h3>

          <p className="text-sm text-slate-500">{user.email}</p>

          <div className="mt-2 flex flex-wrap gap-2">
            {user.mobile && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                📱 {user.mobile}
              </span>
            )}

            {user.city && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                📍 {user.city}
              </span>
            )}

            {user.occupation && (
              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-700">
                💼 {user.occupation}
              </span>
            )}

            {user.salary !== null && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
                ₹ {user.salary}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(user)}
          disabled={updating || deletingId !== null}
          className="rounded-xl bg-amber-50 px-4 py-2.5 font-semibold text-amber-700 hover:bg-amber-100 disabled:opacity-50"
        >
          ✎ Update
        </button>

        <button
          onClick={() => onDelete(user.id)}
          disabled={deletingId !== null || updating}
          className="rounded-xl bg-red-50 px-4 py-2.5 font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
        >
          {deletingId === user.id ? "Deleting..." : "🗑 Delete"}
        </button>
      </div>
    </div>
  );
}

export default UserCard;
