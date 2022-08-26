import { useEffect, useState } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: { loggedIn: boolean };
  login: () => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: { loggedIn: false },
      login: () => set(() => ({ user: { loggedIn: true } })),
      logout: () => set(() => ({ user: { loggedIn: false } })),
    }),
    {
      name: "user-storage",
    }
  )
);
