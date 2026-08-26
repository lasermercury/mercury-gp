import { create } from 'zustand';

export type ToolPanel =
  | 'suitability-test'
  | 'skin-type-checker'
  | 'hair-color-checker'
  | 'treatment-planner'
  | 'session-calculator'
  | 'faq-assistant'
  | 'progress-tracker'
  | null;

type ToolStore = {
  activeTool: ToolPanel;
  openTool: (tool: ToolPanel) => void;
  closeTool: () => void;
};

export const useToolStore = create<ToolStore>((set) => ({
  activeTool: null,
  openTool: (tool) => set({ activeTool: tool }),
  closeTool: () => set({ activeTool: null }),
}));
