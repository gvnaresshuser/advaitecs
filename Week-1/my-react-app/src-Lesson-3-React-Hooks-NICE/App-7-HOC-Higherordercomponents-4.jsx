import React from "react";
import UserProfile from "./UserProfile";
import { withLoader } from "./withLoader";
import "./App.css";
const UserProfileWithLoader = withLoader(UserProfile, 3000);

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <UserProfileWithLoader name="Naressh" age={35} />
    </div>
  );
}
