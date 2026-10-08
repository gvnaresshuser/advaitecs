import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { increment, decrement } from "./features/counter/counterSlice";

import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  clearUsers,
} from "./features/users/usersSlice";

import "./App.css";

const initialForm = {
  name: "",
  email: "",
  mobile: "",
  city: "",
  occupation: "",
  salary: "",
};

function App() {
  const dispatch = useDispatch();

  // =========================
  // Counter
  // =========================

  const count = useSelector((state) => state.counter.count);

  // =========================
  // Users
  // =========================

  const { users, userCount, loading, adding, updating, deletingId, error } =
    useSelector((state) => state.users);

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  // =========================
  // READ
  // =========================

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // =========================
  // Form Change
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // CREATE / UPDATE
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    const userData = {
      ...form,
      salary: form.salary ? Number(form.salary) : null,
    };

    if (editingId) {
      // UPDATE
      dispatch(
        updateUser({
          id: editingId,
          ...userData,
        }),
      );

      setEditingId(null);
    } else {
      // CREATE
      dispatch(addUser(userData));
    }

    setForm(initialForm);
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (user) => {
    setForm({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      city: user.city || "",
      occupation: user.occupation || "",
      salary: user.salary || "",
    });

    setEditingId(user.id);
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="app">
      {/* =================================
          HEADER
      ================================= */}

      <header className="header">
        <div>
          <p className="eyebrow">React + Redux Toolkit + Express + Neon</p>

          <h1>Counter / User Management</h1>

          <p className="subtitle">
            Complete CRUD application using Redux Toolkit and PostgreSQL.
          </p>
        </div>
      </header>

      <main className="container">
        {/* =================================
            COUNTER
        ================================= */}

        <section className="card">
          <div className="section-heading">
            <div>
              <p className="section-label">REDUX STATE</p>

              <h2>Counter</h2>
            </div>

            <div className="count-badge">{count}</div>
          </div>

          <div className="counter-display">
            <span>Current Count</span>

            <strong>{count}</strong>
          </div>

          <div className="button-row">
            <button
              className="btn btn-secondary"
              onClick={() => dispatch(decrement())}
            >
              − Decrement
            </button>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(increment())}
            >
              + Increment
            </button>
          </div>
        </section>

        {/* =================================
            USERS
        ================================= */}

        <section className="card">
          <div className="section-heading">
            <div>
              <p className="section-label">CRUD OPERATIONS</p>
              <h2>Users</h2>
            </div>

            <div className="button-row">
              <div className="user-count">{userCount} Users</div>

              <button
                className="btn btn-primary"
                onClick={() => dispatch(fetchUsers())}
                disabled={loading}
              >
                {loading ? "Loading..." : "↻ Load Users"}
              </button>

              <button
                className="btn btn-danger"
                onClick={() => dispatch(clearUsers())}
              >
                Clear Users
              </button>
            </div>
          </div>

          {/* =================================
              READ - LOADING
          ================================= */}

          {loading && (
            <div className="status loading">
              <span className="spinner" />
              Loading users...
            </div>
          )}

          {/* =================================
              ERROR
          ================================= */}

          {error && <div className="status error">❌ {error}</div>}

          {/* =================================
              CREATE / UPDATE FORM
          ================================= */}

          <div className="add-user">
            <h3>{editingId ? "Edit User" : "Add New User"}</h3>

            <p>
              {editingId
                ? "Change the details and update the user record."
                : "Enter user details and create a new record in PostgreSQL."}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />

                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Mobile"
                />

                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                />

                <input
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  placeholder="Occupation"
                />

                <input
                  name="salary"
                  type="number"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="Salary"
                />
              </div>

              <div className="button-row">
                <button
                  type="submit"
                  className="btn btn-success add-button"
                  disabled={adding || updating}
                >
                  {editingId ? (
                    updating ? (
                      <>
                        <span className="small-spinner" />
                        Updating...
                      </>
                    ) : (
                      "✓ Update User"
                    )
                  ) : adding ? (
                    <>
                      <span className="small-spinner" />
                      Adding...
                    </>
                  ) : (
                    "+ Add User"
                  )}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                    disabled={updating}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* =================================
              USER LIST
          ================================= */}

          {!loading && users.length > 0 && (
            <div className="user-list">
              <div className="list-header">
                <span>User</span>
                <span>Actions</span>
              </div>

              {users.map((user) => (
                <div className="user-row" key={user.id}>
                  <div className="user-info">
                    <div className="avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <strong>{user.name}</strong>

                      <span>{user.email}</span>

                      <small>
                        {user.city || "—"} • {user.occupation || "—"} • ₹
                        {user.salary || "—"}
                      </small>
                    </div>
                  </div>

                  <div className="actions">
                    {/* UPDATE */}

                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(user)}
                      disabled={updating || deletingId}
                    >
                      ✎ Update
                    </button>

                    {/* DELETE */}

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingId !== null || updating}
                    >
                      {deletingId === user.id ? (
                        <>
                          <span className="small-spinner" />
                          Deleting...
                        </>
                      ) : (
                        "🗑 Delete"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =================================
              EMPTY STATE
          ================================= */}

          {!loading && users.length === 0 && !error && (
            <div className="empty-state">
              <div className="empty-icon">👥</div>

              <h3>No users found</h3>

              <p>Add your first user above.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
