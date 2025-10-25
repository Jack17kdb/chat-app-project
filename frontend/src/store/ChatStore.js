import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./AuthStore";

export const UseChatStore = create((set, get) => ({
  messages: [],
  users: [],
  deletedMessagesIds: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  editMessage: async (messageId, newText) => {
    try {
      const res = await axiosInstance.put(`/message/edit/${messageId}`, {
        text: newText
      });

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === messageId ? res.data : msg
        )
      }));

      toast.success("Message edited successfully");
    } catch(error) {
      toast.error(error.response?.data?.message || "Failed to edit message");
    }
  },

  deleteMessage: async (messageId, deleteForEveryone=false) => {
    try {
      const res = await axiosInstance.delete(`/message/delete/${messageId}`, {
        data: {deleteForEveryone}
      });

      if (deleteForEveryone) {

        set((state) => ({
          messages: state.messages.map((msg) =>
            msg._id === messageId ? {
              ...msg, isDeleted: true, text: "This message was deleted"
            } : msg
          )
        }));

      } else {
        set((state) => ({
          deletedMessagesIds: [...state.deletedMessagesIds, messageId]
        }));
      }

      toast.success("Message deleted successfully")
    } catch(error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  },

  subscribeMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;

    if (!socket) {
      console.warn("Socket not available for subscription");
      return;
    }


    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId === selectedUser._id) {
        set((state) => ({
          messages: [...state.messages, newMessage]
        }));
      }
    });

    socket.on("messageEdited", (editedMessage) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === editedMessage._id ? editedMessage : msg
        )
      }));
    });

    socket.on("deletedMessage", ({ messageId, deleteForEveryone }) => {
      if (deleteForEveryone) {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg._id === messageId ? {
              ...msg,
              isDeleted: true,
              text: "This message was deleted"
            } : msg
          )
        }));
      }
    });
  },

  unsubscribeMessages: () => {
    const socket = useAuthStore.getState().socket;

    if (!socket) {
      console.warn("Socket not available for unsubscription");
      return;
    }
    socket.off("newMessage");
    socket.off("messageEdited");
    socket.off("deletedMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
