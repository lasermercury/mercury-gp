import { create } from 'zustand';

type SafetyModalStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useSafetyModalStore = create<SafetyModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
