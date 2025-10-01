import React from "react";
import { UseChatStore } from "../store/ChatStore.js";

const ChatContainer = ({ messages }) => {
    const { selectedUser } = UseChatStore();

    if (!selectedUser) return null; // safety

    return (
        <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4 mb-20 mt-16">
        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg shadow mb-4">
        <img
        src={selectedUser.avatar || "/avatar.jpeg"}
        alt={selectedUser.name}
        className="w-10 h-10 rounded-full object-cover"
        />
        <div>
        <p className="font-semibold text-white">{selectedUser.name}</p>
        <p
        className={`text-xs ${
            selectedUser.status === "online" ? "text-green-400" : "text-gray-400"
        }`}
        >
        {selectedUser.status}
        </p>
        </div>
        </div>

        {/* Messages */}
        {messages.length > 0 ? (
            messages.map((msg, idx) => (
                <div
                key={idx}
                className={`p-3 rounded-lg max-w-xs ${
                    msg.sender === "user"
                    ? "bg-cyan-500 text-gray-900 self-end ml-auto"
                    : "bg-gray-700 text-white"
                }`}
                >
                {msg.text}
                </div>
            ))
        ) : (
            <p className="text-gray-400 text-center mt-10">
            No messages yet. Start chatting with <span className="text-cyan-400">{selectedUser.name}</span> 💬
            </p>
        )}
        </div>
    );
};

export default ChatContainer;
