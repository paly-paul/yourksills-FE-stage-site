"use client";

import React, { useState, useEffect } from "react";
import { Question } from "../QuestionSlider";
import IconAndQuestionText from "./(layoutComponents)/IconAndQuestionText";
import SliderComponent from "./(layoutComponents)/SliderComponent";
import {
  useQuestionnaireResponseStore,
  QuestionnaireResponseType,
} from "@/store/useQuestionnaireResponseStore";

const SliderLayout = ({
  question,
  setIsCompleted,
  existingAnswer,
}: {
  question: Question;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  existingAnswer?: QuestionnaireResponseType;
}) => {
  const [sliderValue, setSliderValue] = useState<number>(0),
    setResponse = useQuestionnaireResponseStore((state) => state.setResponse);

  // Initialize with existing answer if available
  useEffect(() => {
    if (existingAnswer && typeof existingAnswer === "number") {
      setSliderValue(existingAnswer);
      setIsCompleted(existingAnswer !== 0);
    }
  }, [existingAnswer, setIsCompleted]);

  const handleSelect = (option: number) => {
    setIsCompleted(option !== 0);
    setSliderValue(option);
    setResponse({
      value: option,
      parameter: question.parameter,
      answer_type: question.type,
    });
  };

  return (
    <React.Fragment>
      <IconAndQuestionText question={question} />

      <SliderComponent
        sliderValue={sliderValue}
        setSliderValue={handleSelect}
        min={question.min}
        max={question.max}
        label={question.label}
        metric={question.metric}
      />
    </React.Fragment>
  );
};

export default SliderLayout;
