import React from "react";
import { Link } from "react-router-dom";
import { User, Settings, LogOut, MessageSquare } from "lucide-react";

const ChatNavbar = () => {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900/95 border-b border-gray-700 fixed top-0 w-full z-50">
        {/* App title with icon */}
        <div className="flex items-center gap-2">
        <MessageSquare size={24} className="text-cyan-400" />
        <h1 className="text-xl font-bold">Chat App</h1>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3">
        <Link
        to="/profile"
        className="p-2 rounded-lg bg-gray-800 hover:bg-cyan-500 hover:text-gray-900 transition"
        title="Profile"
        >
        <User size={20} />
        </Link>

        <Link
        to="/settings"
        className="p-2 rounded-lg bg-gray-800 hover:bg-cyan-500 hover:text-gray-900 transition"
        title="Settings"
        >
        <Settings size={20} />
        </Link>

        <Link
        to="/logout"
        className="p-2 rounded-lg bg-gray-800 hover:bg-red-500 hover:text-gray-900 transition"
        title="Logout"
        >
        <LogOut size={20} />
        </Link>
        </div>
        </div>
    );
};

export default ChatNavbar;
