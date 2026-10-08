import { useState } from "react";
import "./App.css";
import "./Custom.css";

import LoadingSpinner from "./components/common/LoadingSpinner";
import LoadingOverlay from "./components/common/LoadingOverlay";
import SaveButton from "./components/common/SaveButton";
import ToastProvider from "./components/common/ToastProvider";
import DeleteButton from "./components/common/DeleteButton";
import CreateUser from "./components/CreateUser";

import SaveButton2 from "./components/common/SaveButton2";
import SaveButton3 from "./components/common/SaveButton3";
import SaveButton4 from "./components/common/SaveButton4";
import SaveButton5 from "./components/common/SaveButton5";

import { showSuccessToast } from "./components/common/AppToast";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

import {
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
} from "lucide-react";

// npm install lucide-react react-hot-toast sweetalert2
// index.css → @import "tailwindcss"

function App() {
  const [loading, setLoading] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);
  const [loader4, setLoader4] = useState(false);
  const [loader5, setLoader5] = useState(false);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);

  const showGradientAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Great!",
      text: "Your profile has been updated successfully.",
      customClass: {
        popup: "gradient-swal-popup",
        title: "gradient-swal-title",
        htmlContainer: "gradient-swal-text",
        confirmButton: "gradient-swal-button",
      },
      buttonsStyling: false,
    });
  };

  const showWarningAlert = () => {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "Please review the information before continuing.",
      confirmButtonText: "OK",
      confirmButtonColor: "#f59e0b",
    });
  };

  const showInfoAlert = () => {
    Swal.fire({
      icon: "info",
      title: "Information",
      text: "Your profile was last updated 5 minutes ago.",
      confirmButtonText: "Got It",
      confirmButtonColor: "#2563eb",
    });
  };

  const handleSave1 = async () => {
    try {
      setLoading1(true);

      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });

      toast.success("Save Button 1 completed!");
    } finally {
      setLoading1(false);
    }
  };

  const handleSave2 = async () => {
    try {
      setLoading2(true);

      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });

      toast.success("Save Button 2 completed!");
    } finally {
      setLoading2(false);
    }
  };

  const handleSave3 = async () => {
    try {
      setLoading3(true);

      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });

      toast.success("Save Button 3 completed!");
    } finally {
      setLoading3(false);
    }
  };

  const handleSave4 = async () => {
    try {
      setLoading4(true);

      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });

      toast.success("Save Button 4 completed!");
    } finally {
      setLoading4(false);
    }
  };

  const handleSave5 = async () => {
    try {
      setLoading5(true);

      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });

      toast.success("Save Button 5 completed!");
    } finally {
      setLoading5(false);
    }
  };

  // --------------------------------------------------
  // SIMPLE TOAST
  // --------------------------------------------------

  const handleSave = async () => {
    try {
      setLoading(true);

      // Simulating API call
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });

      toast.success("User created successfully!");
    } catch (error) {
      toast.error("Unable to create user.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // SUCCESS ALERT
  // --------------------------------------------------

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "User created successfully.",
      confirmButtonText: "OK",
      confirmButtonColor: "#2563eb",
    });
  };

  // --------------------------------------------------
  // ERROR ALERT
  // --------------------------------------------------

  const showErrorAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: "Unable to save the user.",
      confirmButtonText: "OK",
      confirmButtonColor: "#dc2626",
    });
  };

  // --------------------------------------------------
  // VIEW
  // --------------------------------------------------

  const handleView = () => {
    Swal.fire({
      title: "User Details",
      html: `
        <div style="text-align:left">
          <p><strong>ID:</strong> 123</p>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john@example.com</p>
          <p><strong>Role:</strong> Administrator</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#2563eb",
    });
  };

  // --------------------------------------------------
  // EDIT
  // --------------------------------------------------

  const handleEdit = () => {
    Swal.fire({
      title: "Edit User",
      html: `
        <input
          id="swal-name"
          class="swal2-input"
          placeholder="Enter name"
          value="John Doe"
        />

        <input
          id="swal-email"
          class="swal2-input"
          placeholder="Enter email"
          value="john@example.com"
        />
      `,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",

      preConfirm: () => {
        const name = document.getElementById("swal-name").value;

        const email = document.getElementById("swal-email").value;

        if (!name || !email) {
          Swal.showValidationMessage("Please enter both name and email.");

          return false;
        }

        return {
          name,
          email,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("User updated successfully!");
      }
    });
  };

  // --------------------------------------------------
  // DELETE
  // --------------------------------------------------

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone.",
      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",

      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) {
      return;
    }

    // Simulating API call
    const toastId = toast.loading("Deleting user...");

    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });

    toast.success("User deleted successfully!", {
      id: toastId,
    });
  };

  return (
    <>
      {/* React Hot Toast */}
      <ToastProvider />

      <section id="center" className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* PAGE TITLE */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              React UI Feedback Demo
            </h1>

            <p className="mt-2 text-gray-500">
              Loading Indicators, Toast Notifications, SweetAlert2 and Lucide
              Icons
            </p>
          </div>

          {/* ----------------------------------------- */}
          {/* LOADING INDICATORS */}
          {/* ----------------------------------------- */}

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-bold text-gray-800">
              1. Loading Indicators
            </h2>

            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* 1. Loading Overlay */}
                <button
                  onClick={() => setLoading(true)}
                  className="rounded-lg bg-purple-600 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-purple-700"
                >
                  Show Loading Overlay
                </button>

                {/* 2. Blue Spinner */}
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-blue-700">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                  Blue Spinner
                </button>

                {/* 3. Green Dots */}
                <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-green-700">
                  <span className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white"></span>
                  </span>
                  Loading
                </button>

                {/* 4. Orange Pulse */}
                <button className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-orange-600">
                  <span className="h-5 w-5 animate-pulse rounded-full bg-white"></span>
                  Processing
                </button>

                {/* 5. Pink Ring */}
                <button className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-pink-700">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Please Wait
                </button>

                <div className="flex flex-wrap items-center gap-4">
                  {/* 1. Purple Overlay */}
                  <button
                    onClick={() => setLoader1((value) => !value)}
                    className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-purple-700"
                  >
                    {loader1 && (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    )}

                    {loader1 ? "Stop Overlay" : "Start Overlay"}
                  </button>

                  {/* 2. Blue Spinner */}
                  <button
                    onClick={() => setLoader2((value) => !value)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-blue-700"
                  >
                    {loader2 && (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    )}

                    {loader2 ? "Stop Spinner" : "Start Spinner"}
                  </button>

                  {/* 3. Green Dots */}
                  <button
                    onClick={() => setLoader3((value) => !value)}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-green-700"
                  >
                    {loader3 && (
                      <span className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white" />
                      </span>
                    )}

                    {loader3 ? "Stop Dots" : "Start Dots"}
                  </button>

                  {/* 4. Orange Pulse */}
                  <button
                    onClick={() => setLoader4((value) => !value)}
                    className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-orange-600"
                  >
                    {loader4 && (
                      <span className="h-5 w-5 animate-pulse rounded-full bg-white" />
                    )}

                    {loader4 ? "Stop Pulse" : "Start Pulse"}
                  </button>

                  {/* 5. Pink Ring */}
                  <button
                    onClick={() => setLoader5((value) => !value)}
                    className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-pink-700"
                  >
                    {loader5 && (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    )}

                    {loader5 ? "Stop Ring" : "Start Ring"}
                  </button>
                </div>
              </div>

              <SaveButton onClick={handleSave} loading={loading} />
              <div className="flex flex-wrap gap-4">
                <SaveButton onClick={handleSave1} loading={loading1} />

                <SaveButton2 onClick={handleSave2} loading={loading2} />

                <SaveButton3 onClick={handleSave3} loading={loading3} />

                <SaveButton4 onClick={handleSave4} loading={loading4} />

                <SaveButton5 onClick={handleSave5} loading={loading5} />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-around gap-8">
              <LoadingSpinner message="Loading users..." />
              <LoadingSpinner type="refresh" message="Refreshing data..." />
              <LoadingSpinner type="loader" message="Loading users..." />
              <LoadingSpinner type="rotate" message="Processing..." />
            </div>
          </div>

          {/* ----------------------------------------- */}
          {/* TOAST NOTIFICATIONS */}
          {/* ----------------------------------------- */}

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-bold text-gray-800">
              2. Toast Notifications
            </h2>

            <div className="flex flex-wrap gap-3">
              {/* Custom Success Toast */}
              <button
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
                onClick={() => showSuccessToast("User saved successfully!")}
              >
                <CheckCircle size={18} />
                Custom Success Toast
              </button>

              {/* Simple Toast */}
              <button
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                onClick={handleSave}
              >
                Simple Toast
              </button>

              {/* Error Toast */}
              <button
                className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                onClick={() => toast.error("Unable to save the user.")}
              >
                Error Toast
              </button>

              {/* Warning Toast */}
              <button
                className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
                onClick={() =>
                  toast("Please check the entered information.", {
                    icon: (
                      <AlertTriangle size={20} className="text-orange-500" />
                    ),
                  })
                }
              >
                Warning Toast
              </button>

              {/* Info Toast */}
              <button
                className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
                onClick={() =>
                  toast("Your profile was updated 5 minutes ago.", {
                    icon: <Info size={20} className="text-blue-500" />,
                  })
                }
              >
                Info Toast
              </button>

              {/*  <button
                className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700"
                onClick={() =>
                  toast("User profile updated successfully!", {
                    className: "gradient-toast",
                    icon: "✨",
                    duration: 4000,
                  })
                }
              >
                Gradient Toast
              </button> */}
              <button
                className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700"
                onClick={() =>
                  toast("User profile updated successfully!", {
                    className: "gradient-toast",
                    icon: <Sparkles size={20} />,
                    duration: 4000,
                  })
                }
              >
                Gradient Toast
              </button>
            </div>
          </div>

          {/* ----------------------------------------- */}
          {/* SWEETALERT2 */}
          {/* ----------------------------------------- */}

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-bold text-gray-800">
              3. SweetAlert2
            </h2>

            <div className="flex flex-wrap gap-3">
              <div className="flex flex-wrap gap-3">
                {/* Success */}
                <button
                  onClick={showSuccessAlert}
                  className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
                >
                  Success Alert
                </button>

                {/* Error */}
                <button
                  onClick={showErrorAlert}
                  className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                >
                  Error Alert
                </button>

                {/* Warning */}
                <button
                  onClick={showWarningAlert}
                  className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
                >
                  Warning Alert
                </button>

                {/* Information */}
                <button
                  onClick={showInfoAlert}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Information Alert
                </button>

                {/* Delete */}
                <DeleteButton onClick={handleDelete} />
                <button
                  className="rounded-lg bg-pink-600 px-4 py-2 font-medium text-white hover:bg-pink-700"
                  onClick={showGradientAlert}
                >
                  Gradient SweetAlert
                </button>
              </div>
            </div>
          </div>

          {/* ----------------------------------------- */}
          {/* CRUD ACTION BUTTONS */}
          {/* ----------------------------------------- */}

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-bold text-gray-800">
              4. CRUD Action Buttons
            </h2>

            <div className="flex items-center gap-3">
              {/* View */}

              <button
                onClick={handleView}
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                <Eye size={18} />
                View
              </button>

              {/* Edit */}

              <button
                onClick={handleEdit}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                <Pencil size={18} />
                Edit
              </button>

              {/* Delete */}

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>

          {/* ----------------------------------------- */}
          {/* CREATE USER */}
          {/* ----------------------------------------- */}

          <CreateUser />
        </div>

        {/* LOADING OVERLAY */}

        {loading && (
          <LoadingOverlay
            message="Processing..."
            onClose={() => setLoading(false)}
          />
        )}
      </section>
    </>
  );
}

export default App;
