import { create } from 'zustand';

type SeoGuideModalStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useSeoGuideModalStore = create<SeoGuideModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
