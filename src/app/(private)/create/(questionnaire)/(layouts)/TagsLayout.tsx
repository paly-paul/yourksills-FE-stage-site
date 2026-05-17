"use client";

import React, { useEffect, useState } from "react";
import { Question } from "../QuestionSlider";
import IconAndQuestionText from "./(layoutComponents)/IconAndQuestionText";
import AddChip from "./(layoutComponents)/AddChip";
import Options from "./(layoutComponents)/Options";
import {
  useQuestionnaireResponseStore,
  QuestionnaireResponseType,
} from "@/store/useQuestionnaireResponseStore";
import { dedupeOptionsPreservingOrder } from "../helper/otherOptionUtils";

const TagsLayout = ({
  question,
  setIsCompleted,
  existingAnswer,
}: {
  question: Question;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  existingAnswer?: QuestionnaireResponseType;
}) => {
  const maxSelections = 3;
  const [poolOptions, setPoolOptions] = useState<string[]>(
    () => dedupeOptionsPreservingOrder(question.options) ?? []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newOption, setNewOption] = useState<string>("");
  const setResponse = useQuestionnaireResponseStore((state) => state.setResponse);

  useEffect(() => {
    const base = dedupeOptionsPreservingOrder(question.options) ?? [];
    if (existingAnswer && Array.isArray(existingAnswer)) {
      setSelectedTags(existingAnswer);
      setPoolOptions(Array.from(new Set([...base, ...existingAnswer])));
    } else {
      setSelectedTags([]);
      setPoolOptions(base);
    }
  }, [existingAnswer, question.parameter, question.options]);

  useEffect(() => {
    setIsCompleted(selectedTags.length !== 0);
    if (selectedTags.length > 0) {
      setResponse({
        value: selectedTags,
        parameter: question.parameter,
        answer_type: question.type,
      });
    }
  }, [selectedTags, question.parameter, question.type, setIsCompleted, setResponse]);

  const toggleOption = (option: string) => {
    setSelectedTags((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  /** AddChip appends to selection; merge any new free-text tag into the pickable pool */
  const handleAddChipSetOptions = (value: string[]) => {
    setSelectedTags(value);
    setPoolOptions((prev) => {
      const next = new Set(prev);
      value.forEach((v) => next.add(v));
      return Array.from(next);
    });
  };

  return (
    <React.Fragment>
      <IconAndQuestionText question={question} />

      <Options
        options={poolOptions}
        type={question.type}
        action={toggleOption}
        selectedOptions={selectedTags}
        limit={maxSelections}
      />

      <AddChip
        isAdding={isAdding}
        newOption={newOption}
        setIsAdding={setIsAdding}
        setNewOption={setNewOption}
        options={selectedTags}
        selectionBase={selectedTags}
        setOptions={handleAddChipSetOptions}
        maxItems={maxSelections}
      />
    </React.Fragment>
  );
};

export default TagsLayout;
