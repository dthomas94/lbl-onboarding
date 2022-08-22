import create from "zustand";

interface UserState {
    user: {loggedIn: boolean};
    login: () => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: { loggedIn: false },
  login: () => set(() => ({ user: { loggedIn: true } })),
  logout: () => set(() => ({ user: { loggedIn: false } })),
}));
