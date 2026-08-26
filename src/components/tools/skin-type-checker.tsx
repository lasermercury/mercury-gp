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

function getSuitabilityBadgeVariant(suitability: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  const lower = suitability.toLowerCase();
  if (lower.includes('not recommended') || lower.includes('توصیه نمی‌شود')) return 'destructive';
  if (lower.includes('reduced') || lower.includes('low contrast') || lower.includes('کاهش') || lower.includes('تضاد پایین')) return 'destructive';
  if (lower.includes('may be suitable') || lower.includes('ممکن است مناسب')) return 'outline';
  if (lower.includes('good') || lower.includes('high contrast') || lower.includes('تضاد') || lower.includes('خوب')) return 'default';
  return 'secondary';
}

export default function SkinTypeChecker() {
  const { locale, direction } = useLocale();
  const { activeTool, closeTool } = useToolStore();
  const t = locale === 'fa' ? toolsFa : toolsEn;

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isOpen = activeTool === 'skin-type-checker';
  const skinTones = t.skinType.skinTones;
  const selectedTone = skinTones.find((s) => s.id === selectedId) ?? null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { closeTool(); setSelectedId(null); } }}>
      <DialogContent
        className="sm:max-w-2xl rounded-2xl bg-background p-0 overflow-hidden max-h-[85vh] flex flex-col"
        dir={direction}
      >
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {t.skinType.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
              {t.skinType.description}
            </DialogDescription>
          </DialogHeader>

          {/* Skin Tone Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {skinTones.map((tone) => {
              const isSelected = selectedId === tone.id;
              return (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => setSelectedId(isSelected ? null : tone.id)}
                  className={[
                    'rounded-xl border p-4 text-start transition-all duration-200',
                    'hover:border-medical-blue/50 hover:shadow-md',
                    isSelected
                      ? 'border-medical-blue bg-medical-blue/5 shadow-md ring-1 ring-medical-blue/20'
                      : 'border-border/60',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-12 h-12 rounded-full shrink-0 border-2 border-white/20 shadow-inner"
                      style={{ backgroundColor: tone.color }}
                    />
                    <span className="text-sm font-semibold text-foreground leading-tight">
                      {tone.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {tone.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Expanded Detail */}
          <AnimatePresence>
            {selectedTone && (
              <motion.div
                key={selectedTone.id}
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
                      style={{ backgroundColor: selectedTone.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-sm mb-1">
                        {selectedTone.label}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {selectedTone.description}
                      </p>
                      <div>
                        <Badge
                          variant={getSuitabilityBadgeVariant(selectedTone.suitability)}
                          className="mb-2"
                        >
                          {locale === 'en' ? 'Suitability' : 'تطابق‌پذیری'}
                        </Badge>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {selectedTone.suitability}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Note */}
          <p className="text-xs text-muted-foreground/60 mt-6 leading-relaxed italic">
            {t.skinType.note}
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
