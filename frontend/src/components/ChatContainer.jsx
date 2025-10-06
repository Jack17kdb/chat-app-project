import React, { useEffect, useRef } from "react";
import { UseChatStore } from "../store/ChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageSkeleton from "./MessageSkeleton.jsx";
import { useAuthStore } from "../store/AuthStore.js";

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    isMessagesLoading,
    subscribeMessages,
    unsubscribeMessages,
  } = UseChatStore();
  const { authUser } = useAuthStore();
  const scrollToEnd = useRef(null);

  // 🔹 Fetch & subscribe messages
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeMessages();
      return () => unsubscribeMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeMessages, unsubscribeMessages]);

  // 🔹 Auto-scroll
  useEffect(() => {
    if (scrollToEnd.current && messages)
      scrollToEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
      </div>
    );
  }

  // No user selected
  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex items-center justify-center text-gray-300">
          Select a user to start chatting
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader />

      {/* Messages Container */}
      <div className="flex-1 flex flex-col overflow-y-auto p-4 bg-transparent">
        {!messages || messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center text-gray-300 max-w-md mx-auto">
              <div className="text-4xl mb-3 opacity-60">👋</div>
              <p className="text-base font-medium mb-1">
                Start a conversation with {selectedUser.username}
              </p>
              <p className="text-sm text-gray-400">
                Send your first message to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages
              .filter((message) => message && typeof message === "object")
              .map((message) => {
                const senderId =
                  message.senderId || message.sender?._id || message.sender;

                const isMyMessage =
                  senderId === authUser?._id ||
                  senderId === authUser?.id ||
                  (typeof senderId === "string" &&
                    typeof authUser?._id === "string" &&
                    senderId.toString() === authUser._id.toString());

                const messageText = message.text || message.content || "";
                const messageImage = message.image || message.img || "";
                const messageId =
                  message._id ||
                  message.id ||
                  `msg-${Date.now()}-${Math.random()}`;

                return (
                  <div
                    key={messageId}
                    ref={scrollToEnd}
                    className={`flex gap-3 ${
                      isMyMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Receiver avatar */}
                    {!isMyMessage && (
                      <div className="flex-shrink-0">
                        <img
                          src={selectedUser.profilePic || "/avatar.jpeg"}
                          alt={selectedUser.username}
                          className="w-8 h-8 rounded-full object-cover border border-gray-600"
                        />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`flex flex-col ${
                        isMyMessage ? "items-end" : "items-start"
                      } max-w-[70%]`}
                    >
                      {!isMyMessage && (
                        <span className="text-xs text-gray-400 mb-1 ml-2">
                          {selectedUser.username}
                        </span>
                      )}

                      <div
                        className={`relative px-4 py-3 rounded-2xl ${
                          isMyMessage
                            ? "bg-cyan-500 text-white rounded-br-md"
                            : "bg-gray-700 text-white rounded-bl-md"
                        }`}
                      >
                        {/* If message has image */}
                        {messageImage ? (
                          <div className="flex flex-col gap-2">
                            <img
                              src={messageImage}
                              alt="Shared"
                              className="max-w-full max-h-64 rounded-lg object-cover"
                            />
                            {messageText && (
                              <p className="text-sm leading-relaxed mt-2">
                                {messageText}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">
                            {messageText}
                          </p>
                        )}
                      </div>

                      {/* Timestamp */}
                      <span className="text-xs text-gray-500 mt-1 mx-2">
                        {message.createdAt
                          ? new Date(message.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Just now"}
                      </span>
                    </div>

                    {/* My Avatar */}
                    {isMyMessage && authUser && (
                      <div className="flex-shrink-0">
                        <img
                          src={authUser.profilePic || "/avatar.jpeg"}
                          alt={authUser.username || "You"}
                          className="w-8 h-8 rounded-full object-cover border border-gray-600"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
