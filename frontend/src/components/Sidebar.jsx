import React, { useEffect, useState } from "react";
import { UseChatStore } from "../store/ChatStore.js";
import SidebarSkeleton from "./SidebarSkeleton.jsx";
import { useAuthStore } from "../store/AuthStore.js";

const Sidebar = () => {
  const { getUsers, users, selectedUser, isUsersLoading, setSelectedUser } =
    UseChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-gray-900/50 p-3 flex flex-col relative">
      {/* Right gradient divider */}
      <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-purple-600/50"></div>

      {/* Header */}
      <div className="flex-shrink-0 mb-3">
        <h2 className="text-md font-semibold text-cyan-400 mb-2">Chats</h2>

        {/* ✅ Search input */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-1.5 text-sm bg-gray-800 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Users list */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1.5">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const isOnline = onlineUsers.includes(user._id);

              return (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedUser?._id === user._id
                      ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-md"
                      : "hover:bg-gray-800/50 text-gray-200"
                  }`}
                >
                  {/* Avatar with online circle */}
                  <div
                    className={`rounded-full p-[1.5px] ${
                      isOnline
                        ? "border-2 border-green-400"
                        : "border-2 border-gray-600"
                    }`}
                  >
                    <img
                      src={user.profilePic || "/avatar.jpeg"}
                      alt={user.username}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  </div>

                  {/* Name + Status */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-white text-sm">
                      {user.username}
                    </p>
                    <p
                      className={`text-[11px] font-medium ${
                        isOnline ? "text-green-400" : "text-gray-400"
                      }`}
                    >
                      {isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm text-center mt-4">
              No users found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
