import { create } from 'zustand';

export type ArticleSlug = 'what-is-ipl' | 'treatment-schedule' | 'skin-hair-color' | 'safe-home-use' | null;

type ArticleStore = {
  activeArticle: ArticleSlug;
  openArticle: (slug: ArticleSlug) => void;
  closeArticle: () => void;
};

export const useArticleStore = create<ArticleStore>((set) => ({
  activeArticle: null,
  openArticle: (slug) => set({ activeArticle: slug }),
  closeArticle: () => set({ activeArticle: null }),
}));
