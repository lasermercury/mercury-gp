import { create } from 'zustand';

export type Locale = 'en' | 'fa';

type LocaleStore = {
  locale: Locale;
  direction: 'ltr' | 'rtl';
  setLocale: (locale: Locale) => void;
};

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: 'en',
  direction: 'ltr',
  setLocale: (locale) =>
    set({
      locale,
      direction: locale === 'fa' ? 'rtl' : 'ltr',
    }),
}));
