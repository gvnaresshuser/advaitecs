import { create } from "zustand";
import {
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
} from "../api/authApi";
import type { LoginData, User } from "../types/auth.types";

interface AuthState {
  user: User | null;
  initialized: boolean;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialized: false,
  loading: false,

  login: async (data) => {
    set({ loading: true });

    try {
      await loginApi(data);
      const response = await getCurrentUser();

      set({
        user: response.data,
        initialized: true,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  fetchCurrentUser: async () => {
    try {
      const response = await getCurrentUser();

      set({
        user: response.data,
        initialized: true,
      });
    } catch {
      set({
        user: null,
        initialized: true,
      });
    }
  },

  logout: async () => {
    try {
      await logoutApi();
    } finally {
      set({
        user: null,
        initialized: true,
      });
    }
  },
}));