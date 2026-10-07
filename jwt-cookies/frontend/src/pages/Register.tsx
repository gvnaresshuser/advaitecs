import { useState } from "react";
import type React from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../auth/authService";
import { showError, showSuccess } from "../components/common/Alert";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      await registerUser({
        name,
        email,
        password,
      });

      showSuccess(
        "Registration Successful",
        "Your account has been created successfully.",
      );

      navigate("/login");
    } catch {
      showError(
        "Registration Failed",
        "Unable to create your account. Please check your details.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl shadow-lg backdrop-blur-sm">
            👤
          </div>

          <h1 className="text-3xl font-bold">Create Account</h1>

          <p className="mt-2 text-sm text-blue-100">
            Join our secure application
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Register</h2>

            <p className="mt-1 text-sm text-gray-500">
              Create your account to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  👤
                </span>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ✉️
                </span>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🔑
                </span>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating Account...
                </>
              ) : (
                <>
                  👤
                  <span className="ml-2">Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="px-3 text-xs text-gray-400">OR</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Security Information */}
        <div className="mt-5 text-center text-xs text-blue-100">
          🔒 Your account will be protected using HTTP-only cookies
        </div>
      </div>
    </div>
  );
};

export default Register;
