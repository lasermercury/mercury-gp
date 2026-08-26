'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CalendarDays, Clock, RotateCcw, CheckCircle2 } from 'lucide-react';
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

/* ───────────── phase icon map ───────────── */
const phaseIcons = ['🔥', '⚡', '🛡️'] as const;

/* ───────────── helpers ───────────── */
function parseWeekRange(weeksStr: string): { min: number; max: number } {
  const nums = weeksStr
    .replace(/[–\-–]/g, '-')
    .split('-')
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));
  if (nums.length >= 2) return { min: nums[0], max: nums[1] };
  if (nums.length === 1) return { min: nums[0], max: nums[0] };
  return { min: 4, max: 8 };
}

function calculateSessions(weekRange: { min: number; max: number }, freqWeeks: number): { min: number; max: number } {
  return {
    min: Math.max(1, Math.round(weekRange.min / freqWeeks)),
    max: Math.max(1, Math.round(weekRange.max / freqWeeks)),
  };
}

function getNextDates(freqWeeks: number, count: number, locale: string): string {
  const dates: string[] = [];
  const now = new Date();
  const formatter = locale === 'fa'
    ? new Intl.DateTimeFormat('fa-IR', { month: 'short', day: 'numeric' })
    : new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

  for (let i = 1; i <= count; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + freqWeeks * 7 * i);
    dates.push(formatter.format(d));
  }
  return dates.join('  ·  ');
}

/* ───────────── component ───────────── */
export default function TreatmentPlanner() {
  const { locale, direction } = useLocale();
  const { activeTool, closeTool } = useToolStore();
  const t = locale === 'fa' ? toolsFa : toolsEn;
  const isRtl = direction === 'rtl';

  const [step, setStep] = useState(0);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedFreq, setSelectedFreq] = useState<number | null>(null);
  const [isForward, setIsForward] = useState(true);

  const isOpen = activeTool === 'treatment-planner';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  /* ── reset ── */
  const handleClose = useCallback(() => {
    closeTool();
    setTimeout(() => {
      setStep(0);
      setSelectedAreas([]);
      setSelectedFreq(null);
      setIsForward(true);
    }, 200);
  }, [closeTool]);

  const handleRestart = () => {
    setIsForward(false);
    setStep(0);
    setSelectedAreas([]);
    setSelectedFreq(null);
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

  const canNext = step === 0 ? selectedAreas.length > 0 : selectedFreq !== null;

  /* ── computed plan ── */
  const plan = useMemo(() => {
    if (step !== 2 || selectedFreq === null) return null;
    return t.treatmentPlanner.phases.map((phase) => {
      if (phase.weeks === 'Ongoing') {
        return { ...phase, sessions: { min: 1, max: 1 }, isOngoing: true };
      }
      const weekRange = parseWeekRange(phase.weeks);
      const sessions = calculateSessions(weekRange, selectedFreq);
      return { ...phase, sessions, isOngoing: false };
    });
  }, [step, selectedFreq, t.treatmentPlanner.phases]);

  const nextDates = useMemo(() => {
    if (selectedFreq === null) return '';
    return getNextDates(selectedFreq, 4, locale);
  }, [selectedFreq, locale]);

  const stepLabels = [
    locale === 'fa' ? 'انتخاب ناحیه' : 'Select Areas',
    locale === 'fa' ? 'فرکانس' : 'Frequency',
    locale === 'fa' ? 'برنامه شما' : 'Your Plan',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent
        className="sm:max-w-2xl rounded-2xl bg-background p-0 overflow-hidden"
        dir={direction}
      >
        {/* Step indicator */}
        <div className="flex items-center gap-2 px-6 pt-6 pb-2">
          {stepLabels.map((label, i) => {
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div
                  className={[
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-300',
                    isActive
                      ? 'bg-medical-blue text-white'
                      : isDone
                        ? 'bg-emerald-accent/15 text-emerald-accent'
                        : 'bg-border/60 text-muted-foreground/60',
                  ].join(' ')}
                >
                  {isDone ? <CheckCircle2 className="size-3.5" /> : i + 1}
                </div>
                <span
                  className={[
                    'text-xs font-medium truncate transition-colors',
                    isActive ? 'text-foreground' : 'text-muted-foreground/60',
                  ].join(' ')}
                >
                  {label}
                </span>
                {i < stepLabels.length - 1 && (
                  <div
                    className={[
                      'flex-1 h-px min-w-[12px] transition-colors',
                      i < step ? 'bg-emerald-accent/30' : 'bg-border/40',
                    ].join(' ')}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <DialogHeader className="mb-5">
            <DialogTitle className="text-xl font-bold text-foreground">
              {t.treatmentPlanner.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
              {t.treatmentPlanner.description}
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait" custom={[direction, isForward] as const}>
            {/* ═══════ STEP 0 — Select Areas ═══════ */}
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
                  {t.treatmentPlanner.areas.map((area) => {
                    const isSelected = selectedAreas.includes(area.id);
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => toggleArea(area.id)}
                        className={[
                          'rounded-xl border p-4 flex flex-col items-center gap-2 text-center transition-all duration-200',
                          'hover:border-medical-blue/50 hover:bg-medical-blue/5',
                          isSelected
                            ? 'border-medical-blue bg-medical-blue/5 shadow-sm'
                            : 'border-border/60',
                        ].join(' ')}
                      >
                        <span className="text-2xl leading-none">{area.icon}</span>
                        <span className={[
                          'text-sm font-medium leading-tight',
                          isSelected ? 'text-foreground' : 'text-muted-foreground',
                        ].join(' ')}>
                          {area.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ═══════ STEP 1 — Select Frequency ═══════ */}
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={[direction, isForward] as const}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="space-y-3">
                  {t.treatmentPlanner.frequencyOptions.map((opt) => {
                    const isSelected = selectedFreq === opt.weeks;
                    return (
                      <button
                        key={opt.weeks}
                        type="button"
                        onClick={() => setSelectedFreq(opt.weeks)}
                        className={[
                          'w-full rounded-xl border p-4 text-start transition-all duration-200',
                          'hover:border-medical-blue/50 hover:bg-medical-blue/5',
                          isSelected
                            ? 'border-medical-blue bg-medical-blue/5 shadow-sm'
                            : 'border-border/60',
                        ].join(' ')}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={[
                              'w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors',
                              isSelected ? 'border-medical-blue' : 'border-border',
                            ].join(' ')}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-medical-blue" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="size-4 text-muted-foreground/60" />
                            <span className={[
                              'text-sm font-medium',
                              isSelected ? 'text-foreground' : 'text-muted-foreground',
                            ].join(' ')}>
                              {opt.label}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected areas summary */}
                <div className="mt-6">
                  <p className="text-xs text-muted-foreground/60 mb-2">
                    {locale === 'fa' ? 'نواحی انتخاب‌شده:' : 'Selected areas:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAreas.map((id) => {
                      const area = t.treatmentPlanner.areas.find((a) => a.id === id);
                      if (!area) return null;
                      return (
                        <Badge
                          key={id}
                          variant="secondary"
                          className="rounded-full gap-1.5 px-3 py-1 text-xs"
                        >
                          <span>{area.icon}</span>
                          {area.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══════ STEP 2 — Generated Plan ═══════ */}
            {step === 2 && plan && (
              <motion.div
                key="step-2"
                custom={[direction, isForward] as const}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Phase cards */}
                <div className="space-y-4">
                  {plan.map((phase, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border/60 p-5 hover:border-medical-blue/30 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-medical-blue/10 flex items-center justify-center shrink-0 text-lg">
                          {phaseIcons[i]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="text-sm font-bold text-foreground">
                              {phase.label}
                            </h4>
                            <Badge
                              variant="outline"
                              className="border-medical-blue/30 text-medical-blue text-[10px] px-2 py-0"
                            >
                              {phase.weeks}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                            {phase.description}
                          </p>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <CalendarDays className="size-3.5" />
                              {phase.isOngoing ? (
                                <span className="text-emerald-accent font-medium">
                                  {locale === 'fa' ? 'ماهی ۱ جلسه' : '1× / month'}
                                </span>
                              ) : (
                                <span>
                                  {phase.sessions.min === phase.sessions.max
                                    ? `${phase.sessions.min} ${locale === 'fa' ? 'جلسه' : 'sessions'}`
                                    : `${phase.sessions.min}–${phase.sessions.max} ${locale === 'fa' ? 'جلسه' : 'sessions'}`}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Suggested next dates */}
                {selectedFreq !== null && (
                  <div className="mt-6 rounded-xl bg-medical-blue/5 border border-medical-blue/20 p-4">
                    <p className="text-xs font-semibold text-foreground mb-1.5">
                      {locale === 'fa' ? 'تاریخ‌های پیشنهادی بعدی:' : 'Suggested next session dates:'}
                    </p>
                    <p className="text-xs text-medical-blue leading-relaxed">
                      {nextDates}
                    </p>
                  </div>
                )}

                {/* Areas summary */}
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground/60 mb-2">
                    {locale === 'fa' ? 'نواحی درمان:' : 'Treatment areas:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAreas.map((id) => {
                      const area = t.treatmentPlanner.areas.find((a) => a.id === id);
                      if (!area) return null;
                      return (
                        <Badge
                          key={id}
                          variant="secondary"
                          className="rounded-full gap-1.5 px-3 py-1 text-xs"
                        >
                          <span>{area.icon}</span>
                          {area.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══════ NAVIGATION ═══════ */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-border/40">
            {step === 2 ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRestart}
                className="text-muted-foreground gap-2"
              >
                <RotateCcw className="size-4" />
                {locale === 'fa' ? 'شروع مجدد' : 'Restart'}
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
                {step === 1 ? t.treatmentPlanner.generateLabel : (locale === 'fa' ? 'بعدی' : 'Next')}
                {step < 1 && <ArrowIcon className="size-4" />}
              </Button>
            ) : null}
          </div>

          {/* ═══════ DISCLAIMER ═══════ */}
          <p className="text-xs text-muted-foreground/50 mt-6 leading-relaxed text-center">
            {t.treatmentPlanner.disclaimer}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
