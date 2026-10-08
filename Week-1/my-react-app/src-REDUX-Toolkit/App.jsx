import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  increment,
  decrement,
} from "./features/counter/counterSlice";

import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  clearUsers,  
} from "./features/users/usersSlice";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  // =========================
  // Counter State
  // =========================

  const count = useSelector((state) => state.counter.count);

  // =========================
  // Users State
  // =========================

  const {
    users,
    loading,
    adding,
    updatingId,
    deletingId,
    error,
  } = useSelector((state) => state.users);

  // =========================
  // Form State
  // =========================

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

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

 const handleSubmit = () => {
   if (!form.name.trim()) {
     alert("Please enter the user's name.");
     return;
   }

   if (!form.email.trim()) {
     alert("Please enter the user's email.");
     return;
   }

   if (editingId !== null) {
     // UPDATE
     dispatch(
       updateUser({
         id: editingId,
         ...form,
       }),
     );
   } else {
     // CREATE
     dispatch(addUser(form));
   }

   setForm({
     name: "",
     email: "",
   });

   setEditingId(null);
 };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (user) => {
    setForm({
      name: user.name || "",
      email: user.email || "",
    });

    setEditingId(user.id);
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancel = () => {
    setForm({
      name: "",
      email: "",
    });

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
      <header className="header">
        <div>
          <p className="eyebrow">React + Redux Toolkit</p>

          <h1>Redux Toolkit CRUD</h1>

          <p className="subtitle">
            Counter state management and asynchronous User CRUD operations.
          </p>
        </div>
      </header>

      <main className="container">
        {/* =========================
            COUNTER
        ========================= */}

        <section className="card counter-card">
          <div className="section-heading">
            <div>
              <p className="section-label">STATE MANAGEMENT</p>

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
              className="btn btn-primary"
              onClick={() => dispatch(increment())}
            >
              + Increment
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => dispatch(decrement())}
            >
              − Decrement
            </button>
          </div>
        </section>

        {/* =========================
            USERS
        ========================= */}

        <section className="card">
          <div className="section-heading">
            <div>
              <p className="section-label">ASYNC STATE MANAGEMENT</p>

              <h2>Users</h2>
            </div>

            <div className="button-row">
              <div className="user-count">{users.length} Users</div>

              <button
                className="btn btn-primary"
                onClick={() => dispatch(fetchUsers())}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load Users"}
              </button>

              <button
                className="btn btn-danger"
                onClick={() => dispatch(clearUsers())}
                disabled={users.length === 0}
              >
                Clear Users
              </button>
            </div>
          </div>

          {/* Loading */}

          {loading && (
            <div className="status loading">
              <span className="spinner" />
              Loading users...
            </div>
          )}

          {/* Error */}

          {error && <div className="status error">❌ {error}</div>}

          {/* =========================
              ADD / UPDATE FORM
          ========================= */}

          <div className="add-user">
            <div>
              <h3>{editingId !== null ? "Edit User" : "Add New User"}</h3>

              <p>
                {editingId !== null
                  ? "Change the details and update the user."
                  : "Create a new user using Redux Toolkit."}
              </p>
            </div>

            <div className="form-row">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter user name"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
              />

              <button
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={adding || updatingId !== null}
              >
                {editingId !== null ? (
                  updatingId === editingId ? (
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

              {editingId !== null && (
                <button
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={updatingId !== null}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* =========================
              USER LIST
          ========================= */}

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
                    </div>
                  </div>

                  <div className="actions">
                    {/* UPDATE */}

                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(user)}
                      disabled={updatingId !== null || deletingId !== null}
                    >
                      ✎ Update
                    </button>

                    {/* DELETE */}

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingId !== null || updatingId !== null}
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

          {/* Empty State */}

          {!loading && users.length === 0 && !error && (
            <div className="empty-state">
              <div className="empty-icon">👥</div>

              <h3>No users yet</h3>

              <p>Add your first user above.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

