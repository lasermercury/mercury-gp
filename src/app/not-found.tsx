'use client';

import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/layout/providers';

const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

const notFoundContent = {
  en: {
    errorCode: '404',
    title: 'Page Not Found',
    description:
      "The page you're looking for doesn't exist or has been moved. Let's get you back to Mercury GP.",
    primaryCta: 'Go to Homepage',
    secondaryNote: 'Or try navigating from the menu above.',
  },
  fa: {
    errorCode: '۴۰۴',
    title: 'صفحه مورد نظر یافت نشد',
    description:
      'صفحه‌ای که دنبال آن هستید وجود ندارد یا جابه‌جا شده. بیایید شما را به صفحه اصلی برگردانیم.',
    primaryCta: 'بازگشت به صفحه اصلی',
    secondaryNote: 'یا از منوی بالا برای ناوبری استفاده کنید.',
  },
};

export default function NotFound() {
  const { locale, direction } = useLocale();
  const mounted = useHydrated();
  const content = notFoundContent[locale];
  const isRtl = direction === 'rtl';

  if (!mounted) {
    return null;
  }

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div
      className="min-h-screen flex flex-col bg-navy-deep overflow-hidden"
      dir={direction}
    >
      {/* Grid pattern overlay */}
      <div className="grid-pattern absolute inset-0 z-0" />

      {/* Decorative glow */}
      <div
        className={
          'absolute top-1/3 z-0 h-[500px] w-[500px] rounded-full blur-3xl pointer-events-none ' +
          (isRtl ? 'left-[-200px]' : 'right-[-200px]')
        }
        style={{
          background:
            'radial-gradient(circle, oklch(0.52 0.15 250 / 10%) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Error Code */}
          <motion.div
            className="text-gradient-blue text-8xl md:text-9xl font-bold leading-none select-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
          >
            {content.errorCode}
          </motion.div>

          {/* Divider line */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-medical-blue/40 to-transparent mx-auto my-6" />

          <motion.h1
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          >
            {content.title}
          </motion.h1>

          <motion.p
            className="text-silver/70 text-base leading-relaxed mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          >
            {content.description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          >
            <Button
              size="lg"
              className="bg-medical-blue hover:bg-medical-blue/90 text-white px-6 py-5 text-sm font-medium cursor-pointer"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              <Home className={'size-4 ' + (isRtl ? 'ms-2' : 'me-2')} />
              {content.primaryCta}
              <ArrowIcon className={'size-4 ' + (isRtl ? 'ms-2' : 'me-2')} />
            </Button>
          </motion.div>

          <motion.p
            className="text-silver/40 text-xs mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {content.secondaryNote}
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom brand mark */}
      <div className="relative z-10 py-6 flex items-center justify-center gap-2">
        <div className="w-6 h-6 rounded-md bg-medical-blue/20 flex items-center justify-center">
          <span className="text-medical-blue font-bold text-xs">M</span>
        </div>
        <span className="text-silver/30 text-sm font-medium">Mercury GP</span>
      </div>
    </div>
  );
}
