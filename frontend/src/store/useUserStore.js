import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
    persist(
        (set) => ({
            isLogginIn: false,
            user: {},
            setUser: (user) => set({ isLogginIn: true, user }),
            removeUser: () => set({ isLogginIn: false, user: {} })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)