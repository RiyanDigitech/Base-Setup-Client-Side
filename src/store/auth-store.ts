import { userType } from "@/lib/types";
import { create } from "zustand";

export type State = {
  user: userType | null;
};

export type Actions = {
  setUser: (user: userType | null) => void;
  logout: () => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  user: null, // Stores the user object
  setUser: (userData) => set({ user: userData }), // Function to set user data
  logout: () => set({ user: null }), // Function to log out
}));
