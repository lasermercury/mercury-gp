'use client';

import { motion } from 'framer-motion';
import { GitCompareArrows } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';
import { useComparisonStore } from '@/store/use-comparison-store';
import dynamic from 'next/dynamic';
import type { ComparisonCompetitor } from '@/store/use-comparison-store';

const ComparisonModals = dynamic(
  () => import('@/components/sections/comparison-modals'),
  { ssr: false }
);

export default function ComparisonSection() {
  const { locale, direction } = useLocale();
  const content = getContent(locale);
  const { comparison, comparisonDetails } = content;
  const { openComparison } = useComparisonStore();
  const isRtl = direction === 'rtl';

  const handlePillClick = (slug: string) => {
    openComparison(slug as ComparisonCompetitor);
  };

  return (
    <section id="compare" className="py-20 md:py-28 bg-background" dir={direction}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-start text-start max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="secondary" className="mb-4 text-xs px-3 py-1 rounded-full">
            {comparison.sectionTag}
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {comparison.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mt-4 leading-relaxed">
            {comparison.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3 mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {comparison.competitors.map((competitor) => (
            <button
              key={competitor.slug}
              onClick={() => handlePillClick(competitor.slug)}
              className="rounded-full border border-border/60 px-5 py-2.5 text-sm font-medium text-foreground hover:border-medical-blue/40 hover:text-medical-blue transition-all duration-200"
            >
              {isRtl ? (
                <>
                  <span className="text-muted-foreground/60">{competitor.name}</span>
                  <span className="text-muted-foreground/40 mx-1.5">vs</span>
                  <span className="text-muted-foreground/60">Mercury GP</span>
                </>
              ) : (
                <>
                  <span className="text-muted-foreground/60">Mercury GP</span>
                  <span className="text-muted-foreground/40 mx-1.5">vs</span>
                  <span>{competitor.name}</span>
                </>
              )}
            </button>
          ))}
        </motion.div>

        {/* Visible comparison summary paragraphs for SEO / AIO citation */}
        <motion.div
          className="mt-10 max-w-4xl space-y-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {comparison.competitors.map((competitor) => {
            const details = comparisonDetails[competitor.slug as keyof typeof comparisonDetails];
            if (!details || !('summary' in details)) return null;
            return (
              <div
                key={competitor.slug}
                className="rounded-xl border border-border/30 bg-card/50 p-5 text-sm text-muted-foreground leading-relaxed"
              >
                <h3 className="font-semibold text-foreground text-sm mb-2">
                  {isRtl
                    ? ('Mercury GP در مقابل ' + competitor.name)
                    : ('Mercury GP vs ' + competitor.name)}
                </h3>
                <p>{details.summary as string}</p>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <Button className="bg-medical-blue text-white hover:bg-medical-blue/90 rounded-full px-6">
            <GitCompareArrows className="size-4 me-2" />
            {comparison.cta}
          </Button>
        </motion.div>

        <motion.p
          className="text-muted-foreground/60 text-xs mt-6 max-w-2xl italic leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {comparison.note}
        </motion.p>

        <ComparisonModals />
      </div>
    </section>
  );
}