import { create } from "zustand";

import {
  fetchUsersApi,
  fetchUserApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "../api/userApi";

const useUserStore = create((set) => ({
  // =========================
  // STATE
  // =========================

  users: [],
  selectedUser: null,

  loading: false,
  error: null,

  // =========================
  // GET ALL USERS
  // =========================

  fetchUsers: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const users = await fetchUsersApi();

      set({
        users,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  // =========================
  // GET USER BY ID
  // =========================

  fetchUser: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const user = await fetchUserApi(id);

      set({
        selectedUser: user,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  // =========================
  // CREATE USER
  // =========================

  addUser: async (user) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const newUser = await createUserApi(user);

      set((state) => ({
        users: [...state.users, newUser],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  // =========================
  // UPDATE USER
  // =========================


  updateUser: async (id, user) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const updatedUser = await updateUserApi(id, user);

      set((state) => ({
        users: state.users.map((item) => (item.id === id ? updatedUser : item)),

        loading: false,
      }));
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  // =========================
  // DELETE USER
  // =========================

  removeUser: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      await deleteUserApi(id);

      set((state) => ({
        users: state.users.filter((user) => user.id !== id),

        loading: false,
      }));
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  // =========================
  // CLEAR SELECTED USER
  // =========================

  clearSelectedUser: () => {
    set({
      selectedUser: null,
    });
  },
}));

export default useUserStore;
