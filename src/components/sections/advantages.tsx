'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Plug,
  Gauge,
  Hand,
  ShieldCheck,
  Headphones,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';
import { useVerificationStore } from '@/store/use-verification-store';
import dynamic from 'next/dynamic';
import { verificationEn } from '@/content/en/verification';
import { verificationFa } from '@/content/fa/verification';

const DataTransparencyModal = dynamic(
  () => import('./data-transparency-modal'),
  { ssr: false }
);

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Plug,
  Gauge,
  Hand,
  ShieldCheck,
  Headphones,
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

export default function Advantages() {
  const { locale, direction } = useLocale();
  const content = getContent(locale);
  const { advantages } = content;
  const { open } = useVerificationStore();
  const verificationContent = locale === 'fa' ? verificationFa : verificationEn;

  return (
    <section id="product" className="py-20 md:py-28 bg-background" dir={direction}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className={`flex flex-col items-start text-start max-w-2xl ${direction === 'rtl' ? 'items-end text-end' : 'items-start text-start'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`flex items-center gap-3 flex-wrap ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
            <Badge variant="secondary" className="text-xs px-3 py-1 rounded-full">
              {advantages.sectionTag}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full text-xs gap-1.5 border-border/60 hover:border-medical-blue/40 hover:text-medical-blue transition-colors ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
              onClick={open}
            >
              <ShieldCheck className="size-3.5" />
              {verificationContent.viewRegistry}
            </Button>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-4">
            {advantages.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mt-4 leading-relaxed">
            {advantages.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {advantages.items.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="relative rounded-2xl border border-border/50 p-6 hover:border-medical-blue/30 hover:shadow-lg transition-all duration-300"
              >
                {item.verified ? (
                  <span className="absolute top-4 end-4 inline-flex items-center gap-1 bg-emerald-accent/10 text-emerald-accent text-xs font-medium px-2 py-0.5 rounded-full">
                    <CheckCircle className="size-3" />
                    {locale === 'fa' ? 'تأیید شده' : 'Verified'}
                  </span>
                ) : (
                  <span className="absolute top-4 end-4 text-muted-foreground/50 text-xs">
                    {locale === 'fa' ? 'در انتظار تأیید' : 'Pending verification'}
                  </span>
                )}

                <div className="w-12 h-12 rounded-xl bg-medical-blue/10 flex items-center justify-center">
                  {IconComponent && <IconComponent className="size-5 text-medical-blue" />}
                </div>

                <h3 className="font-semibold text-foreground mt-4">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <DataTransparencyModal />
    </section>
  );
}
