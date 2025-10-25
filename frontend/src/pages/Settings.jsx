import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.js";

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("username");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { changeUsername, changeEmail, changePassword, deleteAccount } =
  useAuthStore();

  const handleUsernameUpdate = async () => {
    if (!username.trim()) return;
    await changeUsername(username);
    setUsername("");
  };

  const handleEmailUpdate = async () => {
    if (!email.trim()) return;
    await changeEmail(email);
    setEmail("");
  };

  const handlePasswordUpdate = async () => {
    await changePassword({ currentPassword, newPassword, confirmPassword });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = async () => {
    await deleteAccount();
    navigate("/login");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "username":
        return (
          <div>
          <h2 className="text-xl font-bold text-cyan-400 mb-4 text-center">
          Change Username
          </h2>
          <input
          type="text"
          placeholder="Enter new username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
          onClick={handleUsernameUpdate}
          className="cursor-pointer active:scale-98 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 rounded-lg transition"
          >
          Update Username
          </button>
          </div>
        );

      case "email":
        return (
          <div>
          <h2 className="text-xl font-bold text-cyan-400 mb-4 text-center">
          Change Email
          </h2>
          <input
          type="email"
          placeholder="Enter new email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
          onClick={handleEmailUpdate}
          className="cursor-pointer active:scale-98 w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded-lg transition"
          >
          Update Email
          </button>
          </div>
        );

      case "password":
        return (
          <div>
          <h2 className="text-xl font-bold text-cyan-400 mb-4 text-center">
          Change Password
          </h2>
          <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
          onClick={handlePasswordUpdate}
          className="cursor-pointer active:scale-98 w-full bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg transition"
          >
          Update Password
          </button>
          </div>
        );

      case "delete":
        return (
          <div>
          <h2 className="text-xl font-bold text-red-500 mb-4 text-center">
          Delete Account
          </h2>
          <p className="text-gray-400 text-center mb-6">
          This action is{" "}
          <span className="text-red-400 font-semibold">permanent</span> and
          cannot be undone.
          </p>
          <button
          onClick={handleDeleteAccount}
          className="cursor-pointer active:scale-98 w-full bg-red-700 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
          >
          Delete Account
          </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-6">
    <div className="w-full max-w-3xl bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700">
    <h1 className="text-3xl font-bold text-center text-cyan-400 mb-20">
    Account Settings
    </h1>

    <div className="flex flex-col md:flex-row gap-6 mb-4">
    <div className="flex flex-col w-full md:w-1/3 space-y-3">
    {[
      { id: "username", label: "Change Username", color: "cyan" },
      { id: "email", label: "Change Email", color: "green" },
      { id: "password", label: "Change Password", color: "yellow" },
      { id: "delete", label: "Delete Account", color: "red" },
    ].map((tab) => (
      <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`cursor-pointer active:scale-98 p-3 rounded-lg font-medium border border-gray-700 transition ${
        activeTab === tab.id
        ? `bg-${tab.color}-600 text-white`
        : "bg-gray-800 hover:bg-gray-700 text-gray-300"
      }`}
      >
      {tab.label}
      </button>
    ))}
    </div>

    <div className="flex-1">{renderTab()}</div>
    </div>

    {/* Back to Chat button */}
    <Link
    to="/"
    className="flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-gray-900 font-semibold px-4 py-3 rounded-lg border border-gray-700 shadow-sm transition mt-10"
    >
    <ArrowLeft size={18} />
    Back to Chat
    </Link>

    <footer className="mt-8 text-center text-xs text-gray-500">
    © {new Date().getFullYear()} MyChatApp (Justin). All rights reserved.
    </footer>
    </div>
    </div>
  );
};

export default Settings;
