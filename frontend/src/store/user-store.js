import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import { toast } from "react-toastify";

// const BASE_URL =
//   import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/";

export const useUserStore = create((set, get) => ({
  users: [],
  isLoading: true,
  isAuthenticated: false,
  userData: null,

  fetchUsers: async () => {
    try {
      const response = await axiosInstance.get(`/users`);
      set({ users: response.data });
    } catch (error) {
      console.log("fetch users error", error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getUserData: async () => {
    try {
      const checkAuth = await axiosInstance.get(`/auth/check-auth`);
      console.log(checkAuth.data);
      set({ userData: checkAuth.data });
      set({ isAuthenticated: true });
    } catch (error) {
      if (error.response.status === 401) {
        set({ isAuthenticated: false });
      }
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post(`/users/logout`);
      set({ isAuthenticated: false });
      set({ userData: null });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
