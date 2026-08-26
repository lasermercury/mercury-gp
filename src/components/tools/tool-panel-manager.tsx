'use client';

import dynamic from 'next/dynamic';
import { useToolStore, type ToolPanel } from '@/store/use-tool-store';
import type { ComponentType } from 'react';

const SuitabilityTest = dynamic(() => import('@/components/tools/suitability-test'), { ssr: false });
const SkinTypeChecker = dynamic(() => import('@/components/tools/skin-type-checker'), { ssr: false });
const HairColorChecker = dynamic(() => import('@/components/tools/hair-color-checker'), { ssr: false });
const TreatmentPlanner = dynamic(() => import('@/components/tools/treatment-planner'), { ssr: false });
const FaqAssistant = dynamic(() => import('@/components/tools/faq-assistant'), { ssr: false });
const SessionCalculator = dynamic(() => import('@/components/tools/session-calculator'), { ssr: false });
const ProgressTracker = dynamic(() => import('@/components/tools/progress-tracker'), { ssr: false });

const toolComponents: Record<Exclude<ToolPanel, null>, ComponentType> = {
  'suitability-test': SuitabilityTest,
  'skin-type-checker': SkinTypeChecker,
  'hair-color-checker': HairColorChecker,
  'treatment-planner': TreatmentPlanner,
  'faq-assistant': FaqAssistant,
  'session-calculator': SessionCalculator,
  'progress-tracker': ProgressTracker,
};

export function ToolPanelManager() {
  const { activeTool } = useToolStore();

  if (!activeTool) return null;

  const ToolComponent = toolComponents[activeTool];
  if (!ToolComponent) return null;

  return <ToolComponent />;
}
