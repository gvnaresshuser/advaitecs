import { useState } from "react";
import { UserPlus, LoaderCircle } from "lucide-react";

import toast from "react-hot-toast";

function CreateUser() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      // API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("User created successfully!");
    } catch (error) {
      toast.error("Unable to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold text-gray-800">Create User</h2>

      <input
        type="text"
        placeholder="Enter user name"
        className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-500"
      />

      <input
        type="email"
        placeholder="Enter email"
        className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <LoaderCircle size={20} className="animate-spin" />
            Creating User...
          </>
        ) : (
          <>
            <UserPlus size={20} />
            Create User
          </>
        )}
      </button>
    </form>
  );
}

export default CreateUser;
