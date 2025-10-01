import React from "react";
import { Link } from "react-router-dom";
import { User, Settings, LogOut, MessageSquare } from "lucide-react";

const ChatNavbar = () => {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900/95 backdrop-blur-sm shadow-lg outline-none">
        {/* App title with icon */}
        <div className="flex items-center gap-2">
        <MessageSquare size={20} className="text-cyan-400" />
        <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Chat App
        </h1>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-2">
        <Link
        to="/profile"
        className="p-2 rounded-lg bg-gray-800/80 hover:bg-cyan-500 hover:text-gray-900 transition-all duration-300"
        title="Profile"
        >
        <User size={18} />
        </Link>

        <Link
        to="/settings"
        className="p-2 rounded-lg bg-gray-800/80 hover:bg-cyan-500 hover:text-gray-900 transition-all duration-300"
        title="Settings"
        >
        <Settings size={18} />
        </Link>

        <Link
        to="/logout"
        className="p-2 rounded-lg bg-gray-800/80 hover:bg-red-500 hover:text-gray-900 transition-all duration-300"
        title="Logout"
        >
        <LogOut size={18} />
        </Link>
        </div>
        </div>
    );
};

export default ChatNavbar;
