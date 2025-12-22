import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTokenStore = create(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
      getToken: () => get().token,
    }),
    {
      name: 'auth-token',
    }
  )
);

export const getStoredToken = () => {
  try {
    const stored = localStorage.getItem('auth-token');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.state?.token || null;
    }
  } catch (error) {
    console.error('Error reading token:', error);
  }
  return null;
};
