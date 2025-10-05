import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/AuthStore.js';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const { isLogginIn, login } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!userData.email.trim()) return toast.error("Enter your email");
        if (!emailRegex.test(userData.email))return toast.error("Please enter a valid email address");
        if (!userData.password.trim()) return toast.error("Enter your password");

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = validateForm()
        if(success === true) login(userData);
        navigate("/");
    }

    const toggleShow = () => {
        setShowPassword(prev => !prev);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4">
            <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">

                {/* Title */}
                <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">
                    Welcome Back
                </h2>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm text-gray-300">
                            Email
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value = {userData.email}
                                onChange={(e) => setUserData({...userData, email: e.target.value})}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm text-gray-300">
                            Password
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                value = {userData.password}
                                onChange={(e) => setUserData({...userData, password: e.target.value})}
                                className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
                            />
                            {showPassword ? (
                                <FiEyeOff 
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" 
                                    onClick={toggleShow} 
                                />
                            ) : (
                                <FiEye 
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" 
                                    onClick={toggleShow} 
                                />
                            )}
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:scale-[1.02] active:scale-[0.98] transition duration-300 cursor-pointer"
                    >
                        {isLogginIn ? "Logging in ..." : "Login"}
                    </button>
                </form>

                {/* Links */}
                <div className="flex justify-between mt-6 text-sm text-gray-400">
                    <a href="/forgot-password" className="hover:text-cyan-400 transition">
                        Forgot Password?
                    </a>
                    <a href="/register" className="hover:text-purple-400 transition">
                        Register
                    </a>
                </div>

                {/* Footer */}
                <footer className="mt-8 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">MyChatApp (Justin)</span>. All rights reserved.
                </footer>
            </div>
        </div>
    )
}

export default Login
