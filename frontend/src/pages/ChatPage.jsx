import React, { useState } from "react";
import { UseChatStore } from "../store/ChatStore.js";
import ChatNavbar from "../components/ChatNavbar.jsx";
import Chatbar from "../components/Chatbar.jsx";
import EmptyContainer from "../components/EmptyContainer.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import Sidebar from "../components/Sidebar.jsx";

const ChatPage = () => {
  const { selectedUser } = UseChatStore();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-white">
    {/* Top Navbar - Full width */}
    <div className="flex-shrink-0">
    <ChatNavbar />
    </div>

    {/* Main content area below navbar */}
    <div className="flex-1 flex min-h-0">
    {/* Sidebar on the left */}
    <div className="w-64 h-full">
    <Sidebar />
    </div>

    {/* Right side - chat content area */}
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-gray-800/40 via-purple-900/15 to-gray-900/40">
    {selectedUser ? (
      <>
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto">
      <ChatContainer />
      </div>
      {/* Chat input */}
      <div className="flex-shrink-0">
      <Chatbar
      message={message}
      setMessage={setMessage}
      onSendMessage={handleSendMessage}
      />
      </div>
      </>
    ) : (
      <div className="flex-1 flex items-center justify-center">
      <EmptyContainer />
      </div>
    )}
    </div>
    </div>
    </div>
  );
};

export default ChatPage;
