"use client";

import React, { useEffect, useState } from "react";
import { Question } from "../QuestionSlider";
import IconAndQuestionText from "./(layoutComponents)/IconAndQuestionText";
import Options from "./(layoutComponents)/Options";
import {
  useQuestionnaireResponseStore,
  QuestionnaireResponseType,
} from "@/store/useQuestionnaireResponseStore";

const SingleWithTextField = ({
  question,
  setIsCompleted,
  existingAnswer,
}: {
  question: Question;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  existingAnswer?: QuestionnaireResponseType;
}) => {
  const [selected, setSelected] = useState<string>(""),
    [text, SetText] = useState<string>(""),
    setResponse = useQuestionnaireResponseStore((state) => state.setResponse),
    [textActive, SetTextActive] = useState<boolean>(false);

  // Initialize with existing answer if available
  useEffect(() => {
    if (
      existingAnswer &&
      typeof existingAnswer === "object" &&
      "selected" in existingAnswer &&
      "text" in existingAnswer
    ) {
      setSelected(existingAnswer.selected);
      SetText(existingAnswer.text);
      if (existingAnswer.selected === "Yes") {
        SetTextActive(true);
        setIsCompleted(existingAnswer.text.length > 0);
      } else {
        SetTextActive(false);
        setIsCompleted(true);
      }
    } else {
      setIsCompleted(false);
    }
  }, [existingAnswer, setIsCompleted]);

  const handleSelect = (value: string) => {
    setSelected(value);

    if (value === "Yes") {
      setIsCompleted(false);
      SetTextActive(true);
    }
    if (value === "No") {
      setIsCompleted(true);
      SetTextActive(false);
      SetText("");
    }
    setResponse({
      value: { selected: value, text: "" },
      parameter: question.parameter,
      answer_type: question.type,
    });
  };

  const handleFieldChange = (value: string) => {
    setIsCompleted(value.length > 0);
    SetText(value);
    setResponse({
      value: { selected, text: value },
      parameter: question.parameter,
      answer_type: question.type,
    });
  };

  return (
    <React.Fragment>
      <IconAndQuestionText question={question} />

      <Options
        options={question.options}
        type={question.type}
        action={handleSelect}
        selected={selected}
      />

      <input
        disabled={!textActive}
        type='text'
        value={text}
        onChange={(e) => handleFieldChange(e.target.value)}
        className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent mt-4 ${
          textActive ? "" : "bg-gray-100 cursor-not-allowed"
        }`}
      />
    </React.Fragment>
  );
};

export default SingleWithTextField;
