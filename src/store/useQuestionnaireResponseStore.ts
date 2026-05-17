import { create } from "zustand";

export type QuestionnaireResponseType =
  | string
  | string[]
  | number
  | {
      title: string;
      experience: string;
    }
  | {
      selected: string;
      selectedField: string;
      /** When `selectedField` is an "Other"-style option, the user-entered value */
      otherFieldText?: string;
    }
  | {
      selected: string;
      otherReason: string;
    }
  | {
      selected: string;
      text: string;
    };

type AnswerEntry = {
  parameter: string;
  answer_type: string;
  value: QuestionnaireResponseType;
};

interface QuestionnaireResponseState {
  step: string;
  setStep: (step: string) => void;
  responseArray: Map<string, AnswerEntry[]>;
  setResponse: (answer: AnswerEntry) => void;
  getAnswer: (step: string) => AnswerEntry[] | undefined;
}

export const useQuestionnaireResponseStore = create<QuestionnaireResponseState>(
  (set, get) => ({
    step: "Missing Entries",
    setStep: (step) => {
      set({ step });
    },
    responseArray: new Map(),
    setResponse: (answer) => {
      set((state) => {
        const newMap = new Map(state.responseArray);
        const existingAnswers = newMap.get(state.step) ?? [];
        // Check if parameter already exists
        const index = existingAnswers.findIndex(
          (entry: AnswerEntry) => entry.parameter === answer.parameter
        );
        let updatedAnswers: AnswerEntry[];
        if (index !== -1) {
          // Replace existing entry
          updatedAnswers = [...existingAnswers];
          updatedAnswers[index] = answer;
        } else {
          // Append new entry
          updatedAnswers = [...existingAnswers, answer];
        }
        newMap.set(state.step, updatedAnswers);
        return { responseArray: newMap };
      });
    },

    getAnswer: (step) => {
      return get().responseArray.get(step);
    },
  })
);
