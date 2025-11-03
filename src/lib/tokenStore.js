import { create } from 'zustand';

export const useTokenStore = create((set) => ({
  token: '',

  setToken: (newToken) => set({ token: newToken }),

  clearToken: () => set({ token: '' }),
}));
