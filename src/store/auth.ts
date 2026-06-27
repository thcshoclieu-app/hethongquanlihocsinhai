import { create } from 'zustand';
import { User as FirebaseUser } from 'firebase/auth';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setFirebaseUser: (user: FirebaseUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  firebaseUser: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setFirebaseUser: (firebaseUser) => set({ firebaseUser }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, firebaseUser: null, isAuthenticated: false, isLoading: false }),
}));
