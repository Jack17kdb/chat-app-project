import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.js"
import { User, Settings, LogOut, MessageSquare } from "lucide-react";

const ChatNavbar = () => {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch {
            navigate("login");
        }
    }

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900/90 backdrop-blur-sm shadow-xl border-b border-gray-700/50">
        {/* App title with icon */}
        <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl shadow-lg">
        <MessageSquare size={20} className="text-white" />
        </div>
        <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        ChitChat
        </h1>
        </div>

        {/* Navigation buttons with labels */}
        <div className="flex items-center gap-4">
        {/* Profile Button */}
        <Link
        to="/profile"
        className="group relative flex items-center gap-2 px-2 py-2 rounded-xl bg-gray-800/80 hover:bg-cyan-500 hover:text-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
        title="Profile"
        >
        <User size={16} />
        <span className="text-sm font-medium opacity-70 transition-opacity duration-300 whitespace-nowrap">
        Profile
        </span>
        </Link>

        {/* Settings Button */}
        <Link
        to="/settings"
        className="group relative flex items-center gap-2 px-2 py-2 rounded-xl bg-gray-800/80 hover:bg-cyan-500 hover:text-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
        title="Settings"
        >
        <Settings size={16} />
        <span className="text-sm font-medium opacity-70 transition-opacity duration-300 whitespace-nowrap">
        Settings
        </span>
        </Link>

        {/* Logout Button */}
        <button
        onClick={handleLogout}
        className="group relative flex items-center gap-2 px-2 py-2 rounded-xl bg-gray-800/80 hover:bg-red-500 hover:text-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 cursor-pointer active:scale-95"
        title="Logout"
        >
        <LogOut size={16} />
        <span className="text-sm font-medium opacity-70 transition-opacity duration-300 whitespace-nowrap">
        Logout
        </span>
        </button>
        </div>
        </div>
    );
};

export default ChatNavbar;
