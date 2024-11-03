import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore"; // Import doc and getDoc from Firestore
import { db } from "./firebase"; // Import your Firestore instance
import { useUserStore } from "./userStore";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  userChats: [], // Initialize userChats as an empty array

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    // Ensure currentUser is defined before proceeding
    if (!currentUser) {
      console.error("Current user is not defined.");
      return;
    }

    // CHECK IF CURRENT USER IS BLOCKED
    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // CHECK IF RECEIVER USER IS BLOCKED
    else if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  },

  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },

  // Method to set userChats
  setUserChats: (chats) => {
    set({ userChats: chats });
  },
}));
