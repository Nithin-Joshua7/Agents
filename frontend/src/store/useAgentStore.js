import { create } from 'zustand';
import instance from '../lib/axios';

const useAgentStore = create((set) => ({
  agents: [],
  loading: false,
  error: null,
  success: false,

  addAgent: async (agentData) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await instance.post('/agents', agentData);
      set((state) => ({
        agents: [...state.agents, response.data.agent],
        loading: false,
        success: true,
      }));
      return true; // ✅ Return true to indicate success
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Server error',
        success: false,
      });
      return false; // ❌ Return false to indicate failure
    }
  },

  getAgents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await instance.get('/agents');
      set({
        agents: response.data,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Server error',
      });
    }
  },

  updateAgent: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await instance.put(`/agents/${id}`, updatedData);
      set((state) => ({
        agents: state.agents.map((agent) =>
          agent._id === id ? response.data.agent : agent
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Server error',
      });
    }
  },

  deleteAgent: async (id) => {
    set({ loading: true, error: null });
    try {
      await instance.delete(`/agents/${id}`);
      set((state) => ({
        agents: state.agents.filter((agent) => agent._id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error('Delete agent error:', error.response?.data || error.message);
      set({
        loading: false,
        error: error.response?.data?.message || 'Server error',
      });
      throw error;
    }
  },

  resetStatus: () => set({ error: null, success: false })
}));

export default useAgentStore;
