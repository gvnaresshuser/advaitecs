import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/users";
/*
JSONPlaceholder is a fake REST API for testing. It simulates POST/PUT/DELETE, 
but it does not permanently save those changes.
*/

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  // =========================
  // GET - All Users
  // =========================

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Load users when component starts
  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // POST - Add User
  // =========================

  const addUser = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const newUser = await response.json();

      console.log("Created user:", newUser);

      // Add new user to React state
      setUsers((prevUsers) => [...prevUsers, newUser]);

      // Clear form
      setName("");
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // PUT - Update User
  // =========================

  const updateUser = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Status:", response.status);
        console.log("Response:", errorText);
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();

      console.log("Updated user:", updatedUser);

      // Update user inside React state
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? updatedUser : user)),
      );

      // Clear form
      setName("");
      setEmail("");
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // DELETE - Delete User
  // =========================

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const result = await response.json();

      console.log(result);

      // Remove user from React state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // Edit Button
  // =========================

  const startEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  // =========================
  // Cancel Edit
  // =========================

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setEmail("");
  };

  // =========================
  // Form Submit
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      updateUser(editingId);
    } else {
      addUser();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* =========================
          Header
      ========================= */}

      <header className="bg-slate-900 text-white shadow-lg">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <h1 className="text-3xl font-bold">Express CRUD Demo</h1>

          <p className="mt-1 text-sm text-slate-300">
            React + Express + JSONPlaceholder API
          </p>
        </div>
      </header>

      {/* =========================
          Main
      ========================= */}

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* =========================
            Add / Update Form
        ========================= */}

        <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            {editingId ? "Update User" : "Add New User"}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
            {/* Name */}

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            {/* Buttons */}

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700"
              >
                {editingId ? "Update User" : "Add User"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-lg bg-slate-200 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* =========================
            Users Table
        ========================= */}

        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          {/* Table Header */}

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Users</h2>

              <p className="text-sm text-slate-500">
                Manage users using REST API
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {users.length} Users
            </span>
          </div>

          {/* Table */}

          {users.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-500">
              No users found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm uppercase text-slate-600">
                  <tr>
                    <th className="px-6 py-4 font-semibold">ID</th>

                    <th className="px-6 py-4 font-semibold">Name</th>

                    <th className="px-6 py-4 font-semibold">Email</th>

                    <th className="px-6 py-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {users.map((user) => (
                    <tr key={user.id} className="transition hover:bg-slate-50">
                      {/* ID */}

                      <td className="px-6 py-4 font-medium text-slate-700">
                        {user.id}
                      </td>

                      {/* Name */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                            {user.name.charAt(0).toUpperCase()}
                          </div>

                          <span className="font-medium text-slate-800">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      {/* Email */}

                      <td className="px-6 py-4 text-slate-600">{user.email}</td>

                      {/* Actions */}

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => startEdit(user)}
                            className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-200"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteUser(user.id)}
                            className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200"
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
          )}
        </div>
      </main>

      {/* =========================
          Footer
      ========================= */}

      <footer className="mt-8 border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        React + Express REST API Demo
      </footer>
    </div>
  );
}

export default App;
