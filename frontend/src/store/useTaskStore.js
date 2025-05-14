import { create } from "zustand";
import { toast } from "react-hot-toast";
import instance from "../lib/axios";

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,

  getTasksByAgent: async (agentId) => {
    set({ loading: true, error: null, tasks: [] });
    try {
      const response = await instance.get(`/tasks/${agentId}`);
      set({ tasks: response.data, loading: false });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch tasks";
      set({ error: errorMessage, loading: false, tasks: [] });
      toast.error(errorMessage);
    }
  },
}));

export default useTaskStore;