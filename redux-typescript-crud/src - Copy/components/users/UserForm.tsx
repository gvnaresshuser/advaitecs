import type { ChangeEvent, FormEvent } from "react";

import type {
  Occupation,
  UserForm as UserFormType,
} from "../../types/user.types";

interface UserFormProps {
  form: UserFormType;

  editingId: number | null;

  adding: boolean;

  updating: boolean;

  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

  onSubmit: (e: FormEvent<HTMLFormElement>) => void;

  onCancel: () => void;
}

const occupations: Occupation[] = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Engineer",
  "Data Scientist",
  "QA Engineer",
  "UI/UX Designer",
  "Project Manager",
  "Business Analyst",
  "Technical Lead",
  "Engineering Manager",
  "Product Manager",
  "Other",
];

function UserForm({
  form,
  editingId,
  adding,
  updating,
  onChange,
  onSubmit,
  onCancel,
}: UserFormProps) {
  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
            {editingId !== null ? "✎" : "＋"}
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {editingId !== null ? "Edit User" : "Add New User"}
            </h2>

            <p className="text-sm text-slate-500">
              {editingId !== null
                ? "Update the user information below."
                : "Enter user details to create a new user."}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="p-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* NAME */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Enter name"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* EMAIL */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="Enter email"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* MOBILE */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Mobile
            </label>

            <input
              name="mobile"
              value={form.mobile}
              onChange={onChange}
              placeholder="Enter mobile"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* CITY */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              City
            </label>

            <input
              name="city"
              value={form.city}
              onChange={onChange}
              placeholder="Enter city"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* OCCUPATION */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Occupation
            </label>

            <select
              name="occupation"
              value={form.occupation}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Select occupation</option>

              {occupations.map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
          </div>

          {/* SALARY */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Salary
            </label>

            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={onChange}
              placeholder="Enter salary"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* BUTTONS */}

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={adding || updating}
            className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {editingId !== null
              ? updating
                ? "Updating..."
                : "✓ Update User"
              : adding
                ? "Adding..."
                : "+ Add User"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={onCancel}
              disabled={updating}
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default UserForm;
