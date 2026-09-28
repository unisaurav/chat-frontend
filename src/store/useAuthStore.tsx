import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type UserDetailsType = {
  about?: string;
  avatarUrl?: string;
  id: string;
  isOnline: boolean;
  lastSeenAt?: string;
  name: string;
  username: string;
};

interface useAuthStore {
  userDetails: UserDetailsType | null;
  setUserDetails: (userDetails: UserDetailsType) => void;
}

const useAuthStore = create<useAuthStore>()(
  devtools(
    persist(
      (set) => ({
        userDetails: null,

        setUserDetails: (userDetails: UserDetailsType) =>
          set(
            () => ({
              userDetails: userDetails,
            }),
            undefined,
            "auth/details",
          ),
      }),
      {
        name: "chat-auth-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          userDetails: state.userDetails,
        }),
      },
    ),
    {
      name: "AuthStore",
    },
  ),
);

export default useAuthStore;
