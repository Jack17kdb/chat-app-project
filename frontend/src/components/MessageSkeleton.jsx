import React from "react";

const MessageSkeleton = () => {
    return (
        <div className="flex flex-col space-y-6 p-4">
        {/* Date separator skeleton */}
        <div className="flex justify-center">
        <div className="w-24 h-5 bg-gray-700 rounded-full animate-pulse"></div>
        </div>

        {/* Mixed incoming and outgoing messages */}
        {[...Array(8)].map((_, i) => {
            const isOutgoing = i % 3 === 0;

            return (
                <div
                key={i}
                className={`flex items-start gap-3 ${isOutgoing ? 'justify-end' : ''}`}
                >
                {/* Avatar skeleton (only for incoming messages) */}
                {!isOutgoing && (
                    <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
                )}

                {/* Message content skeleton */}
                <div className={`flex flex-col gap-2 max-w-xs ${isOutgoing ? 'items-end' : ''}`}>
                {/* Message bubble skeleton */}
                <div
                className={`rounded-2xl p-3 ${
                    isOutgoing
                    ? 'bg-cyan-600/50 rounded-br-md'
                    : 'bg-gray-700 rounded-bl-md'
                } animate-pulse`}
                >
                <div className="space-y-2">
                <div className={`h-3 bg-gray-600 rounded ${isOutgoing ? 'w-48' : 'w-56'}`}></div>
                <div className={`h-3 bg-gray-600 rounded ${isOutgoing ? 'w-32' : 'w-40'}`}></div>
                {i % 2 === 0 && (
                    <div className={`h-3 bg-gray-600 rounded ${isOutgoing ? 'w-24' : 'w-36'}`}></div>
                )}
                </div>
                </div>

                {/* Timestamp skeleton */}
                <div className={`h-2 w-16 bg-gray-700 rounded animate-pulse ${isOutgoing ? 'ml-auto' : ''}`}></div>
                </div>

                {/* Avatar skeleton (only for outgoing messages) */}
                {isOutgoing && (
                    <div className="w-10 h-10 rounded-full bg-cyan-600/50 animate-pulse"></div>
                )}
                </div>
            );
        })}
        </div>
    );
};

export default MessageSkeleton;
