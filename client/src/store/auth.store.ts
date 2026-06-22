import { create } from "zustand";

import { AuthState } from "@/types/auth.types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  setUser: (user) => set({ user }),

  setAccessToken: (accessToken) => set({ accessToken }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
    }),
}));
