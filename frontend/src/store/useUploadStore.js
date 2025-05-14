import { create } from 'zustand';
import instance from '../lib/axios';

const useUploadStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  resetStatus: () => set({ error: null, success: false }),

  uploadCSV: async (file) => {
    set({ loading: true, error: null, success: false });

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await instance.post('tasks/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status !== 200 || !response.data?.message?.includes('uploaded')) {
        // Treat any non-successful response as an error
        throw new Error(response.data.message || 'Invalid file format');
      }

      set({ loading: false, success: true });
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Upload failed';
      set({ loading: false, error: message });
      throw new Error(message); // Important for component's try/catch
    }
  },
}));

export default useUploadStore;
