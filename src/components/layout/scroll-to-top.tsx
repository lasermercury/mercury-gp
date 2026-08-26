'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/layout/providers';

const SCROLL_THRESHOLD = 600;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 end-6 z-40"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className={`rounded-full size-11 bg-medical-blue text-white shadow-lg shadow-medical-blue/25 hover:bg-medical-blue/90 hover:shadow-xl hover:shadow-medical-blue/30 transition-all`}
            aria-label={
              locale === 'en' ? 'Scroll to top' : 'بازگشت به بالا'
            }
          >
            <ArrowUp className="size-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
