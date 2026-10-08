import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/users";

function App() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    occupation: "",
    salary: "",
  });

  const [editingId, setEditingId] = useState(null);

  // GET - All Users
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

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // POST - Add User
  const addUser = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const newUser = await response.json();

      setUsers([...users, newUser]);

      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  // PUT - Update User
  const updateUser = async () => {
    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();

      setUsers(
        users.map((user) => (user.id === editingId ? updatedUser : user)),
      );

      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE - Delete User
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Edit
  const startEdit = (user) => {
    setEditingId(user.id);

    setForm({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      city: user.city || "",
      occupation: user.occupation || "",
      salary: user.salary || "",
    });
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);

    setForm({
      name: "",
      email: "",
      mobile: "",
      city: "",
      occupation: "",
      salary: "",
    });
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      updateUser();
    } else {
      addUser();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">
        User CRUD Application - Without RTK
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 rounded-lg bg-white p-6 shadow"
      >
        <h2 className="mb-4 text-xl font-semibold">
          {editingId ? "Update User" : "Add User"}
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="rounded border p-2"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="rounded border p-2"
            required
          />

          <input
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
            className="rounded border p-2"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="rounded border p-2"
          />

          <input
            name="occupation"
            placeholder="Occupation"
            value={form.occupation}
            onChange={handleChange}
            className="rounded border p-2"
          />

          <input
            name="salary"
            type="number"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            className="rounded border p-2"
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="rounded bg-blue-600 px-5 py-2 text-white"
          >
            {editingId ? "Update User" : "Add User"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded bg-gray-400 px-5 py-2 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Users */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold">Users ({users.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-200">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">City</th>
                <th className="p-3">Occupation</th>
                <th className="p-3">Salary</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.mobile}</td>
                  <td className="p-3">{user.city}</td>
                  <td className="p-3">{user.occupation}</td>
                  <td className="p-3">{user.salary}</td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(user)}
                        className="rounded bg-yellow-500 px-3 py-1 text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="rounded bg-red-600 px-3 py-1 text-white"
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
      </div>
    </div>
  );
}

export default App;
