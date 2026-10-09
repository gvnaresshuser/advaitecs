import { useState, type FormEvent } from "react";

function SolutionComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Email:", email);
    console.log("Password length:", password.length);

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    setMessage("Form submitted successfully!");
  };

  return (
    <div className="rounded-xl border border-green-300 bg-white p-6 shadow">
      <h2 className="mb-2 text-xl font-bold text-green-600">
        Solution: Correct Validation
      </h2>

      <p className="mb-5 text-sm text-gray-600">
        Each field is validated independently.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 6 characters"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
        >
          Submit
        </button>
      </form>

      {message && (
        <p className="mt-4 rounded-lg bg-gray-100 p-3 text-sm font-medium text-gray-800">
          {message}
        </p>
      )}
    </div>
  );
}

export default SolutionComponent;

