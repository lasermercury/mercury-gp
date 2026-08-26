'use client';

import { motion } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  ClipboardList,
  Shield,
  Heart,
  Stethoscope,
  Check,
  type LucideIcon,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useLocale } from '@/components/layout/providers';
import { useSafetyModalStore } from '@/store/use-safety-modal-store';
import { safetyEn } from '@/content/en/safety';
import { safetyFa } from '@/content/fa/safety';

type SafetyIconKey = 'ClipboardList' | 'AlertTriangle' | 'Shield' | 'Heart' | 'Stethoscope';

const iconMap: Record<SafetyIconKey, LucideIcon> = {
  ClipboardList,
  AlertTriangle,
  Shield,
  Heart,
  Stethoscope,
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function SafetyDetailModal() {
  const { locale, direction } = useLocale();
  const { isOpen, close } = useSafetyModalStore();
  const isRtl = direction === 'rtl';
  const content = locale === 'fa' ? safetyFa : safetyEn;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) close(); }}>
      <DialogContent
        className={`sm:max-w-3xl rounded-2xl bg-background ${isRtl ? 'text-right' : 'text-left'}`}
        dir={direction}
      >
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-h-[90vh] overflow-y-auto scrollbar-thin"
        >
          <DialogHeader>
            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-xl bg-medical-blue/10 flex items-center justify-center shrink-0">
                <AlertCircle className="size-5 text-medical-blue" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {content.title}
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {content.subtitle}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-6 flex flex-col gap-8">
            {content.sections.map((section) => {
              const SectionIcon = iconMap[section.icon as SafetyIconKey] || AlertCircle;
              const isContraindication = section.icon === 'AlertTriangle';

              return (
                <section key={section.heading}>
                  <div className={`flex items-center gap-2.5 mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isContraindication
                        ? 'bg-amber-500/10'
                        : 'bg-medical-blue/10'
                    }`}>
                      <SectionIcon className={`size-4 ${
                        isContraindication
                          ? 'text-amber-500'
                          : 'text-medical-blue'
                      }`} />
                    </div>
                    <h3 className={`text-base font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                      {section.heading}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.items.map((item) => (
                      <div
                        key={item.title}
                        className={`rounded-xl border p-4 ${
                          isContraindication
                            ? 'border-amber-500/30 bg-amber-500/5'
                            : 'border-border/60 bg-muted/20'
                        }`}
                      >
                        <div className={`flex items-start gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            isContraindication
                              ? 'bg-amber-500/15'
                              : 'bg-medical-blue/10'
                          }`}>
                            <Check className={`size-3 ${
                              isContraindication
                                ? 'text-amber-500'
                                : 'text-medical-blue'
                            }`} />
                          </div>
                          <div className={isRtl ? 'text-right' : 'text-left'}>
                            <p className="font-medium text-sm text-foreground">
                              {item.title}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <div className={`mt-8 flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/40 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <AlertCircle className="size-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className={`text-xs text-muted-foreground italic leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
              {content.disclaimer}
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
