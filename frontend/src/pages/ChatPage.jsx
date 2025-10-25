import React, { useState, useEffect } from "react";
import { UseChatStore } from "../store/ChatStore.js";
import { useAuthStore } from "../store/AuthStore.js";
import ChatNavbar from "../components/ChatNavbar.jsx";
import Chatbar from "../components/Chatbar.jsx";
import EmptyContainer from "../components/EmptyContainer.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import toast from "react-hot-toast";

const ChatPage = () => {
  const { selectedUser, setSelectedUser } = UseChatStore();
  const { authUser } = useAuthStore();

  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    setSelectedUser(null);
  }, []);

  useEffect(() => {
    setReplyingTo(null);
  }, [selectedUser]);

  const handleReply = (message) => {
    setReplyingTo(message);
  };

  const cancelReply = () => {
    setReplyingTo(null);
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
              {/* Verification Banner for unverified users */}
              {!authUser?.isVerified && (
                <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-300 p-3 text-center text-sm">
                  ⚠️ Please verify your email to send messages
                </div>
              )}

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto">
                <ChatContainer
                  replyingTo={replyingTo}
                  onReply={handleReply}
                  onCancelReply={cancelReply}
                />
              </div>

              {/* Chat input */}
              {authUser?.isVerified && (
                <div className="flex-shrink-0">
                  <Chatbar
                    replyingTo={replyingTo}
                    onCancelReply={cancelReply}
                  />
                </div>
              )}
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
