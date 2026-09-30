import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type user = {
  about?: string;
  avatarUrl?: string;
  id: string;
  isOnline: boolean;
  lastSeenAt?: string;
  name: string;
  username: string;
};

interface useUserStore {
  searchUsers: user[];
  chatWith: user | null;
  setSearchUsers: (user: user[]) => void;
  setChatWith: (chatWithUser: user) => void;
}

const useUserStore = create<useUserStore>()(
  devtools(
    persist(
      (set) => ({
        searchUsers: [],
        chatWith: null,
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
      }),
      {
        name: "chat-auth-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          searchUsers: state.searchUsers,
        }),
      },
    ),
    {
      name: "SearchStore",
    },
  ),
);

export default useUserStore;
