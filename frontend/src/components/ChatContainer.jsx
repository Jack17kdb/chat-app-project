import React, { useEffect } from "react";
import { UseChatStore } from "../store/ChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageSkeleton from "./MessageSkeleton.jsx";

const ChatContainer = () => {
    const { selectedUser, messages, getMessages, isMessagesLoading } = UseChatStore();

    useEffect(() => {
        getMessages(selectedUser._id);
    }, [selectedUser._id, getMessages]);

    if(isMessagesLoading)
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
            </div>
        )

    return (
        <ChatHeader />
    );
};

export default ChatContainer;
