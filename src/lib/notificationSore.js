import { number } from 'motion';
import { create } from 'zustand';
import apiRequest from '../utils/apiRequest';

export const useNotifactionSore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = await apiRequest('/users/notification');

    set({ number: res.data });
  },

  decrease: () => {
    set((pv) => ({ number: pv.number - 1 }));
  },

  rest: () => {
    set({ number: 0 });
  },
}));
