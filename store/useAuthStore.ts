import { create } from 'zustand'

interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'USER';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User | null) =>
    set({ user, isAuthenticated: !!user }),
  logout: () =>
    set({ user: null, isAuthenticated: false }),
}));
