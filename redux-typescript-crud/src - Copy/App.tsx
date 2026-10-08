import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  clearUsers,
} from "./features/users/usersSlice";

import UserHeader from "./components/users/UserHeader";
import UserForm from "./components/users/UserForm";
import UserList from "./components/users/UserList";

import type { User, UserForm as UserFormType } from "./types/user.types";

//IntelliSense Suggestion
//import type { Occupation } from "./types/user.types";

const initialForm: UserFormType = {
  name: "",
  email: "",
  mobile: "",
  city: "",
  occupation: "",
  salary: "",
};

function App() {
  //IntelliSense Suggestion
  //Now press Ctrl + Space after the =
  //const occupation: Occupation =
  /*
  You should see IntelliSense suggestions such as:
"Software Engineer"
"Frontend Developer"
"Backend Developer"
"Full Stack Developer"
"DevOps Engineer"
"Data Engineer"
"Data Scientist"
"QA Engineer"
"UI/UX Designer"
"Project Manager"
"Business Analyst"
"Technical Lead"
"Engineering Manager"
"Product Manager"
"Other"
  */

  const dispatch = useAppDispatch();

  const { users, userCount, loading, adding, updating, deletingId, error } =
    useAppSelector((state) => state.users);

  const [form, setForm] = useState<UserFormType>(initialForm);

  const [editingId, setEditingId] = useState<number | null>(null);

  // ========================================
  // READ
  // ========================================

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // ========================================
  // FORM CHANGE
  // ========================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========================================
  // CREATE / UPDATE
  // ========================================

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    const userData = {
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      city: form.city,
      occupation: form.occupation || "Other",
      salary: form.salary ? Number(form.salary) : null,
    };

    if (editingId !== null) {
      dispatch(
        updateUser({
          id: editingId,
          ...userData,
        }),
      );

      setEditingId(null);
    } else {
      dispatch(addUser(userData));
    }

    setForm(initialForm);
  };

  // ========================================
  // EDIT
  // ========================================

  const handleEdit = (user: User) => {
    setForm({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      city: user.city,
      occupation: user.occupation,
      salary: user.salary !== null ? String(user.salary) : "",
    });

    setEditingId(user.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ========================================
  // CANCEL
  // ========================================

  const handleCancel = () => {
    setForm(initialForm);

    setEditingId(null);
  };

  // ========================================
  // DELETE
  // ========================================

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <UserHeader userCount={userCount} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ACTION BAR */}

        <div className="mb-6 flex justify-between rounded-2xl bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase text-indigo-600">
              CRUD Operations
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-800">Users</h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => dispatch(fetchUsers())}
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Loading..." : "↻ Load Users"}
            </button>

            <button
              onClick={() => dispatch(clearUsers())}
              className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 font-semibold text-red-600"
            >
              Clear Users
            </button>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            <p className="font-semibold">Something went wrong</p>

            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* FORM */}

        <UserForm
          form={form}
          editingId={editingId}
          adding={adding}
          updating={updating}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        {/* LOADING */}

        {loading && (
          <div className="mb-6 rounded-2xl bg-white py-12 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

            <p className="mt-4 text-slate-600">Loading users...</p>
          </div>
        )}

        {/* USERS */}

        {!loading && (
          <UserList
            users={users}
            userCount={userCount}
            updating={updating}
            deletingId={deletingId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      <footer className="border-t bg-white py-6 text-center text-sm text-slate-500">
        React + TypeScript + Redux Toolkit
        {" • "}
        Users CRUD
      </footer>
    </div>
  );
}

export default App;
