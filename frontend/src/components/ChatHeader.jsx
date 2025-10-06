import React from "react";
import { UseChatStore } from "../store/ChatStore.js";
import { useAuthStore } from "../store/AuthStore.js";

const ChatHeader = () => {
  const { selectedUser } = UseChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers?.includes(selectedUser._id);

  return (
    <div className="flex items-center gap-2.5 px-3 py-2 bg-gray-900/60 backdrop-blur-sm border-b border-gray-700/30">
      {/* ✅ Avatar with green border if online */}
      <div
        className={`rounded-full p-[1.5px] ${
          isOnline ? "border-2 border-green-400" : "border-2 border-gray-600"
        }`}
      >
        <img
          src={selectedUser.profilePic || "/avatar.jpeg"}
          alt={selectedUser.username}
          className="w-9 h-9 rounded-full object-cover"
        />
      </div>

      {/* ✅ Username only */}
      <h2 className="text-sm font-semibold text-white truncate">
        {selectedUser.username}
      </h2>
    </div>
  );
};

export default ChatHeader;
