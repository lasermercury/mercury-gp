'use client';

import { useLocale } from '@/components/layout/providers';

export function SkipToContent() {
  const { locale } = useLocale();
  const label =
    locale === 'fa'
      ? 'رفتن به محتوای اصلی'
      : 'Skip to main content';

  return (
    <a
      href="#main-content"
      className={
        'sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] ' +
        'focus:rounded-lg focus:bg-medical-blue focus:px-4 focus:py-2 focus:text-sm ' +
        'focus:font-medium focus:text-white focus:shadow-lg focus:outline-none ' +
        'focus:ring-2 focus:ring-medical-blue/50 focus:ring-offset-2 focus:transition-all'
      }
    >
      {label}
    </a>
  );
}
