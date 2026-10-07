import { useEffect, useState } from "react";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsersPaginated,
  //getUsers,
  updateUser,
} from "../api/userApi";
import type { User } from "../types/user.types";

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showView, setShowView] = useState(false);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  const handleDelete = async (user: User) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`,
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteUser(user.id);

      setSuccess("User deleted successfully.");
      await loadUsers();
    } catch (error: any) {
      console.error(error);
      setError(error?.response?.data?.message || "Unable to delete user.");
    }
  };

const loadUsers = async (currentPage = page) => {
  try {
    setLoading(true);
    setError("");
    const response = await getUsersPaginated(currentPage, limit);
    setUsers(response.data);
    setTotal(response.pagination.total);
    setTotalPages(response.pagination.totalPages);
  } catch (error) {
    console.error(error);
    setError("Unable to load users.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadUsers(page);
}, [page]);

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    if (form.name.trim().length < 2) {
      setFormError("Name must be at least 2 characters.");
      return;
    }

    if (!form.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }

    try {
      setSaving(true);

      const response = await createUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      setSuccess(response.message || "User created successfully.");
      setForm({ name: "", email: "", password: "" });
      setShowForm(false);
      await loadUsers();
    } catch (error: any) {
      console.error(error);
      setFormError(error?.response?.data?.message || "Unable to create user.");
    } finally {
      setSaving(false);
    }
  };

  const handleView = async (id: string) => {
    try {
      setFormError("");
      const response = await getUserById(id);
      setSelectedUser(response.data);
      setShowView(true);
    } catch (error) {
      console.error(error);
      setError("Unable to load user details.");
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
    });
    setFormError("");
    setSuccess("");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (editForm.name.trim().length < 2) {
      setFormError("Name must be at least 2 characters.");
      return;
    }

    if (!editForm.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!editingUser) return;

    try {
      setSaving(true);

      const response = await updateUser(editingUser.id, {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
      });

      setSuccess(response.message || "User updated successfully.");
      setEditingUser(null);
      await loadUsers();
    } catch (error: any) {
      console.error(error);
      setFormError(error?.response?.data?.message || "Unable to update user.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Users</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage application users.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm(true);
            setFormError("");
            setSuccess("");
          }}
          className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          + Add User
        </button>
      </div>

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {showForm && (
        <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Add User</h2>
              <p className="text-sm text-slate-500">
                Create a new application user.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xl text-slate-400 hover:text-slate-700"
            >
              ×
            </button>
          </div>

          {formError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {formError}
            </div>
          )}

          <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-60"
              >
                {saving ? "Creating..." : "Create User"}
              </button>
            </div>
          </form>
        </div>
      )}

      {editingUser && (
        <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Edit User
              </h2>
              <p className="text-sm text-slate-500">Update user information.</p>
            </div>

            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="text-xl text-slate-400 hover:text-slate-700"
            >
              ×
            </button>
          </div>

          {formError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {formError}
            </div>
          )}

          <form onSubmit={handleUpdate} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {showView && selectedUser && (
        <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                User Details
              </h2>
              <p className="text-sm text-slate-500">View user information.</p>
            </div>

            <button
              type="button"
              onClick={() => setShowView(false)}
              className="text-xl text-slate-400 hover:text-slate-700"
            >
              ×
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs uppercase text-slate-400">Name</p>
              <p className="mt-1 font-medium text-slate-800">
                {selectedUser.name}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs uppercase text-slate-400">Email</p>
              <p className="mt-1 break-all font-medium text-slate-800">
                {selectedUser.email}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4 sm:col-span-2">
              <p className="text-xs uppercase text-slate-400">Created</p>
              <p className="mt-1 font-medium text-slate-800">
                {selectedUser.created_at
                  ? new Date(selectedUser.created_at).toLocaleString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..."
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 sm:max-w-md"
          />
        </div>

        {loading && (
          <div className="p-8 text-center text-sm text-slate-500">
            Loading users...
          </div>
        )}

        {error && (
          <div className="m-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left text-sm">
                <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Uuid</th>
                    <th className="px-5 py-4">Created</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-medium text-slate-800">
                        {user.name}
                      </td>

                      <td className="px-5 py-4 text-slate-600">{user.email}</td>
                      <td className="px-5 py-4 text-slate-600">{user.id}</td>

                      <td className="px-5 py-4 text-slate-500">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleView(user.id)}
                            className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEdit(user)}
                            className="rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(user)}
                            className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="p-8 text-center text-sm text-slate-500">
                {users.length === 0
                  ? "No users found."
                  : "No users match your search."}
              </div>
            )}
            {totalPages > 0 && (
              <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-500">
                  Showing {users.length} of {total} users
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((current) => current - 1)}
                    disabled={page === 1 || loading}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <span className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => setPage((current) => current + 1)}
                    disabled={page === totalPages || loading}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Users;
