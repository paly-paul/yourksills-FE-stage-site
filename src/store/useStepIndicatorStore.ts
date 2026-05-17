"use client";

import { create } from "zustand";

interface StepIndicatorState {
  completedStepsIndex: number;
  setCompletedStepIndex: (currentStep: number) => void;
}
export const useStepIndicatorStore = create<StepIndicatorState>((set) => ({
  completedStepsIndex: 0,
  setCompletedStepIndex: (completedStepsIndex) => set({ completedStepsIndex }),
}));
