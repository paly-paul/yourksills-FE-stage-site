"use client";

import { create } from "zustand";

interface JobExperience {
  title: string;
  experience: string;
}

interface QuestionnaireModalState {
  isModalOpen: boolean;
  initialValues: JobExperience;
  openModal: (values: JobExperience) => void;
  closeModal: () => void;
  title: string;
  experience: string;
  question: string;
  setTitle: (title: string) => void;
  setExperience: (experience: string) => void;
  setQuestion: (question: string) => void;
}

export const useQuestionnaireModalStore = create<QuestionnaireModalState>(
  (set) => ({
    isModalOpen: false,
    initialValues: { title: "", experience: "" },
    title: "",
    experience: "",
    question: "",
    setTitle: (title) => set({ title }),
    setExperience: (experience) => set({ experience }),
    setQuestion: (question) => set({ question }),
    openModal: (values) =>
      set({
        initialValues: values,
        isModalOpen: true,
      }),
    closeModal: () =>
      set({
        isModalOpen: false,
        initialValues: { title: "", experience: "" },
      }),
  })
);
