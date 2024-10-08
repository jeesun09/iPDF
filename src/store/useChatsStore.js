import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useChatsStore = create((set) => ({
  chats: [],
  lastChat: null,

  setChats: (chats) => {
    set({ chats });
  },

  createChat: async (file_key, file_name) => {
    try {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });

      if (response?.data) {
        console.log("Chat created", response.data);
        // update the chats array in the store and the lastChat
        set((state) => ({ chats: [...state.chats, response.data] }));
        set({ lastChat: response.data });
        toast.success("Chat Created");
        return response.data.id;
      } else {
        console.log("Unexpected response: ", response);
        toast.error("Failed to create chat, please try again");
        return null;
      }
    } catch (error) {
      console.log("Error creating chat", error);
    }
  },

  fetchChats: async () => {
    try {
      const { data } = await axios.get("/api/get-chats");
      set({
        chats: data,
        lastChat: data.length > 0 ? data[data.length - 1] : null,
      });
    } catch (error) {
      toast.error("Error fetching chats");
      console.error("Error fetching chats", error);
    }
  },

  deleteChat: async (chatId, fileKey) => {
    try {
      await axios.delete(`/api/delete-chat`, {
        data: { chatId, fileKey },
      });
      set((state) => {
        const updatedChats = state.chats.filter((chat) => chat.id !== chatId);
        const isDeletedChatLastChat = state.lastChat.id === chatId;
        const newLastChat =
          updatedChats.length > 0
            ? updatedChats[updatedChats.length - 1]
            : null;
        return {
          chats: updatedChats,
          lastChat: isDeletedChatLastChat ? newLastChat : state.lastChat,
        };
      });
      toast.success("Chat Deleted");
    } catch (error) {
      toast.error("Error deleting chat");
      console.error("Error deleting chat", error);
      return false;
    }
  },
}));
