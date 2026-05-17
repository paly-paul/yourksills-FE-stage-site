"use client";

import React, { useState, useEffect } from "react";
import { Question } from "../QuestionSlider";
import IconAndQuestionText from "./(layoutComponents)/IconAndQuestionText";
import Options from "./(layoutComponents)/Options";
import {
  useQuestionnaireResponseStore,
  QuestionnaireResponseType,
} from "@/store/useQuestionnaireResponseStore";
import {
  dedupeOptionsPreservingOrder,
  isOtherLikeOption,
} from "../helper/otherOptionUtils";

const SingleWithInput = ({
  question,
  setIsCompleted,
  existingAnswer,
}: {
  question: Question;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  existingAnswer?: QuestionnaireResponseType;
}) => {
  const [selected, setSelected] = useState<string>(""),
    setResponse = useQuestionnaireResponseStore((state) => state.setResponse),
    [otherReason, setOtherReason] = useState<string>("");

  const optionList = dedupeOptionsPreservingOrder(question.options);

  // Initialize with existing answer if available
  useEffect(() => {
    if (
      existingAnswer &&
      typeof existingAnswer === "object" &&
      "selected" in existingAnswer &&
      "otherReason" in existingAnswer
    ) {
      setSelected(existingAnswer.selected);
      setOtherReason(existingAnswer.otherReason);
      const other = isOtherLikeOption(existingAnswer.selected);
      setIsCompleted(
        other ? existingAnswer.otherReason.trim().length > 0 : true
      );
    }
  }, [existingAnswer, setIsCompleted]);

  const isOther = isOtherLikeOption(selected);

  const handleSelect = (value: string) => {
    if (isOtherLikeOption(value) && value === selected) {
      return;
    }

    setSelected(value);
    setOtherReason("");
    const choosingOther = isOtherLikeOption(value);
    setIsCompleted(!choosingOther);
    setResponse({
      value: { selected: value, otherReason: "" },
      parameter: question.parameter,
      answer_type: question.type,
    });
  };

  const handleFieldChange = (value: string) => {
    setIsCompleted(value.length > 0);
    setOtherReason(value);
    setResponse({
      value: { selected, otherReason: value },
      parameter: question.parameter,
      answer_type: question.type,
    });
  };

  return (
    <React.Fragment>
      <IconAndQuestionText question={question} />

      <Options
        options={optionList}
        type={question.type}
        action={handleSelect}
        selected={selected}
        setOtherReason={handleFieldChange}
        isOther={isOther}
        otherReason={otherReason}
      />
    </React.Fragment>
  );
};

export default SingleWithInput;
