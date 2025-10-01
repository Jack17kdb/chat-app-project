import React, { useEffect } from "react";
import { UseChatStore } from "../store/ChatStore.js";
import SidebarSkeleton from "./SidebarSkeleton.jsx";
import { useAuthStore } from '../store/AuthStore.js';

const Sidebar = () => {
    const { getUsers, users, selectedUser, isUsersLoading, setSelectedUser } = UseChatStore();
    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <div className="h-full bg-gray-900/50 p-4 flex flex-col relative">
        {/* Gradient divider - positioned on the right edge */}
        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-purple-600/50"></div>

        {/* Header */}
        <div className="flex-shrink-0 mb-6">
        <h2 className="text-lg font-semibold text-cyan-400">Chats</h2>
        </div>

        {/* Users list */}
        <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
        {users.map((user) => (
            <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                selectedUser?._id === user._id
                ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg"
                : "hover:bg-gray-800/60 text-gray-200"
            }`}
            >
            {/* Avatar */}
            <div className="relative">
            <img
            src={user.profilePic || "/avatar.jpeg"}
            alt={user.username}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
            />
            {user.status === "online" && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
            )}
            </div>

            {/* Name + Status */}
            <div className="flex-1 min-w-0">
            <p className="font-semibold truncate text-white">{user.username}</p>
            <p
            className={`text-xs font-medium ${
                user.status === "online"
                ? "text-green-400"
                : "text-gray-400"
            }`}
            >
            {user.status === "online" ? "Online" : "Offline"}
            </p>
            </div>
            </div>
        ))}
        </div>
        </div>
        </div>
    );
};

export default Sidebar;
