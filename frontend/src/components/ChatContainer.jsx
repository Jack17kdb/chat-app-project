import React, { useEffect, useRef, useState } from "react";
import { UseChatStore } from "../store/ChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageSkeleton from "./MessageSkeleton.jsx";
import { useAuthStore } from "../store/AuthStore.js";
import MessageOptionsMenu from "./MessageOptionsMenu.jsx";

const ChatContainer = ({ replyingTo, onReply, onCancelReply }) => {
  const {
    selectedUser,
    messages,
    getMessages,
    isMessagesLoading,
    subscribeMessages,
    unsubscribeMessages,
    editMessage,
    deleteMessage,
    deletedMessagesIds,
  } = UseChatStore();

  const { authUser } = useAuthStore();
  const scrollToEnd = useRef(null);

  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeMessages();
      return () => unsubscribeMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeMessages, unsubscribeMessages]);

  useEffect(() => {
    if (scrollToEnd.current && messages)
      scrollToEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Edit message handlers
  const handleEdit = (message) => {
    setEditingMessage(message);
    setEditText(message.text || message.content || "");
  };

  const handleSaveEdit = async () => {
    if (editText.trim() && editingMessage) {
      const messageId = editingMessage._id || editingMessage.id;
      await editMessage(messageId, editText);
      setEditingMessage(null);
      setEditText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditText("");
  };

  const handleDelete = async (messageId, deleteForEveryone = false) => {
    await deleteMessage(messageId, deleteForEveryone);
  };

  const handleReply = (message) => {
    onReply(message);
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
      </div>
    );
  }

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

      {/* Reply Preview */}
      {replyingTo && (
        <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>Replying to:</span>
            <span className="text-cyan-400 max-w-[300px] truncate">
              {replyingTo.text || replyingTo.content}
            </span>
          </div>
          <button
            onClick={onCancelReply}
            className="text-gray-400 hover:text-white p-1"
          >
            ×
          </button>
        </div>
      )}

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
              .filter((message) => {
                if (!message || typeof message !== "object") return false;

                const messageId = message._id || message.id;
                if (deletedMessagesIds?.includes(messageId)) return false;

                return true;
              })
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

                const isEditing = editingMessage?._id === message._id;

                return (
                  <div
                    key={messageId}
                    ref={scrollToEnd}
                    className={`flex gap-3 group ${
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
                        } ${message.isDeleted ? "bg-gray-600 italic" : ""}`}
                      >
                        {isEditing ? (

                          <div className="space-y-2">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEdit();
                                if (e.key === 'Escape') handleCancelEdit();
                              }}
                            />
                            <div className="flex gap-2 text-sm">
                              <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (

                          <>
                            {/* If message has image */}
                            {messageImage && !message.isDeleted && (
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
                            )}

                            {/* Message text */}
                            {!messageImage && (
                              <p className={`text-sm leading-relaxed ${
                                message.isDeleted ? "text-gray-400 italic" : ""
                              }`}>
                                {message.isDeleted ? "This message was deleted" : messageText}
                              </p>
                            )}

                            {/* Edited indicator */}
                            {message.isEdited && !message.isDeleted && (
                              <span className="text-xs text-gray-300 ml-2">
                                (edited)
                              </span>
                            )}
                          </>
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

                    {/* Message Options Menu - Show for ALL messages (not deleted) */}
                    {!message.isDeleted && (
                      <div className={`flex items-center ${isMyMessage ? "order-1" : ""}`}>
                        <MessageOptionsMenu
                          message={message}
                          isOwnMessage={isMyMessage}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onReply={handleReply}
                        />
                      </div>
                    )}

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

            {/* New Message Being Composed with Reply Preview */}
            {replyingTo && (
              <div className={`flex gap-3 ${true ? "justify-end" : "justify-start"}`}>
                {/* Message Bubble */}
                <div className={`flex flex-col items-end max-w-[70%]`}>
                  <div className="relative px-4 py-3 rounded-2xl bg-cyan-500 text-white rounded-br-md opacity-80">
                    {/* Reply Preview */}
                    <div className="mb-2 p-2 rounded-lg border-l-4 bg-cyan-600/30 border-cyan-400">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-cyan-300">↳</span>
                        <span className="text-gray-300 font-medium">
                          {replyingTo.senderId === authUser?._id ? 'You' : selectedUser.username}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {replyingTo.isDeleted
                          ? "This message was deleted"
                          : (replyingTo.text || replyingTo.content)
                        }
                      </p>
                    </div>

                    {/* Your reply text will appear here when sent */}
                    <p className="text-sm leading-relaxed italic text-gray-300">
                      Type your reply below...
                    </p>
                  </div>

                  {/* Timestamp */}
                  <span className="text-xs text-gray-500 mt-1 mx-2">
                    Sending...
                  </span>
                </div>

                {/* Your Avatar */}
                {authUser && (
                  <div className="flex-shrink-0">
                    <img
                      src={authUser.profilePic || "/avatar.jpeg"}
                      alt={authUser.username || "You"}
                      className="w-8 h-8 rounded-full object-cover border border-gray-600"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
