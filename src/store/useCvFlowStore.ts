"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CvFlowState {
  withCv: boolean;
  setWithCv: (withCv: boolean) => void;
  referenceId: string;
  setReferenceId: (referenceId: string) => void;
  jobTitle: string;
  setJobTitle: (jobTitle: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  resetFlow: () => void;
}
export const useCvFlowStore = create<CvFlowState>()(
  persist(
    (set) => ({
      withCv: true,
      setWithCv: (withCv) => set({ withCv }),
      referenceId: "",
      setReferenceId: (referenceId) => set({ referenceId }),
      jobTitle: "Manager", //TODO: Remove this default value
      setJobTitle: (jobTitle) => set({ jobTitle }),
      file: null,
      setFile: (file) => set({ file }),
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      resetFlow: () =>
        set({
          withCv: true,
          referenceId: "",
          jobTitle: "Manager",
          file: null,
        }),
    }),
    {
      name: "cv-flow-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        withCv: state.withCv,
        referenceId: state.referenceId,
        jobTitle: state.jobTitle,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setFile(null);
        state?.setHasHydrated(true);
      },
    }
  )
);
