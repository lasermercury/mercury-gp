import { homeEn } from '@/content/en/home';
import { homeFa } from '@/content/fa/home';
import type { Locale } from '@/store/use-locale-store';

const contentMap = {
  en: homeEn,
  fa: homeFa,
} as const;

export function getContent(locale: Locale) {
  return contentMap[locale];
}

export type ContentKeys = keyof typeof homeEn;
