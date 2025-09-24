import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import { toast } from "react-toastify";

// const BASE_URL =
//   import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/";

export const useUserStore = create((set, get) => ({
  users: [],
  isLoading: false,
  isAuthenticated: false,
  userData: null,
  selectedDevData: null,
  feedback: [],

  fetchUsers: async () => {
    try {
      const response = await axiosInstance.get(`/users`);
      set({ users: response.data });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },

  getUserData: async () => {
    try {
      const checkAuth = await axiosInstance.get(`/auth/check-auth`);
      set({ userData: checkAuth.data });
      set({ isAuthenticated: true });
      console.log("userData", get().userData);
    } catch (error) {
      if (error.response.status === 401) {
        set({ isAuthenticated: false });
      }
    }
  },
  updateUserData: async (user_id, data) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.put(`/users/${user_id}`, data);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeedback: async (id) => {
    try {
      const response = await axiosInstance.get(`/feedback/${id}`);
      set({ feedback: response.data });
    } catch (error) {
      console.log(error.message);
    }
  },

  postFeedback: async (id, data) => {
    try {
      const response = await axiosInstance.post(`/feedback/${id}`, data);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  },

  fetchDeveloperData: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      set({ selectedDevData: response.data });
      set({ isLoading: false });
      console.log("selectedDevDataStore", get().selectedDevData);
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ isLoading: false });
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
