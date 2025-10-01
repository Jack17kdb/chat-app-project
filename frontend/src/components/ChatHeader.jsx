import React from "react";
import { UseChatStore } from "../store/ChatStore.js";
import { useAuthStore } from "../store/AuthStore.js";

const ChatHeader = () => {
    const { selectedUser } = UseChatStore();
    const { onlineUsers } = useAuthStore();

    if (!selectedUser) return null;

    const isOnline = onlineUsers?.includes(selectedUser._id);

    return (
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-900/60 backdrop-blur-sm border-b border-gray-700/30">
        {/* Avatar with online status */}
        <div className="relative">
        <img
        src={selectedUser.profilePic || "/avatar.jpeg"}
        alt={selectedUser.username}
        className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
        />
        {isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
        )}
        </div>

        {/* User details */}
        <div className="flex flex-col">
        <h2 className="text-base font-semibold text-white">
        {selectedUser.username}
        </h2>
        </div>
        </div>
    );
};

export default ChatHeader;
