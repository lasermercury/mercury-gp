'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/components/layout/providers';
import { useToolStore } from '@/store/use-tool-store';
import { toolsEn } from '@/content/en/tools';
import { toolsFa } from '@/content/fa/tools';

/* ───────────── slide transition ───────────── */
type SlideCustom = ['ltr' | 'rtl', boolean];

const slideVariants = {
  enter: ([dir, isForward]: SlideCustom) => ({
    x: dir === 'ltr' ? (isForward ? 60 : -60) : isForward ? -60 : 60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: ([dir, isForward]: SlideCustom) => ({
    x: dir === 'ltr' ? (isForward ? -60 : 60) : isForward ? 60 : -60,
    opacity: 0,
  }),
};

/* ───────────── session data table ───────────── */
type AreaSessionData = {
  baseMin: number;
  baseMax: number;
  maintenanceMin: number;
  maintenanceMax: number;
  maintenanceWeeks: string;
};

const areaSessionMap: Record<string, AreaSessionData> = {
  legs:        { baseMin: 8,  baseMax: 12, maintenanceMin: 4, maintenanceMax: 6, maintenanceWeeks: '4-6' },
  arms:        { baseMin: 6,  baseMax: 10, maintenanceMin: 6, maintenanceMax: 8, maintenanceWeeks: '6-8' },
  underarms:   { baseMin: 6,  baseMax: 8,  maintenanceMin: 4, maintenanceMax: 6, maintenanceWeeks: '4-6' },
  bikini:      { baseMin: 6,  baseMax: 8,  maintenanceMin: 4, maintenanceMax: 6, maintenanceWeeks: '4-6' },
  'upper-lip': { baseMin: 6,  baseMax: 8,  maintenanceMin: 6, maintenanceMax: 8, maintenanceWeeks: '6-8' },
  chin:        { baseMin: 6,  baseMax: 8,  maintenanceMin: 6, maintenanceMax: 8, maintenanceWeeks: '6-8' },
  'full-face': { baseMin: 8,  baseMax: 12, maintenanceMin: 4, maintenanceMax: 6, maintenanceWeeks: '4-6' },
  stomach:     { baseMin: 6,  baseMax: 10, maintenanceMin: 6, maintenanceMax: 8, maintenanceWeeks: '6-8' },
};

/* ───────────── adjustment helpers ───────────── */
function getDensityAdjustment(density: string): number {
  if (density === 'heavy') return 2;
  return 0;
}

function getColorAdjustment(color: string): number {
  if (color === 'dark') return -1;
  if (color === 'blonde' || color === 'red') return 3;
  return 0;
}

function calculateAreaEstimate(
  areaId: string,
  density: string,
  hairColor: string
): { min: number; max: number } {
  const base = areaSessionMap[areaId];
  if (!base) return { min: 6, max: 8 };

  const adjustment = getDensityAdjustment(density) + getColorAdjustment(hairColor);
  return {
    min: Math.max(4, base.baseMin + adjustment),
    max: Math.max(base.baseMin, base.baseMax + adjustment),
  };
}

function getMaintenanceWeeks(areaId: string): string {
  return areaSessionMap[areaId]?.maintenanceWeeks ?? '4-6';
}

/* ───────────── radio option component ───────────── */
function RadioOption({
  selected,
  onSelect,
  label,
  description,
  size = 'md',
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  description?: string;
  size?: 'md' | 'sm';
}) {
  const padding = size === 'sm' ? 'p-3.5' : 'p-4';
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-xl border ${padding} text-start transition-all duration-200 hover:border-medical-blue/50 hover:bg-medical-blue/5 ${selected ? 'border-medical-blue bg-medical-blue/5 shadow-sm' : 'border-border/60'}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${selected ? 'border-medical-blue' : 'border-border'}`}
        >
          {selected && (
            <div className="w-2.5 h-2.5 rounded-full bg-medical-blue" />
          )}
        </div>
        <div>
          <span className={`text-sm font-medium ${description ? 'block' : ''} ${selected ? 'text-foreground' : 'text-muted-foreground'}`}>
            {label}
          </span>
          {description && (
            <span className="text-xs text-muted-foreground/60">{description}</span>
          )}
        </div>
      </div>
    </button>
  );
}

/* ───────────── component ───────────── */
export default function SessionCalculator() {
  const { locale, direction } = useLocale();
  const { activeTool, closeTool } = useToolStore();
  const t = locale === 'fa' ? toolsFa : toolsEn;
  const sc = t.sessionCalculator;
  const isRtl = direction === 'rtl';

  const [step, setStep] = useState(0);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [density, setDensity] = useState<string>('');
  const [hairColor, setHairColor] = useState<string>('');
  const [sensitivity, setSensitivity] = useState<string>('');
  const [isForward, setIsForward] = useState(true);

  const isOpen = activeTool === 'session-calculator';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  /* ── reset ── */
  const handleClose = useCallback(() => {
    closeTool();
    setTimeout(() => {
      setStep(0);
      setSelectedAreas([]);
      setDensity('');
      setHairColor('');
      setSensitivity('');
      setIsForward(true);
    }, 200);
  }, [closeTool]);

  const handleRestart = () => {
    setIsForward(false);
    setStep(0);
    setSelectedAreas([]);
    setDensity('');
    setHairColor('');
    setSensitivity('');
  };

  /* ── area toggle ── */
  const toggleArea = (id: string) => {
    setSelectedAreas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  /* ── step navigation ── */
  const goNext = () => {
    if (step === 2) return;
    setIsForward(true);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step === 0) return;
    setIsForward(false);
    setStep((s) => s - 1);
  };

  const canNext =
    step === 0
      ? selectedAreas.length > 0
      : density !== '' && hairColor !== '' && sensitivity !== '';

  /* ── computed results ── */
  const areaResults = useMemo(() => {
    if (step !== 2 || selectedAreas.length === 0) return [];
    return selectedAreas.map((areaId) => {
      const estimate = calculateAreaEstimate(areaId, density, hairColor);
      const areaData = sc.areas.find((a) => a.id === areaId);
      const maintWeeks = getMaintenanceWeeks(areaId);
      return {
        areaId,
        emoji: areaData?.emoji ?? '',
        label: areaData?.label ?? areaId,
        ...estimate,
        maintWeeks,
      };
    });
  }, [step, selectedAreas, density, hairColor, sc.areas]);

  const totalEstimate = useMemo(() => {
    if (areaResults.length === 0) return null;
    const totals = areaResults.reduce(
      (acc, r) => ({ min: acc.min + r.min, max: acc.max + r.max }),
      { min: 0, max: 0 }
    );
    const weeksMin = totals.min * 2;
    const weeksMax = totals.max * 2;
    return {
      sessions: totals,
      weeks: { min: weeksMin, max: weeksMax },
      months: { min: Math.ceil(weeksMin / 4.33), max: Math.ceil(weeksMax / 4.33) },
    };
  }, [areaResults]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent
        className="sm:max-w-2xl rounded-2xl bg-background p-0 overflow-hidden max-h-[85vh] overflow-y-auto"
        dir={direction}
      >
        {/* Step indicator */}
        <div className="flex items-center gap-2 px-6 pt-6 pb-2">
          {sc.stepLabels.map((label, i) => {
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-300 ${isActive ? 'bg-medical-blue text-white' : isDone ? 'bg-emerald-accent/15 text-emerald-accent' : 'bg-border/60 text-muted-foreground/60'}`}
                >
                  {isDone ? <CheckCircle2 className="size-3.5" /> : i + 1}
                </div>
                <span
                  className={`text-xs font-medium truncate transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground/60'}`}
                >
                  {label}
                </span>
                {i < sc.stepLabels.length - 1 && (
                  <div
                    className={`flex-1 h-px min-w-[12px] transition-colors ${i < step ? 'bg-emerald-accent/30' : 'bg-border/40'}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <DialogHeader className="mb-5">
            <DialogTitle className="text-xl font-bold text-foreground">
              {sc.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
              {sc.description}
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait" custom={[direction, isForward] as const}>
            {/* STEP 0 - Select Areas */}
            {step === 0 && (
              <motion.div
                key="step-0"
                custom={[direction, isForward] as const}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {sc.areas.map((area) => {
                    const isSelected = selectedAreas.includes(area.id);
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => toggleArea(area.id)}
                        className={`rounded-xl border p-4 flex flex-col items-center gap-2 text-center transition-all duration-200 hover:border-medical-blue/50 hover:bg-medical-blue/5 ${isSelected ? 'border-medical-blue bg-medical-blue/5 shadow-sm' : 'border-border/60'}`}
                      >
                        <span className="text-2xl leading-none">{area.emoji}</span>
                        <span className={`text-sm font-medium leading-tight ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {area.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {selectedAreas.length > 0 && (
                  <p className="text-xs text-medical-blue mt-3">
                    {selectedAreas.length} {locale === 'fa' ? 'ناحیه انتخاب شد' : 'area(s) selected'}
                  </p>
                )}
              </motion.div>
            )}

            {/* STEP 1 - Hair Characteristics */}
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={[direction, isForward] as const}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5"
              >
                {/* Hair Density */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    {locale === 'fa' ? 'تراکم مو' : 'Hair Density'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {sc.densityOptions.map((opt) => (
                      <RadioOption
                        key={opt.id}
                        selected={density === opt.id}
                        onSelect={() => setDensity(opt.id)}
                        label={opt.label}
                        description={opt.description}
                      />
                    ))}
                  </div>
                </div>

                {/* Hair Color */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    {locale === 'fa' ? 'رنگ مو' : 'Hair Color'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sc.colorOptions.map((opt) => (
                      <RadioOption
                        key={opt.id}
                        selected={hairColor === opt.id}
                        onSelect={() => setHairColor(opt.id)}
                        label={opt.label}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Skin Sensitivity */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    {locale === 'fa' ? 'حساسیت پوست' : 'Skin Sensitivity'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {sc.sensitivityOptions.map((opt) => (
                      <RadioOption
                        key={opt.id}
                        selected={sensitivity === opt.id}
                        onSelect={() => setSensitivity(opt.id)}
                        label={opt.label}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Selected areas summary */}
                <div>
                  <p className="text-xs text-muted-foreground/60 mb-2">
                    {locale === 'fa' ? 'نواحی انتخاب‌شده:' : 'Selected areas:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAreas.map((id) => {
                      const area = sc.areas.find((a) => a.id === id);
                      if (!area) return null;
                      return (
                        <Badge
                          key={id}
                          variant="secondary"
                          className="rounded-full gap-1.5 px-3 py-1 text-xs"
                        >
                          <span>{area.emoji}</span>
                          {area.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Adjustment notes */}
                <div className="space-y-2">
                  {density === 'heavy' && (
                    <div className="flex items-start gap-2 rounded-lg bg-amber-500/5 border border-amber-500/20 px-3 py-2">
                      <AlertCircle className="size-3.5 text-amber-600 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-700">{sc.densityNote}</p>
                    </div>
                  )}
                  {(hairColor === 'blonde' || hairColor === 'red') && (
                    <div className="flex items-start gap-2 rounded-lg bg-amber-500/5 border border-amber-500/20 px-3 py-2">
                      <AlertCircle className="size-3.5 text-amber-600 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-700">{sc.colorNote}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 2 - Results */}
            {step === 2 && (
              <motion.div
                key="step-2"
                custom={[direction, isForward] as const}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-base font-bold text-foreground mb-4">
                  {sc.resultTitle}
                </h3>

                {/* Total estimate card */}
                {totalEstimate && (
                  <div className="rounded-xl bg-medical-blue/5 border border-medical-blue/20 p-5 mb-5">
                    <p className="text-xs font-semibold text-medical-blue mb-3 uppercase tracking-wide">
                      {sc.totalEstimated}
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-medical-blue">
                          {totalEstimate.sessions.min}–{totalEstimate.sessions.max}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{sc.sessionsLabel}</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-medical-blue">
                          {totalEstimate.weeks.min}–{totalEstimate.weeks.max}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{sc.weeksLabel}</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-emerald-accent">
                          {totalEstimate.months.min}–{totalEstimate.months.max}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {locale === 'fa' ? 'ماه' : 'months'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Per area breakdown */}
                <p className="text-xs font-semibold text-foreground/70 mb-3 uppercase tracking-wide">
                  {sc.perAreaLabel}
                </p>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {areaResults.map((area) => {
                    const midSessions = Math.round((area.min + area.max) / 2);
                    const maxRef = 14;
                    const progressPct = Math.min(100, Math.round((midSessions / maxRef) * 100));

                    return (
                      <div
                        key={area.areaId}
                        className="rounded-xl border border-border/60 p-4 hover:border-medical-blue/30 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{area.emoji}</span>
                            <span className="text-sm font-semibold text-foreground">{area.label}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-medical-blue font-medium">
                            <Clock className="size-3.5" />
                            {area.min}–{area.max} {sc.sessionsLabel}
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-2 rounded-full bg-border/40 overflow-hidden mb-2">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-medical-blue to-emerald-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                          />
                        </div>

                        {/* Maintenance info */}
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="border-emerald-accent/30 text-emerald-accent text-[10px] px-2 py-0"
                          >
                            {sc.maintenancePhase}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {locale === 'fa' ? 'هر' : 'every'} {area.maintWeeks} {sc.weeksLabel}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selection summary */}
                <div className="mt-5 rounded-lg bg-muted/40 p-4">
                  <p className="text-xs text-muted-foreground/60 mb-2 font-medium">
                    {locale === 'fa' ? 'خلاصه انتخاب‌ها' : 'Selection Summary'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedAreas.map((id) => {
                      const area = sc.areas.find((a) => a.id === id);
                      if (!area) return null;
                      return (
                        <Badge
                          key={id}
                          variant="secondary"
                          className="rounded-full gap-1 px-2.5 py-0.5 text-[11px]"
                        >
                          {area.emoji} {area.label}
                        </Badge>
                      );
                    })}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{sc.densityOptions.find((d) => d.id === density)?.label}</span>
                    <span>·</span>
                    <span>{sc.colorOptions.find((c) => c.id === hairColor)?.label}</span>
                    <span>·</span>
                    <span>{sc.sensitivityOptions.find((s) => s.id === sensitivity)?.label} {locale === 'fa' ? 'حساسیت' : 'sensitivity'}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* NAVIGATION */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-border/40">
            {step === 2 ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRestart}
                className="text-muted-foreground gap-2"
              >
                <RotateCcw className="size-4" />
                {sc.restartLabel}
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                disabled={step === 0}
                className="text-muted-foreground"
              >
                {step > 0 && (
                  <>
                    {isRtl ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
                    {locale === 'fa' ? 'قبلی' : 'Back'}
                  </>
                )}
              </Button>
            )}

            {step < 2 ? (
              <Button
                onClick={goNext}
                disabled={!canNext}
                size="sm"
                className="bg-medical-blue text-white hover:bg-medical-blue/90 rounded-full gap-2 disabled:opacity-40 disabled:pointer-events-none"
              >
                {step === 1 ? sc.generateLabel : (locale === 'fa' ? 'بعدی' : 'Next')}
                {step < 1 && <ArrowIcon className="size-4" />}
              </Button>
            ) : null}
          </div>

          {/* DISCLAIMER */}
          <p className="text-xs text-muted-foreground/50 mt-6 leading-relaxed text-center">
            {sc.disclaimer}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
