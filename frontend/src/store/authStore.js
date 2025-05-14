import { create } from "zustand";
import { toast } from "react-hot-toast";
import instance from "../lib/axios";

const useAuthStore = create((set) => ({
  user: null,

  login: async (email, password) => {
    try {
      const res = await instance.post("/auth/login", { email, password }, { withCredentials: true });
      const token = res.data.token;
      localStorage.setItem("token", token);
      set({ user: { email, token } });
      toast.success("Login successful!");
      return true;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      return false;
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally verify token with server
      set({ user: { token } }); // Minimal user object; update based on your needs
      return true;
    }
    set({ user: null });
    return false;
  },
}));

export default useAuthStore;