import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../configs/axios";
import { userStore } from "./userStore.js";

export const chatStore = create((set, get) => ({
  Messages: [],
  user: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getuser: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/user");
      console.log("response from message user", res);
      set({ user: res.data });
    } catch (error) {
      console.log("error in getting users", error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance(`/message/${userId}`);
      set({ Messages: res.data });
    } catch (error) {
      console.log("error in getting messages", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (message) => {
    const { selectedUser, socket } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        {
          receiverId: selectedUser._id,
          text: message.text,
        }
      );
    
     console.log("Messages after fetch:", get().Messages);

      const newMsg = res.data;
      set((state) => ({
        Messages: [...(state.Messages || []), newMsg], // ✅ Append safely
      }));

      if (socket || selectedUser) {
        socket?.emit("message", { message: res.data, userId: selectedUser._id });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },
  subbscribeTomessage: async () => {
    const { selectedUser } = get();
    const socket = userStore.getState().socket;

    if (!socket) return;

    socket.off("message");
    console.log("📨 Subscribed to message");
    
    socket.on("message", (newMessage) => {
      console.log("📨 Received new message from socket", newMessage);
      if (
        newMessage.senderId === selectedUser._id ||
        newMessage.recieverId === selectedUser._id
      ) {
        const current = get().Messages || [];
      set({ Messages: [...current, newMessage] });

      }
    });
  },


  unsubscribe: async () => {
    const socket = userStore.getState().socket;
    if (socket) {
      socket.off("x");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
