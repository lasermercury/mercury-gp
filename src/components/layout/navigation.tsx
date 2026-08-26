'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, Globe, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';
import { useProductModalStore } from '@/store/use-product-modal-store';

const SECTION_IDS = ['product', 'technology', 'safety', 'tools', 'learn', 'faq', 'glossary', 'contact'];
const HEADER_OFFSET = 80;

function handleScrollTo(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function Navigation() {
  const { locale, direction, toggleLocale } = useLocale();
  const { theme, setTheme } = useTheme();
  const content = getContent(locale);
  const { brand, links, cta } = content.nav;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const isRtl = direction === 'rtl';
  const { open: openProductModal } = useProductModalStore();
  const resolvedTheme = typeof window !== 'undefined' ? theme : 'light';
  const observerRef = useRef<IntersectionObserver | null>(null);

  // IntersectionObserver to track active section
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the topmost visible section
          const sorted = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveSection(sorted[0].target.id);
        }
      },
      { rootMargin: `-${HEADER_OFFSET + 20}px 0px -50% 0px`, threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const onNavClick = useCallback(
    (href: string) => {
      handleScrollTo(href);
      setMobileOpen(false);
    },
    [setMobileOpen],
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass sticky top-0 z-50 border-b border-border/40"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label={locale === 'en' ? 'Main navigation' : 'ناوبری اصلی'}>
        {/* Brand — on the left in LTR, on the right in RTL */}
        <button
          onClick={() => openProductModal()}
          className={`${isRtl ? 'order-3 sm:order-1' : 'order-1'} flex items-center gap-2 transition-colors hover:text-medical-blue`}
        >
          <span className="text-xl font-bold tracking-tight text-foreground">
            {brand}
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-medical-blue">
            GP
          </span>
        </button>

        {/* Desktop nav links — center */}
        <div className={`${isRtl ? 'order-1 sm:order-2' : 'order-2'} hidden items-center gap-1 md:flex`}>
          {links.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <button
                key={link.href}
                onClick={() => onNavClick(link.href)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-medical-blue bg-medical-blue/8'
                    : 'text-foreground/80 hover:bg-soft-blue/10 hover:text-medical-blue'
                } ${isRtl ? 'text-right' : 'text-left'}`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* CTA + Language toggle — on the right in LTR, on the left in RTL */}
        <div
          className={`${isRtl ? 'order-2 sm:order-3' : 'order-3'} flex items-center gap-2`}
        >
          <Button
            onClick={() => openProductModal()}
            className="hidden bg-medical-blue text-white shadow-[0_0_20px_oklch(0.52_0.15_250/20%)] transition-all hover:bg-medical-blue/90 hover:shadow-[0_0_30px_oklch(0.52_0.15_250/35%)] sm:inline-flex"
            size="sm"
          >
            {cta}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={
              theme === 'dark'
                ? (locale === 'en' ? 'Switch to light mode' : 'تغییر به حالت روشن')
                : (locale === 'en' ? 'Switch to dark mode' : 'تغییر به حالت تاریک')
            }
            className="text-foreground/70 hover:text-medical-blue"
          >
            {resolvedTheme === 'dark' ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLocale}
            aria-label={
              locale === 'en' ? 'Switch to Persian' : 'تغییر به انگلیسی'
            }
            className="text-foreground/70 hover:text-medical-blue"
          >
            <Globe className="size-[18px]" />
          </Button>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/70 hover:text-medical-blue md:hidden"
                aria-label={locale === 'en' ? 'Open menu' : 'باز کردن منو'}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side={isRtl ? 'left' : 'right'}
              className="w-[300px] overflow-y-auto bg-background p-0 sm:max-w-sm"
            >
              <SheetHeader className="border-b border-border/40 px-6 py-5">
                <SheetTitle className="flex items-center gap-2 text-foreground">
                  <span className="text-lg font-bold">{brand}</span>
                  <span className="text-xs font-medium uppercase tracking-widest text-medical-blue">
                    GP
                  </span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  {locale === 'en'
                    ? 'Navigation menu'
                    : 'منوی ناوبری'}
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col px-3 py-4">
                {links.map((link) => {
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <button
                      key={link.href}
                      onClick={() => onNavClick(link.href)}
                      className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-medical-blue bg-medical-blue/8'
                          : 'text-foreground/80 hover:bg-soft-blue/10 hover:text-medical-blue'
                      } ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>

              <Separator className="mx-4" />

              <div className="p-4">
                <Button
                  onClick={() => { openProductModal(); setMobileOpen(false); }}
                  className="w-full bg-medical-blue text-white shadow-[0_0_20px_oklch(0.52_0.15_250/20%)] transition-all hover:bg-medical-blue/90 hover:shadow-[0_0_30px_oklch(0.52_0.15_250/35%)]"
                  size="lg"
                >
                  {cta}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
