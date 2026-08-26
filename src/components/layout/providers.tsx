'use client';

import { type ReactNode, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { useLocaleStore } from '@/store/use-locale-store';

export function Providers({ children }: { children: ReactNode }) {
  const { locale, direction, setLocale } = useLocaleStore();

  useEffect(() => {
    document.documentElement.lang = locale === 'fa' ? 'fa-IR' : 'en-US';
    document.documentElement.dir = direction;
    document.body.className = document.body.className.replace(/font-(persian|english)/g, '');
    document.body.classList.add(locale === 'fa' ? 'font-persian' : 'font-english');
  }, [locale, direction]);

  useEffect(() => {
    const saved = localStorage.getItem('mercury-locale') as 'en' | 'fa' | null;
    if (saved) setLocale(saved);
  }, [setLocale]);

  const handleLocaleChange = () => {
    const next = locale === 'en' ? 'fa' : 'en';
    setLocale(next);
    localStorage.setItem('mercury-locale', next);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <LocaleContext.Provider value={{ locale, direction, toggleLocale: handleLocaleChange }}>
        {children}
      </LocaleContext.Provider>
    </ThemeProvider>
  );
}

import { createContext, useContext } from 'react';

type LocaleContextType = {
  locale: 'en' | 'fa';
  direction: 'ltr' | 'rtl';
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  direction: 'ltr',
  toggleLocale: () => {},
});

export const useLocale = () => useContext(LocaleContext);
