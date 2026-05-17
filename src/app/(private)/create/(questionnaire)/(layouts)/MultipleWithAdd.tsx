"use client";

import React, { useEffect, useState } from "react";
import IconAndQuestionText from "./(layoutComponents)/IconAndQuestionText";
import { Question } from "../QuestionSlider";
import Options from "./(layoutComponents)/Options";
import AddChip from "./(layoutComponents)/AddChip";
import {
  useQuestionnaireResponseStore,
  QuestionnaireResponseType,
} from "@/store/useQuestionnaireResponseStore";

export default function MultipleWithAdd({
  question,
  setIsCompleted,
  existingAnswer,
}: {
  question: Question;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  existingAnswer?: QuestionnaireResponseType;
}) {
  const maxSelections = 3;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]),
    [options, setOptions] = useState<string[]>([]),
    [isAdding, setIsAdding] = useState<boolean>(false),
    setResponse = useQuestionnaireResponseStore((state) => state.setResponse),
    [newOption, setNewOption] = useState<string>("");

  useEffect(() => {
    setOptions(question.options ?? []);
  }, [question]);

  // Initialize with existing answer if available
  useEffect(() => {
    if (existingAnswer && Array.isArray(existingAnswer)) {
      setSelectedOptions(existingAnswer);
    }
  }, [existingAnswer]);

  useEffect(() => {
    setIsCompleted(selectedOptions.length !== 0);
    if (selectedOptions.length > 0) {
      setResponse({
        value: selectedOptions,
        parameter: question.parameter,
        answer_type: question.type,
      });
    }
  }, [selectedOptions, question.parameter, question.type, setIsCompleted, setResponse]);

  const toggleOption = (option: string) => {
    setSelectedOptions(
      (prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
    );
  };

  const handleAddCustomTag = (nextSelected: string[]) => {
    setSelectedOptions(nextSelected);
    setOptions(() => {
      const fromQuestion = question.options ?? [];
      const extras = nextSelected.filter((x) => !fromQuestion.includes(x));
      return Array.from(new Set([...fromQuestion, ...extras]));
    });
  };

  return (
    <React.Fragment>
      <IconAndQuestionText question={question} />
      <Options
        options={options}
        action={toggleOption}
        selectedOptions={selectedOptions}
        limit={maxSelections}
      />

      <AddChip
        isAdding={isAdding}
        newOption={newOption}
        setIsAdding={setIsAdding}
        setNewOption={setNewOption}
        options={selectedOptions}
        selectionBase={selectedOptions}
        setOptions={handleAddCustomTag}
        maxItems={maxSelections}
      />
    </React.Fragment>
  );
}
