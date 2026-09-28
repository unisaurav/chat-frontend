import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type users = {
  about?: string;
  avatarUrl?: string;
  id: string;
  isOnline: boolean;
  lastSeenAt?: string;
  name: string;
  username: string;
};

interface useUserSearchStore {
  searchUsers: users[];
  setSearchUsers: (users: users[]) => void;
}

const useUserSearchStore = create<useUserSearchStore>()(
  devtools(
    persist(
      (set) => ({
        searchUsers: [],
        setSearchUsers: (searchUsers: users[]) =>
          set(
            () => ({
              searchUsers: searchUsers,
            }),
            undefined,
            "user/search",
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

export default useUserSearchStore;
