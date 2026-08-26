import { create } from 'zustand';

interface VerificationState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useVerificationStore = create<VerificationState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
