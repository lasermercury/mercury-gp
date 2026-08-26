'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';
import { useProductModalStore } from '@/store/use-product-modal-store';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
  },
};

export default function Hero() {
  const { locale, direction } = useLocale();
  const content = getContent(locale);
  const { hero } = content;
  const isRtl = direction === 'rtl';
  const { open: openProductModal } = useProductModalStore();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen bg-navy-deep overflow-hidden flex items-center"
      dir={direction}
    >
      {/* Grid pattern overlay */}
      <div className="grid-pattern absolute inset-0 z-0" />

      {/* Decorative radial gradient glow — top right in LTR, top left in RTL */}
      <div
        className={
          'absolute top-0 z-0 h-[600px] w-[600px] rounded-full blur-3xl pointer-events-none ' +
          (isRtl ? 'left-[-200px]' : 'right-[-200px]')
        }
        style={{
          background:
            'radial-gradient(circle, oklch(0.52 0.15 250 / 12%) 0%, transparent 70%)',
        }}
      />

      {/* Decorative radial gradient glow — bottom left in LTR, bottom right in RTL */}
      <div
        className={
          'absolute bottom-0 z-0 h-[400px] w-[400px] rounded-full blur-3xl pointer-events-none ' +
          (isRtl ? 'right-[-100px]' : 'left-[-100px]')
        }
        style={{
          background:
            'radial-gradient(circle, oklch(0.72 0.10 230 / 8%) 0%, transparent 70%)',
        }}
      />

      {/* Abstract accent line */}
      <div
        className={
          'absolute top-1/4 z-0 h-px w-48 pointer-events-none animate-pulse-soft ' +
          'bg-gradient-to-r from-transparent via-medical-blue/20 to-transparent ' +
          (isRtl ? 'left-[10%]' : 'right-[10%]')
        }
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div
          className={
            'flex flex-col md:flex-row items-center gap-10 md:gap-16 ' +
            (isRtl ? 'md:flex-row-reverse' : '')
          }
        >
          {/* Text content — right side in RTL, left side in LTR */}
          <motion.div
            className={
              'flex-1 flex flex-col text-center md:text-start ' +
              (isRtl ? 'md:text-right' : 'md:text-left')
            }
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="border-medical-blue/30 text-soft-blue mb-6 text-xs px-3 py-1 rounded-full"
              >
                {hero.badge}
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white max-w-2xl leading-tight tracking-tight"
            >
              {hero.title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-silver/80 text-base md:text-lg max-w-xl mt-5 leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-3 mt-8"
            >
              <Button
                size="lg"
                className="bg-medical-blue hover:bg-medical-blue/90 text-white px-6 py-5 text-sm font-medium cursor-pointer"
                onClick={() => openProductModal()}
              >
                {hero.primaryCta}
                {isRtl ? (
                  <ArrowLeft className="size-4" />
                ) : (
                  <ArrowRight className="size-4" />
                )}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="border border-silver/30 text-silver hover:text-white hover:border-silver/50 hover:bg-transparent px-6 py-5 text-sm font-medium cursor-pointer"
                onClick={() => scrollTo('tools')}
              >
                {hero.secondaryCta}
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-start gap-2 mt-6 max-w-md justify-center md:justify-start"
            >
              <Shield className="size-3.5 text-muted-foreground/60 mt-0.5 shrink-0" />
              <span className="text-muted-foreground/60 text-xs leading-relaxed">
                {hero.trustNote}
              </span>
            </motion.div>
          </motion.div>

          {/* Product image — left side in RTL, right side in LTR */}
          <motion.div
            className={
              'flex-shrink-0 relative flex items-center justify-center order-first md:order-last'
            }
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Glow behind image */}
            <div className="glow-blue absolute inset-0 rounded-full" />

            {/* Secondary glow ring */}
            <div
              className="absolute inset-[-10%] rounded-full opacity-30 animate-pulse-soft"
              style={{
                background:
                  'radial-gradient(circle, oklch(0.52 0.15 250 / 25%) 0%, transparent 65%)',
              }}
            />

            <div className="animate-float relative z-10 w-64 md:w-80 lg:w-[420px]">
              <Image
                src="/images/mercury-gp-product-ad.jpg"
                alt="Mercury GP — IPL Hair-Reduction Device"
                width={720}
                height={720}
                priority
                className="w-full h-auto drop-shadow-2xl rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
