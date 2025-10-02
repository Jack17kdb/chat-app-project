import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="w-64 h-full bg-gray-900 border-r border-gray-700 p-4 flex flex-col">
      <h2 className="text-lg font-semibold text-white mb-4">Chats</h2>

      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-lg animate-pulse"
          >
            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
            <div className="flex-1 space-y-2">
              <div className="w-24 h-3 bg-gray-700 rounded"></div>
              <div className="w-16 h-2 bg-gray-800 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSkeleton;
