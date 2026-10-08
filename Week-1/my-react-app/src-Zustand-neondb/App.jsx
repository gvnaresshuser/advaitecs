import { useState } from "react";

import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

// npm install zustand

function App() {
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl font-bold text-white">
            User Management System
          </h1>

          <p className="mt-1 text-center text-sm text-blue-100">
            React + Zustand + Express + PostgreSQL
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Add / Edit User */}
        <UserForm
          editingUser={editingUser}
          onCancelEdit={() => setEditingUser(null)}
        />

        {/* Divider */}
        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-300"></div>

          <span className="text-sm font-medium text-gray-400">
            USER LIST
          </span>

          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        {/* User List */}
        <UserList
          onEdit={(user) => setEditingUser(user)}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-5">
        <p className="text-center text-sm text-gray-500">
          User Management System © 2026
        </p>
      </footer>
    </div>
  );
}

export default App;

