'use client';

import { motion } from 'framer-motion';
import {
  ScanFace,
  Palette,
  ClipboardCheck,
  CalendarDays,
  Calculator,
  TrendingUp,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Info,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';
import { useToolStore } from '@/store/use-tool-store';
import type { ToolPanel } from '@/store/use-tool-store';

const iconMap: Record<string, LucideIcon> = {
  ScanFace,
  Palette,
  ClipboardCheck,
  CalendarDays,
  Calculator,
  TrendingUp,
  MessageCircle,
};

const toolIdMap: Record<string, ToolPanel> = {
  'Skin Type Checker': 'skin-type-checker',
  'Hair Color Checker': 'hair-color-checker',
  'Suitability Test': 'suitability-test',
  'Treatment Planner': 'treatment-planner',
  'Session Calculator': 'session-calculator',
  'Progress Tracker': 'progress-tracker',
  'بررسی‌کننده نوع پوست': 'skin-type-checker',
  'بررسی‌کننده رنگ مو': 'hair-color-checker',
  'آزمون تطابق‌پذیری': 'suitability-test',
  'برنامه‌ریز درمان': 'treatment-planner',
  'محاسبه‌گر جلسات': 'session-calculator',
  'ردیاب پیشرفت': 'progress-tracker',
  'FAQ Assistant': 'faq-assistant',
  'دستیار سوالات متداول': 'faq-assistant',
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

export default function ToolsSection() {
  const { locale, direction } = useLocale();
  const { openTool } = useToolStore();
  const content = getContent(locale);
  const { tools } = content;
  const isRtl = direction === 'rtl';
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section id="tools" className="py-20 md:py-28 bg-background" dir={direction}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-start text-start max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="secondary" className="mb-4 text-xs px-3 py-1 rounded-full">
            {tools.sectionTag}
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {tools.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mt-4 leading-relaxed">
            {tools.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {tools.items.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="group rounded-2xl border border-border/50 p-6 md:p-8 hover:border-medical-blue/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => {
                  const toolId = toolIdMap[item.title] || 'skin-type-checker';
                  openTool(toolId);
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-medical-blue/20 to-soft-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {IconComponent && <IconComponent className="size-6 text-medical-blue" />}
                </div>

                <h3 className="font-semibold text-foreground mt-5">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>

                <button className="inline-flex items-center gap-1.5 text-sm text-medical-blue mt-5 group/link hover:gap-2.5 transition-all duration-200">
                  {isRtl ? 'بیشتر بدانید' : 'Learn more'}
                  <ChevronIcon className="size-4" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="flex items-start gap-2 mt-10 max-w-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <Info className="size-4 text-muted-foreground/60 mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground/60 italic leading-relaxed">
            {tools.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
