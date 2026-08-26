'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle, AlertTriangle, XCircle, Stethoscope } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/layout/providers';
import { useToolStore } from '@/store/use-tool-store';
import { toolsEn } from '@/content/en/tools';
import { toolsFa } from '@/content/fa/tools';

import type { LucideIcon } from 'lucide-react';

type ResultLevel = 'suitable' | 'caution' | 'notRecommended' | 'consultProfessional';

type Answers = Record<string, string>;

const slideVariants = {
  enter: (dir: 'ltr' | 'rtl', isForward: boolean) => ({
    x: (() => {
      if (dir === 'ltr') return isForward ? 60 : -60;
      return isForward ? -60 : 60;
    })(),
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: 'ltr' | 'rtl', isForward: boolean) => ({
    x: (() => {
      if (dir === 'ltr') return isForward ? -60 : 60;
      return isForward ? 60 : -60;
    })(),
    opacity: 0,
  }),
};

const resultConfig: Record<
  ResultLevel,
  {
    borderColor: string;
    bgColor: string;
    textColor: string;
    iconBg: string;
    Icon: LucideIcon;
  }
> = {
  suitable: {
    borderColor: 'border-emerald-accent/40',
    bgColor: 'bg-emerald-accent/5',
    textColor: 'text-emerald-accent',
    iconBg: 'bg-emerald-accent/15',
    Icon: CheckCircle,
  },
  caution: {
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-500/5',
    textColor: 'text-amber-600',
    iconBg: 'bg-amber-500/15',
    Icon: AlertTriangle,
  },
  notRecommended: {
    borderColor: 'border-red-500/40',
    bgColor: 'bg-red-500/5',
    textColor: 'text-red-600',
    iconBg: 'bg-red-500/15',
    Icon: XCircle,
  },
  consultProfessional: {
    borderColor: 'border-medical-blue/40',
    bgColor: 'bg-medical-blue/5',
    textColor: 'text-medical-blue',
    iconBg: 'bg-medical-blue/15',
    Icon: Stethoscope,
  },
};

function calculateResult(answers: Answers): ResultLevel {
  // pregnancy='yes' OR medication='yes' → notRecommended
  if (answers.pregnancy === 'yes' || answers.medication === 'yes') {
    return 'notRecommended';
  }

  // If any answer is 'unsure' → consultProfessional
  const hasUnsure = Object.values(answers).some((v) => v === 'unsure');
  if (hasUnsure) {
    return 'consultProfessional';
  }

  // Skin tone / hair color caution checks
  const darkSkin = ['dark-brown', 'very-dark'].includes(answers.skinTone ?? '');
  const lightHair = ['blonde', 'red', 'white'].includes(answers.hairColor ?? '');

  if (darkSkin || lightHair) {
    return 'caution';
  }

  return 'suitable';
}

export default function SuitabilityTest() {
  const { locale, direction } = useLocale();
  const { activeTool, closeTool } = useToolStore();
  const t = locale === 'fa' ? toolsFa : toolsEn;
  const isRtl = direction === 'rtl';

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<ResultLevel | null>(null);
  const [isForward, setIsForward] = useState(true);

  const isOpen = activeTool === 'suitability-test';
  const questions = t.suitability.questions;
  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleClose = useCallback(() => {
    closeTool();
    // Reset state after animation
    setTimeout(() => {
      setCurrentStep(0);
      setAnswers({});
      setResult(null);
      setIsForward(true);
    }, 200);
  }, [closeTool]);

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    if (!answers[currentQuestion.id]) return;

    if (isLastStep) {
      setIsForward(true);
      setResult(calculateResult(answers));
    } else {
      setIsForward(true);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (result) {
      setResult(null);
      return;
    }
    if (currentStep > 0) {
      setIsForward(false);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setIsForward(true);
  };

  const canProceed = !result && answers[currentQuestion?.id];
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const resultData = result ? t.suitability.results[result] : null;
  const config = result ? resultConfig[result] : null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent
        className="sm:max-w-2xl rounded-2xl bg-background p-0 overflow-hidden"
        dir={direction}
      >
        {/* Progress Bar */}
        <div className="h-1 bg-border w-full">
          <motion.div
            className="h-full bg-medical-blue"
            initial={{ width: 0 }}
            animate={{ width: `${result ? 100 : progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        <div className="p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {t.suitability.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
              {result
                ? ''
                : `${locale === 'fa' ? 'سؤال' : 'Question'} ${currentStep + 1} ${locale === 'fa' ? 'از' : 'of'} ${totalSteps}`
              }
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait" custom={[direction, isForward]}>
            {result && resultData && config ? (
              /* ========== RESULT VIEW ========== */
              <motion.div
                key="result"
                custom={[direction, isForward] as const}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6"
              >
                {/* Result Card */}
                <div className={`rounded-2xl border-2 ${config.borderColor} ${config.bgColor} p-6`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${config.iconBg} flex items-center justify-center shrink-0`}>
                      <config.Icon className={`size-6 ${config.textColor}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${config.textColor}`}>
                        {resultData.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {resultData.description}
                  </p>
                  <div className="space-y-3">
                    {resultData.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className={`w-6 h-6 rounded-full ${config.iconBg} ${config.textColor} text-xs font-bold flex items-center justify-center shrink-0 mt-0.5`}>
                          {i + 1}
                        </span>
                        <p className="text-sm text-foreground/80 leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : currentQuestion ? (
              /* ========== QUESTION VIEW ========== */
              <motion.div
                key={`step-${currentStep}`}
                custom={[direction, isForward] as const}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6"
              >
                <h4 className="text-base font-semibold text-foreground mb-5 leading-relaxed">
                  {currentQuestion.question}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelect(option.value)}
                        className={[
                          'rounded-xl border p-4 text-start text-sm font-medium transition-all duration-200',
                          'hover:border-medical-blue/50 hover:bg-medical-blue/5',
                          isSelected
                            ? 'border-medical-blue bg-medical-blue/5 text-foreground shadow-sm'
                            : 'border-border/60 text-muted-foreground',
                        ].join(' ')}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={[
                              'w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors',
                              isSelected
                                ? 'border-medical-blue'
                                : 'border-border',
                            ].join(' ')}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-medical-blue" />
                            )}
                          </div>
                          <span>{option.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* ========== NAVIGATION BUTTONS ========== */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-border/40">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              disabled={currentStep === 0 && !result}
              className="text-muted-foreground"
            >
              {result
                ? t.suitability.prevLabel
                : currentStep === 0
                  ? ''
                  : t.suitability.prevLabel
              }
            </Button>

            {result ? (
              <Button
                onClick={handleRestart}
                size="sm"
                className="bg-medical-blue text-white hover:bg-medical-blue/90 rounded-full gap-2"
              >
                <RotateCcw className="size-4" />
                {t.suitability.restartLabel}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                size="sm"
                className="bg-medical-blue text-white hover:bg-medical-blue/90 rounded-full gap-2 disabled:opacity-40 disabled:pointer-events-none"
              >
                {isLastStep ? t.suitability.resultLabel : t.suitability.nextLabel}
                {!isLastStep && <ArrowIcon className="size-4" />}
              </Button>
            )}
          </div>

          {/* ========== DISCLAIMER ========== */}
          <p className="text-xs text-muted-foreground/50 mt-6 leading-relaxed text-center">
            {t.disclaimer[locale]}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
