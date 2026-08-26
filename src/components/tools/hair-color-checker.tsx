'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/components/layout/providers';
import { useToolStore } from '@/store/use-tool-store';
import { toolsEn } from '@/content/en/tools';
import { toolsFa } from '@/content/fa/tools';

type EffectivenessLevel = 'responsive' | 'varies' | 'limited' | 'not-effective';

function getEffectivenessLevel(text: string): EffectivenessLevel {
  const lower = text.toLowerCase();
  if (
    lower.includes('most responsive') ||
    lower.includes('responds well') ||
    lower.includes('پاسخ‌گوترین') ||
    lower.includes('خوب')
  ) {
    return 'responsive';
  }
  if (
    lower.includes('limited') ||
    lower.includes('محدود')
  ) {
    return 'limited';
  }
  if (
    lower.includes('not effective') ||
    lower.includes('مؤثر نیست')
  ) {
    return 'not-effective';
  }
  return 'varies';
}

const effectivenessConfig: Record<
  EffectivenessLevel,
  { labelEn: string; labelFa: string; className: string }
> = {
  responsive: {
    labelEn: 'Responsive',
    labelFa: 'پاسخ‌گو',
    className: 'bg-emerald-accent/15 text-emerald-accent border-emerald-accent/30',
  },
  varies: {
    labelEn: 'Varies',
    labelFa: 'متغیر',
    className: 'bg-amber-500/15 text-amber-600 border-amber-500/30',
  },
  limited: {
    labelEn: 'Limited',
    labelFa: 'محدود',
    className: 'bg-amber-500/15 text-amber-600 border-amber-500/30',
  },
  'not-effective': {
    labelEn: 'Not Effective',
    labelFa: 'غیر مؤثر',
    className: 'bg-red-500/15 text-red-600 border-red-500/30',
  },
};

export default function HairColorChecker() {
  const { locale, direction } = useLocale();
  const { activeTool, closeTool } = useToolStore();
  const t = locale === 'fa' ? toolsFa : toolsEn;

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isOpen = activeTool === 'hair-color-checker';
  const hairColors = t.hairColor.hairColors;
  const selectedColor = hairColors.find((c) => c.id === selectedId) ?? null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeTool();
          setSelectedId(null);
        }
      }}
    >
      <DialogContent
        className="sm:max-w-2xl rounded-2xl bg-background p-0 overflow-hidden max-h-[85vh] flex flex-col"
        dir={direction}
      >
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {t.hairColor.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
              {t.hairColor.description}
            </DialogDescription>
          </DialogHeader>

          {/* Hair Color Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
            {hairColors.map((color) => {
              const isSelected = selectedId === color.id;
              const effLevel = getEffectivenessLevel(color.effectiveness);
              const effConfig = effectivenessConfig[effLevel];

              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedId(isSelected ? null : color.id)}
                  className={[
                    'rounded-xl border p-4 text-start transition-all duration-200',
                    'hover:border-medical-blue/50 hover:shadow-md',
                    isSelected
                      ? 'border-medical-blue bg-medical-blue/5 shadow-md ring-1 ring-medical-blue/20'
                      : 'border-border/60',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full shrink-0 border-2 border-white/20 shadow-inner"
                      style={{ backgroundColor: color.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-semibold text-foreground">
                          {color.label}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-2 py-0 ${effConfig.className}`}
                        >
                          {locale === 'en' ? effConfig.labelEn : effConfig.labelFa}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {color.response}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Detail */}
          <AnimatePresence>
            {selectedColor && (
              <motion.div
                key={selectedColor.id}
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-5 rounded-2xl border border-medical-blue/20 bg-medical-blue/5 p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full shrink-0 border-2 border-white/20 shadow-inner mt-0.5"
                      style={{ backgroundColor: selectedColor.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h4 className="font-semibold text-foreground text-sm">
                          {selectedColor.label}
                        </h4>
                        {(() => {
                          const effLevel = getEffectivenessLevel(selectedColor.effectiveness);
                          const effConfig = effectivenessConfig[effLevel];
                          return (
                            <Badge
                              variant="outline"
                              className={`text-[10px] px-2 py-0 ${effConfig.className}`}
                            >
                              {locale === 'en' ? effConfig.labelEn : effConfig.labelFa}
                            </Badge>
                          );
                        })()}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedColor.response}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Note */}
          <p className="text-xs text-muted-foreground/60 mt-6 leading-relaxed italic">
            {t.hairColor.note}
          </p>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/50 mt-3 leading-relaxed">
            {t.disclaimer[locale]}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
