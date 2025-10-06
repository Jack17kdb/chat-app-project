import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuthStore } from "../store/AuthStore.js";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { isSigningIn, signup } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.username.trim()) return toast.error("username is required");
    if (!userData.email.trim()) return toast.error("email is required");
    if (!emailRegex.test(userData.email))
      return toast.error("Please enter a valid email address");
    if (!userData.password.trim()) return toast.error("password is required");
    if (userData.password.trim().length < 6)
      return toast.error("password length should not be less than 6");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(userData);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Create Account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* userName */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Username</label>
            <div className="relative">
              <FiUser
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="name"
                value={userData.username}
                placeholder="Enter your username"
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <div className="relative">
              <FiMail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <div className="relative">
              <FiLock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-cyan-400 transition"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="cursor-pointer hover:scale-98 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:scale-[1.02] active:scale-[0.98] transition duration-300"
          >
            {isSigningIn ? "Creating account ...." : "Create Account"}
          </button>
        </form>

        {/* Already have an account */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-cyan-400 font-medium hover:underline"
          >
            Sign in
          </a>
        </p>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
            MyChatApp (Justin)
          </span>
          . All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Register;
