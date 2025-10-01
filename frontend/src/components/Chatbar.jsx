import React, { useState } from "react";
import { Send, Plus, Smile, Bot } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const Chatbar = ({ message, setMessage, onSendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiData) => {
        setMessage((prev) => prev + emojiData.emoji); // Append emoji
        setShowEmojiPicker(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSendMessage();
        }
    };

    return (
        <div className="flex items-center gap-3 p-3 fixed bottom-0 w-full bg-gray-900/95 border-t border-gray-700">
        {/* + Button */}
        <button
        type="button"
        className="p-2 rounded-lg bg-gray-800 hover:bg-cyan-500 hover:text-gray-900 transition"
        title="Add media"
        >
        <Plus size={20} />
        </button>

        {/* Emoji Button */}
        <div className="relative">
        <button
        type="button"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className="p-2 rounded-lg bg-gray-800 hover:bg-cyan-500 hover:text-gray-900 transition"
        title="Add emoji"
        >
        <Smile size={20} />
        </button>
        {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
        )}
        </div>

        {/* AI Suggestions Button */}
        <button
        type="button"
        className="p-2 rounded-lg bg-gray-800 hover:bg-cyan-500 hover:text-gray-900 transition"
        title="AI reply suggestions"
        >
        <Bot size={20} />
        </button>

        {/* Input */}
        <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-cyan-400 focus:ring focus:ring-cyan-500/40 outline-none"
        />

        {/* Send button - only when typing */}
        {message.trim() && (
            <button
            type="button"
            onClick={onSendMessage}
            className="p-3 bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold rounded-full shadow transition"
            title="Send"
            >
            <Send size={20} />
            </button>
        )}
        </div>
    );
};

export default Chatbar;
