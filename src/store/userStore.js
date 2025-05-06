import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      register: (userData) => set({
        user: userData,
        isAuthenticated: true
      }),

      logout: () => set({
        user: null,
        isAuthenticated: false
      }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;