'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HowItWorks() {
  const { locale, direction } = useLocale();
  const content = getContent(locale);
  const { howItWorks } = content;
  const isRtl = direction === 'rtl';

  return (
    <section
      id="technology"
      className="py-20 md:py-28 bg-navy-deep relative overflow-hidden"
      dir={direction}
    >
      <div className="grid-pattern absolute inset-0 z-0 opacity-50" />

      <div
        className={
          'absolute top-0 z-0 h-[500px] w-[500px] rounded-full blur-3xl pointer-events-none ' +
          (isRtl ? 'left-[-200px]' : 'right-[-200px]')
        }
        style={{
          background:
            'radial-gradient(circle, oklch(0.52 0.15 250 / 10%) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-start text-start max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge
            variant="outline"
            className="border-soft-blue/30 text-soft-blue mb-4 text-xs px-3 py-1 rounded-full"
          >
            {howItWorks.sectionTag}
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {howItWorks.title}
          </h2>
          <p className="text-silver/70 max-w-xl mt-4 leading-relaxed">
            {howItWorks.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="mt-12 rounded-2xl overflow-hidden max-h-80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/ipl-technology.png"
            alt="IPL Technology Overview"
            width={1280}
            height={400}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        <div className="mt-16">
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {howItWorks.steps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={stepVariants}
                className={
                  'flex gap-4 md:gap-8 ' +
                  (index < howItWorks.steps.length - 1 ? 'pb-8' : '')
                }
              >
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-5xl md:text-6xl font-bold text-medical-blue/20 leading-none select-none">
                    {step.step}
                  </span>

                  {index < howItWorks.steps.length - 1 && (
                    <div className="w-px flex-1 mt-2 bg-gradient-to-b from-medical-blue/20 to-transparent" />
                  )}
                </div>

                <div className="pt-2 md:pt-4 pb-2">
                  <h3 className="font-semibold text-white text-lg">
                    {step.title}
                  </h3>
                  <p className="text-silver/70 text-sm leading-relaxed mt-2 max-w-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="flex items-start gap-2 mt-12 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AlertCircle className="size-4 text-silver/50 mt-0.5 shrink-0" />
          <p className="text-silver/50 text-xs italic leading-relaxed">
            {howItWorks.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
