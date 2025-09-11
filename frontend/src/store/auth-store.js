import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import { useUserStore } from "./user-store.js";

const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,

  register: async (data) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      toast.success("Registration successful! Please login.");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data, navigate) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ user: response.data.userCredentials });
      useUserStore.setState({ isAuthenticated: true });
      toast.success("Login successful!");
      if (navigate) {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));

export default useAuthStore;
