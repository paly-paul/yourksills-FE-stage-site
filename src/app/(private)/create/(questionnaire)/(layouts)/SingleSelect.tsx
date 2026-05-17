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

const SingleSelect = ({
  question,
  setIsCompleted,
  existingAnswer,
}: {
  question: Question;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  existingAnswer?: QuestionnaireResponseType;
}) => {
  const [selected, setSelected] = useState<string>(""),
    [otherReason, setOtherReason] = useState<string>(""),
    setResponse = useQuestionnaireResponseStore((state) => state.setResponse);

  const optionList = dedupeOptionsPreservingOrder(question.options);

  // Initialize with existing answer if available
  useEffect(() => {
    if (existingAnswer === undefined) return;

    if (typeof existingAnswer === "string") {
      setSelected(existingAnswer);
      setOtherReason("");
      setIsCompleted(true);
      return;
    }

    if (
      typeof existingAnswer === "object" &&
      "selected" in existingAnswer &&
      "otherReason" in existingAnswer
    ) {
      setSelected(existingAnswer.selected);
      setOtherReason(existingAnswer.otherReason);
      setIsCompleted(
        isOtherLikeOption(existingAnswer.selected)
          ? existingAnswer.otherReason.trim().length > 0
          : true
      );
    }
  }, [existingAnswer, setIsCompleted]);

  const handleSelect = (option: string) => {
    if (isOtherLikeOption(option) && option === selected) {
      return;
    }

    setSelected(option);
    setOtherReason("");

    if (isOtherLikeOption(option)) {
      setIsCompleted(false);
      setResponse({
        value: { selected: option, otherReason: "" },
        parameter: question.parameter,
        answer_type: question.type,
      });
      return;
    }

    setIsCompleted(true);
    setResponse({
      value: option,
      parameter: question.parameter,
      answer_type: question.type,
    });
  };

  const handleOtherText = (value: string) => {
    setOtherReason(value);
    const ok = value.trim().length > 0;
    setIsCompleted(ok);
    setResponse({
      value: { selected, otherReason: value },
      parameter: question.parameter,
      answer_type: question.type,
    });
  };

  const isOther = isOtherLikeOption(selected);

  return (
    <React.Fragment>
      <IconAndQuestionText question={question} />

      <Options
        options={optionList}
        type={question.type}
        action={handleSelect}
        selected={selected}
        setOtherReason={handleOtherText}
        isOther={isOther}
        otherReason={otherReason}
      />
    </React.Fragment>
  );
};

export default SingleSelect;
