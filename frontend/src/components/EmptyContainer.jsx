import React from "react";

const EmptyContainer = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-2xl font-semibold text-white mb-2">
        Select a friend to start chatting
        </h3>
        <p className="text-gray-400 text-lg">
        Choose a contact to begin your conversation 😊
        </p>
        </div>
        </div>
    );
};

export default EmptyContainer;
