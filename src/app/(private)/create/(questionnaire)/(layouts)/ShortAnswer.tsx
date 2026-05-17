import React, { useEffect, useState } from "react";
import { Question } from "../QuestionSlider";
import IconAndQuestionText from "./(layoutComponents)/IconAndQuestionText";
import {
  useQuestionnaireResponseStore,
  QuestionnaireResponseType,
} from "@/store/useQuestionnaireResponseStore";

const ShortAnswerLayout = ({
  question,
  setIsCompleted,
  existingAnswer,
}: {
  question: Question;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  existingAnswer?: QuestionnaireResponseType;
}) => {
  const [roles, setRoles] = useState<string>(""),
    setResponse = useQuestionnaireResponseStore((state) => state.setResponse);

  // Initialize with existing answer if available
  useEffect(() => {
    if (existingAnswer && typeof existingAnswer === "string") {
      setRoles(existingAnswer);
      setIsCompleted(existingAnswer.length > 0);
    } else {
      setIsCompleted(false);
    }
  }, [existingAnswer, setIsCompleted]);

  const handleOnChange = (value: string) => {
    setIsCompleted(value.length > 0);
    setRoles(value);
    setResponse({
      value: value,
      parameter: question.parameter,
      answer_type: question.type,
    });
  };

  return (
    <React.Fragment>
      <IconAndQuestionText question={question} />

      <div className='text-left'>
        <label
          htmlFor='roles'
          className='block text-sm font-medium text-gray-700 mb-1'>
          {question.label}
        </label>
        <input
          id='roles'
          type='text'
          value={roles}
          onChange={(e) => handleOnChange(e.target.value)}
          placeholder={question.label}
          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent'
        />
        <p className='text-xs text-gray-400 mt-1'>{question.note}</p>
      </div>
    </React.Fragment>
  );
};

export default ShortAnswerLayout;
