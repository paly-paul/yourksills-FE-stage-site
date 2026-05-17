import React from "react";
import ShortAnswerLayout from "./(layouts)/ShortAnswer";
import SingleWithDropdown from "./(layouts)/SingleWithDropdown";
import { Question } from "./QuestionSlider";
import MultipleSelect from "./(layouts)/MultipleSelect";
import MultipleWithAdd from "./(layouts)/MultipleWithAdd";
import SingleWithInput from "./(layouts)/SingleWithInput";
import SliderLayout from "./(layouts)/SliderLayout";
import TagsLayout from "./(layouts)/TagsLayout";
import MultipleWithLimit from "./(layouts)/MultipleWithLimit";
import SingleWithTextField from "./(layouts)/SingleWithTextField";
import SingleSelect from "./(layouts)/SingleSelect";
import ListLayout from "./(layouts)/ListLayout";
import { DropdownWithMultiSelect } from "./(layouts)/DropdownWithMultiSelect";
import { QuestionnaireResponseType } from "@/store/useQuestionnaireResponseStore";

const QuestionLayout = ({
  question,
  setIsCompleted,
  existingAnswer,
}: {
  question: Question;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  existingAnswer?: QuestionnaireResponseType;
}) => {
  return (
    <React.Fragment>
      {question.type === "Multiple select + Dropdown" && (
        <DropdownWithMultiSelect
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />
      )}
      {question.type === "Short text" && (
        <ShortAnswerLayout
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />
      )}
      {question.type === "Single-select + Dropdown" && (
        <SingleWithDropdown
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />
      )}
      {question.type === "Multiple select" && (
        <MultipleSelect
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />
      )}
      {(question.type === "Multiple select + Add New" ||
        question.type === "Multiple select + add new") && (
        <MultipleWithAdd
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />
      )}
      {question.type === "single-input" && (
        <SingleWithInput
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />
      )}
      {question.type === "Single Select" && (
        <SingleSelect
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />
      )}
      {question.type === "slider" && (
        <SliderLayout
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />
      )}
      {(question.type === "Multiple select + add Tag" ||
        question.type === "Multiple select + Add Tag") && (
        <TagsLayout
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />
      )}
      {question.type === "Multiple select + limit" && (
        <MultipleWithLimit
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />
      )}
      {question.type === "Yes/ No select + Text entry" && (
        <SingleWithTextField
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />
      )}
      {question.type === "list" && (
        <ListLayout
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />
      )}
    </React.Fragment>
  );
};

export default QuestionLayout;
