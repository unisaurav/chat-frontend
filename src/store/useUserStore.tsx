import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type { ConversationType } from "../pages/RecentChats/RecentChatsType";

type user = {
  about?: string;
  avatarUrl?: string;
  id: string;
  isOnline: boolean;
  lastSeenAt?: string;
  name: string;
  username: string;
  messages?: ChatMessage[] | undefined;
};
// type MessageReceipt = {
//   messageId: string;
//   userId: string;
//   deliveredAt: string | null;
//   readAt: string | null;
// };

type ChatMessage = {
  text: string;
  self: boolean;
  id?: string;
};

interface useUserStore {
  searchUsers: user[];
  chatWith: user | null;
  conversationId: string | null;
  fetchRecent: boolean; //not getting used rn
  setSearchUsers: (user: user[]) => void;
  setChatWith: (chatWithUser: user) => void;
  setConversationId: (id: string) => void;
  setFetchRecent: (flag: boolean) => void; //not getting used rn
  recentConversation: ConversationType[] | null;
  setRecentConversation: (user: ConversationType[] | null) => void;
  setChatMessage: (messages: ChatMessage[]) => void;
}

const useUserStore = create<useUserStore>()(
  devtools(
    persist(
      (set) => ({
        searchUsers: [],
        chatWith: null,
        conversationId: null,
        fetchRecent: true,
        recentConversation: null,
        setSearchUsers: (searchUsers: user[]) =>
          set(
            () => ({
              searchUsers: searchUsers,
            }),
            undefined,
            "user/search",
          ),
        setChatWith: (chatWithUser: user | null) =>
          set(
            () => ({
              chatWith: chatWithUser,
            }),
            undefined,
            "user/chat-with",
          ),
        setConversationId: (id: string) =>
          set(
            () => ({
              conversationId: id,
            }),
            undefined,
            "user/conversationId",
          ),
        setFetchRecent: (flag: boolean) =>
          set(
            () => ({
              fetchRecent: flag,
            }),
            undefined,
            "user/fetchRecent",
          ),
        setRecentConversation: (conversation: ConversationType[] | null) =>
          set(
            () => ({
              recentConversation: conversation,
            }),
            undefined,
            "user/fetchRecent",
          ),
        setChatMessage: (message: ChatMessage[]) =>
          set(
            ({ chatWith }) => ({
              chatWith: chatWith
                ? {
                    ...chatWith,
                    messages: [...(chatWith.messages ?? []), ...message],
                  }
                : null,
            }),
            undefined,
            "user/setChatMessage",
          ),
      }),
      {
        name: "chat-auth-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          searchUsers: state.searchUsers,
          chatWith: state.chatWith,
          conversationId: state.conversationId,
          fetchRecent: state.fetchRecent,
          recentConversation: state.recentConversation,
        }),
      },
    ),
    {
      name: "SearchStore",
    },
  ),
);

export default useUserStore;
