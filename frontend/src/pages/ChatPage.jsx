import React, { useState } from "react";
import ChatNavbar from "../components/ChatNavbar.jsx";
import Chatbar from "../components/Chatbar.jsx";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setMessage(""); // Clear input
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
    {/* Top Navbar */}
    <ChatNavbar />

    {/* Chat area */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-20 mt-16">
    {messages.map((msg, idx) => (
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
    ))}
    </div>

    {/* Chatbar at bottom */}
    <Chatbar
    message={message}
    setMessage={setMessage}
    onSendMessage={handleSendMessage}
    />
    </div>
  );
};

export default ChatPage;
