import { create } from 'zustand';

export type ComparisonCompetitor =
  | 'philips-lumea'
  | 'braun-silk-expert-pro-5'
  | 'ulike'
  | 'deess'
  | 'silkn'
  | null;

type ComparisonStore = {
  activeCompetitor: ComparisonCompetitor;
  openComparison: (competitor: ComparisonCompetitor) => void;
  closeComparison: () => void;
};

export const useComparisonStore = create<ComparisonStore>((set) => ({
  activeCompetitor: null,
  openComparison: (competitor) => set({ activeCompetitor: competitor }),
  closeComparison: () => set({ activeCompetitor: null }),
}));
