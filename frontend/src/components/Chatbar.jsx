import React, { useState, useRef } from "react";
import { Camera, Send, Plus, Smile, Bot, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { UseChatStore } from "../store/ChatStore.js";

const Chatbar = () => {
    const { sendMessages } = UseChatStore();
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleEmojiClick = (emojiData) => {
        setMessage((prev) => prev + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() && !selectedImage) return;

        try {
            await sendMessages({
                text: message,
                image: selectedImage
            });

            setSelectedImage(null);
            setMessage("");
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch(error) {
            console.error("Failed to send message: ", error);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
            };

            reader.onerror = () => {
                toast.error("Failed to read file");
            }

            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col">
        {/* Image Preview */}
        {selectedImage && (
            <div className="relative p-3 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center gap-3">
            <div className="relative">
            <img
            src={selectedImage}
            alt="Preview"
            className="w-16 h-16 object-cover rounded-lg border border-gray-600"
            />
            <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 cursor-pointer p-1 bg-red-500 hover:bg-red-400 text-white rounded-full shadow transition"
            title="Remove image"
            >
            <X size={14} />
            </button>
            </div>
            <span className="text-sm text-gray-300">Image ready to send</span>
            </div>
            </div>
        )}
        <form onSubmit={handleSendMessage}>
        <div className="flex items-center gap-3 p-3 backdrop-blur-lg bg-gray-900/20 border-t border-gray-700">
        {/* Hidden file input */}
        <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
        />

        {/* Camera/Upload Button */}
        <button
        type="button"
        onClick={handleCameraClick}
        className="cursor-pointer active:scale-96 p-2 rounded-lg bg-gray-800 hover:bg-cyan-500 hover:text-gray-900 transition"
        title="Add media"
        >
        <Camera size={20} />
        </button>

        {/* Emoji Button */}
        <div className="relative">
        <button
        type="button"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className="cursor-pointer active:scale-96 p-2 rounded-lg bg-gray-800 hover:bg-cyan-500 hover:text-gray-900 transition"
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
        className="cursor-pointer active:scale-96 p-2 rounded-lg bg-gray-800 hover:bg-cyan-500 hover:text-gray-900 transition"
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

        {/* Send button - only when typing or when image is selected */}
        {(message.trim() || selectedImage) && (
            <button
            type="submit"
            className="cursor-pointer active:scale-96 p-3 bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold rounded-full shadow transition"
            title="Send"
            >
            <Send size={20} />
            </button>
        )}
        </div>
        </form>
        </div>
    );
};

export default Chatbar;
