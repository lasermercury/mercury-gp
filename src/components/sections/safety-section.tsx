'use client';

import { motion } from 'framer-motion';
import {
  TestTube,
  BookOpen,
  AlertTriangle,
  Stethoscope,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';
import { useSafetyModalStore } from '@/store/use-safety-modal-store';
import dynamic from 'next/dynamic';

const SafetyDetailModal = dynamic(
  () => import('@/components/sections/safety-detail-modal'),
  { ssr: false }
);

const iconMap: Record<string, LucideIcon> = {
  TestTube,
  BookOpen,
  AlertTriangle,
  Stethoscope,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SafetySection() {
  const { locale, direction } = useLocale();
  const content = getContent(locale);
  const { safety } = content;
  const isRtl = direction === 'rtl';
  const { open } = useSafetyModalStore();

  return (
    <section id="safety" className="py-20 md:py-28 bg-navy-deep" dir={direction}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-start text-start max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge
            variant="outline"
            className="mb-4 text-xs px-3 py-1 rounded-full border-emerald-accent/40 text-emerald-accent"
          >
            {safety.sectionTag}
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {safety.title}
          </h2>
          <p className="text-silver/70 max-w-xl mt-4 leading-relaxed">
            {safety.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {safety.items.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className={`glass rounded-2xl p-6 md:p-8 cursor-pointer transition-colors hover:bg-white/5 ${isRtl ? 'border-r-4 border-r-emerald-accent' : 'border-l-4 border-l-emerald-accent'}`}
                onClick={open}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') open(); }}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-accent/15 flex items-center justify-center">
                  {IconComponent && <IconComponent className="size-5 text-emerald-accent" />}
                </div>

                <h3 className="font-semibold text-white mt-4">
                  {item.title}
                </h3>

                <p className="text-silver/70 text-sm leading-relaxed mt-2">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="border-emerald-accent/40 text-emerald-accent hover:bg-emerald-accent/10 hover:text-emerald-accent rounded-full px-6"
            onClick={open}
          >
            <Shield className="size-4 me-2" />
            {safety.cta}
          </Button>
        </motion.div>
      </div>

      <SafetyDetailModal />
    </section>
  );
}
