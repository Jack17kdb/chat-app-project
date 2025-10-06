import React, { useState } from "react";
import { Camera, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/AuthStore.js";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, profileUpdate, onlineUsers } =
    useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageSubmit = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64image = reader.result;
      setSelectedImg(base64image);
      await profileUpdate({ profilePic: base64image });
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-6">
      {/* Profile Card */}
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
          Your Profile
        </h1>

        {/* Avatar with Camera Icon */}
        <div className="flex justify-center mb-4 relative">
          <img
            src={authUser.profilePic || selectedImg || "/avatar.jpeg"}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-lg object-cover"
          />
          <label
            htmlFor="profile-pic"
            className="absolute bottom-0 right-[35%] bg-cyan-600 p-2 rounded-full cursor-pointer hover:bg-cyan-500 transition"
          >
            <Camera size={18} />
          </label>
          <input
            type="file"
            id="profile-pic"
            accept="image/*"
            className="hidden"
            onChange={handleImageSubmit}
          />
        </div>

        {/* Update Profile Text */}
        <p className="text-center text-sm text-gray-400 mb-8">
          {isUpdatingProfile
            ? "Updating profile..."
            : "Click the camera to update your profile"}
        </p>

        {/* User Info in styled rows */}
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg border border-gray-700 shadow-sm">
            <span className="font-semibold text-cyan-400">Username</span>
            <span className="text-gray-300">{authUser?.username}</span>
          </div>

          <div className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg border border-gray-700 shadow-sm">
            <span className="font-semibold text-cyan-400">Email</span>
            <span className="text-gray-300">{authUser?.email}</span>
          </div>

          <div className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg border border-gray-700 shadow-sm">
            <span className="font-semibold text-cyan-400">Status</span>
            <span className="text-green-400 font-semibold">
              {onlineUsers.includes(authUser._id) ? "Online" : "Offline"}
            </span>
          </div>

          <div className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg border border-gray-700 shadow-sm">
            <span className="font-semibold text-cyan-400">Member Since</span>
            <span className="text-gray-300">
              {authUser.createdAt?.split("T")[0]}
            </span>
          </div>

          {/* Back to Chat row */}
          <Link
            to="/"
            className="flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-gray-900 font-semibold px-4 py-3 rounded-lg border border-gray-700 shadow-sm transition"
          >
            <ArrowLeft size={18} />
            Back to Chat
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} MyChatApp (Justin). All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default ProfilePage;
