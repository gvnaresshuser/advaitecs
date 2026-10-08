import { useEffect, useState } from "react";

import useUserStore from "../store/userStore";

const emptyForm = {
  name: "",
  email: "",
  mobile: "",
  city: "",
  occupation: "",
  salary: "",
};

export default function UserForm({
  editingUser,
  onCancelEdit,
}) {
  const {
    addUser,
    updateUser,
  } = useUserStore();

  const [formData, setFormData] = useState(emptyForm);

  // When editingUser changes,
  // populate the form with the selected user's data
  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name || "",
        email: editingUser.email || "",
        mobile: editingUser.mobile || "",
        city: editingUser.city || "",
        occupation: editingUser.occupation || "",
        salary: editingUser.salary || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingUser) {
      // UPDATE
      await updateUser(
        editingUser.id,
        formData
      );

      onCancelEdit();
    } else {
      // CREATE
     await addUser({
       ...formData,
       salary: formData.salary === "" ? null : Number(formData.salary),
     });
    }

    setFormData(emptyForm);
  };

  const handleCancel = () => {
    setFormData(emptyForm);

    onCancelEdit();
  };

  return (
    <div className="mx-auto mt-8 max-w-3xl px-4">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
      >
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-5">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingUser
              ? "Edit User"
              : "Add New User"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {editingUser
              ? "Update the user's details below."
              : "Enter the user's details below."}
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor="mobile"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Mobile
            </label>

            <input
              id="mobile"
              name="mobile"
              type="tel"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              City
            </label>

            <input
              id="city"
              name="city"
              type="text"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Occupation */}
          <div>
            <label
              htmlFor="occupation"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Occupation
            </label>

            <input
              id="occupation"
              name="occupation"
              type="text"
              placeholder="Enter occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Salary */}
          <div>
            <label
              htmlFor="salary"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Salary
            </label>

            <input
              id="salary"
              name="salary"
              type="number"
              placeholder="Enter salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          {/* Cancel */}
          {editingUser && (
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg bg-gray-200 px-6 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:scale-95"
            >
              Cancel
            </button>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={`rounded-lg px-6 py-2.5 font-semibold text-white shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 ${
              editingUser
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            }`}
          >
            {editingUser
              ? "Update User"
              : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
}

