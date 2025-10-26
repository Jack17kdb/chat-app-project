import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit2, Trash2, Reply } from "lucide-react";

const MessageOptionsMenu = ({
  message,
  isOwnMessage,
  onEdit,
  onDelete,
  onReply,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const canEdit = isOwnMessage && !message.isEdited && !message.isDeleted;
  const canDelete = isOwnMessage && !message.isDeleted;

  const handleDelete = (deleteForEveryone) => {
    onDelete(message._id, deleteForEveryone);
    setShowDeleteConfirm(false);
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 hover:bg-gray-600/50 rounded-full transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100"
        title="Message options"
        aria-label="Message options"
      >
        <MoreVertical className="w-5 h-5 text-gray-300 hover:text-white" />
      </button>

      {showMenu && (
        <div
          ref={menuRef}
          className="absolute right-0 bottom-full mb-1 bg-gray-700 rounded-lg shadow-lg py-2 min-w-[180px] z-50 border border-gray-600"
        >
          <button
            onClick={() => {
              onReply(message);
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-600 flex items-center gap-2"
          >
            <Reply className="w-4 h-4" />
            Reply
          </button>

          {canEdit && (
            <button
              onClick={() => {
                onEdit(message);
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-600 flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}

          {canDelete && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full px-4 py-2 text-left hover:bg-gray-600 flex items-center gap-2 text-red-400"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm">
            <h3 className="text-lg font-bold mb-4">Delete Message?</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleDelete(false)}
                className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                Delete for me
              </button>
              <button
                onClick={() => handleDelete(true)}
                className="w-full py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Delete for everyone
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setShowMenu(false);
                }}
                className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageOptionsMenu;
