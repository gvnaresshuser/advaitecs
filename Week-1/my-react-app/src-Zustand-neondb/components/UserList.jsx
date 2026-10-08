import { useEffect } from "react";

import useUserStore from "../store/userStore";

export default function UserList({ onEdit }) {
  const {
    users,
    loading,
    error,
    fetchUsers,
    removeUser,
  } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <p className="text-lg font-medium text-gray-500">
          Loading users...
        </p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="mx-auto mt-8 max-w-3xl rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="font-medium text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-6xl px-4 pb-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Users
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage registered users
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {users.length} Users
        </span>
      </div>

      {/* Empty State */}
      {users.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-md ring-1 ring-gray-200">
          <p className="text-lg font-medium text-gray-500">
            No users found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-200 transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* User Header */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {user.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    User ID: {user.id}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="font-medium text-gray-500">
                    Email
                  </span>

                  <span className="text-right text-gray-800">
                    {user.email}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="font-medium text-gray-500">
                    Mobile
                  </span>

                  <span className="text-gray-800">
                    {user.mobile}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="font-medium text-gray-500">
                    City
                  </span>

                  <span className="text-gray-800">
                    {user.city}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="font-medium text-gray-500">
                    Occupation
                  </span>

                  <span className="text-right text-gray-800">
                    {user.occupation}
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-t border-gray-100 pt-3">
                  <span className="font-medium text-gray-500">
                    Salary
                  </span>

                  <span className="font-bold text-green-600">
                    ₹{user.salary}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3 border-t border-gray-100 pt-4">
                {/* Edit */}
                <button
                  onClick={() => onEdit(user)}
                  className="flex-1 rounded-lg bg-blue-500 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95"
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => removeUser(user.id)}
                  className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 font-semibold text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 active:scale-95"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

