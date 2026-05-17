"use client";

import React, { useEffect, useState } from "react";
import { Question } from "../QuestionSlider";
import IconAndQuestionText from "./(layoutComponents)/IconAndQuestionText";
import Options from "./(layoutComponents)/Options";
import {
  useQuestionnaireResponseStore,
  QuestionnaireResponseType,
} from "@/store/useQuestionnaireResponseStore";

const MultipleSelect = ({
  question,
  setIsCompleted,
  existingAnswer,
}: {
  question: Question;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  existingAnswer?: QuestionnaireResponseType;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]),
    setResponse = useQuestionnaireResponseStore((state) => state.setResponse);

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
          ? prev.filter((o) => o !== option) // deselect
          : [...prev, option] // select
    );
  };

  return (
    <React.Fragment>
      <IconAndQuestionText question={question} />

      <Options
        options={question.options}
        action={toggleOption}
        selectedOptions={selectedOptions}
      />
    </React.Fragment>
  );
};

export default MultipleSelect;
