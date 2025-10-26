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
  const messageRefs = useRef({});
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState("");
  const [glowingMessage, setGlowingMessage] = useState(null);

  const getReplyToId = (replyTo) => {
    return typeof replyTo === 'string' ? replyTo : replyTo?._id;
  };

  const getReplySenderName = (replyTo, messages, authUser, selectedUser) => {
    if (!replyTo) return "Unknown user";

    if (typeof replyTo === 'object' && replyTo.senderId) {
      const senderId = typeof replyTo.senderId === 'string'
        ? replyTo.senderId
        : replyTo.senderId._id;
      return senderId === authUser?._id ? "You" : selectedUser.username;
    }

    const originalMessage = messages.find(m => m._id === replyTo || m.id === replyTo);
    if (originalMessage) {
      const originalSender = originalMessage.senderId || originalMessage.sender;
      return originalSender === authUser?._id ? "You" : selectedUser.username;
    }

    return "Unknown user";
  };

  const getReplyText = (replyTo, messages) => {
    if (!replyTo) return "Original message";

    if (typeof replyTo === 'object') {
      return replyTo.text || replyTo.content || "Original message";
    }

    const originalMessage = messages.find(m => m._id === replyTo || m.id === replyTo);
    return originalMessage?.text || originalMessage?.content || "Original message";
  };

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

  const scrollToMessage = (id) => {
    const messageId = typeof id === 'string' ? id : id?._id || id?.id;

    if (!messageId) return;

    const ref = messageRefs.current[messageId];
    if (ref && ref.scrollIntoView) {
      ref.scrollIntoView({ behavior: "smooth", block: "center" });

      setGlowingMessage(messageId);
      setTimeout(() => setGlowingMessage(null), 2000);
    }
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

      {replyingTo && (
        <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>Replying to:</span>
            <span className="text-purple-400 max-w-[300px] truncate">
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
                const isGlowing = glowingMessage === messageId;

                return (
                  <div
                    key={messageId}
                    ref={(el) => (messageRefs.current[messageId] = el)}
                    className={`flex gap-3 group ${
                      isMyMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isMyMessage && (
                      <div className="flex-shrink-0">
                        <img
                          src={selectedUser.profilePic || "/avatar.jpeg"}
                          alt={selectedUser.username}
                          className="w-8 h-8 rounded-full object-cover border border-gray-600"
                        />
                      </div>
                    )}

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
                        className={`relative px-4 py-3 rounded-2xl min-w-[80px] transition-all duration-300 ${
                          isMyMessage
                            ? "bg-gradient-to-br from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white rounded-br-md border border-purple-600/30"
                            : "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-bl-md border border-gray-600/30"
                        } ${message.isDeleted ? "bg-gray-600 italic" : ""} ${
                          isGlowing
                            ? isMyMessage
                              ? "ring-2 ring-purple-400 shadow-lg shadow-purple-500/30"
                              : "ring-2 ring-gray-400 shadow-lg shadow-gray-500/30"
                            : ""
                        }`}
                      >
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-400"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveEdit();
                                if (e.key === "Escape") handleCancelEdit();
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
                            {message.replyTo && (
                              <div
                                className="mb-2 p-2 rounded-lg border-l-4 bg-gray-900/70 border-purple-500 cursor-pointer hover:bg-gray-800 transition"
                                onClick={() => scrollToMessage(getReplyToId(message.replyTo))}
                              >
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="text-purple-400">↳</span>
                                  <span className="text-gray-100 font-semibold">
                                    {getReplySenderName(message.replyTo, messages, authUser, selectedUser)}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-300 mt-1 truncate">
                                  {getReplyText(message.replyTo, messages)}
                                </p>
                              </div>
                            )}

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

                            {!messageImage && (
                              <p
                                className={`text-sm leading-relaxed ${
                                  message.isDeleted
                                    ? "text-gray-400 italic"
                                    : ""
                                }`}
                              >
                                {message.isDeleted
                                  ? "This message was deleted"
                                  : messageText}
                              </p>
                            )}

                            {message.isEdited && !message.isDeleted && (
                              <span className="text-xs text-gray-300 ml-2">
                                (edited)
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      <span className="text-xs text-gray-500 mt-1 mx-2">
                        {message.createdAt
                          ? new Date(message.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Just now"}
                      </span>
                    </div>

                    {!message.isDeleted && (
                      <div
                        className={`flex items-center ${
                          isMyMessage ? "order-1" : ""
                        }`}
                      >
                        <MessageOptionsMenu
                          message={message}
                          isOwnMessage={isMyMessage}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onReply={handleReply}
                        />
                      </div>
                    )}

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
            <div ref={scrollToEnd} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
