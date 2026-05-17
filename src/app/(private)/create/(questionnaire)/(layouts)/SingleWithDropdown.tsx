"use client";

import React, { useEffect, useState } from "react";
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

interface DropdownOption {
  label: string;
  dropdownOptions: string[];
}

const SingleWithDropdown = ({
  question,
  setIsCompleted,
  existingAnswer,
}: {
  question: Question;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  existingAnswer?: QuestionnaireResponseType;
}) => {
  const [selected, setSelected] = useState<string>(""),
    [selectedField, setSelectedField] = useState<string>("select"),
    [otherFieldText, setOtherFieldText] = useState<string>(""),
    [dropdown, setDropdown] = useState<DropdownOption | undefined>({
      label: "",
      dropdownOptions: [],
    }),
    setResponse = useQuestionnaireResponseStore((state) => state.setResponse);

  const firstLevelLabels = dedupeOptionsPreservingOrder(
    question.options?.map(
      (opt) => (opt as unknown as { label: string }).label
    )
  );

  const nestedOptions = dedupeOptionsPreservingOrder(dropdown?.dropdownOptions);

  // Initialize with existing answer if available
  useEffect(() => {
    if (
      existingAnswer &&
      typeof existingAnswer === "object" &&
      "selected" in existingAnswer &&
      "selectedField" in existingAnswer
    ) {
      setSelected(existingAnswer.selected);
      setSelectedField(existingAnswer.selectedField);
      if (
        "otherFieldText" in existingAnswer &&
        typeof (existingAnswer as { otherFieldText?: string }).otherFieldText ===
          "string"
      ) {
        setOtherFieldText(
          (existingAnswer as { otherFieldText: string }).otherFieldText
        );
      } else {
        setOtherFieldText("");
      }
      const temp = question.options
        ?.map<DropdownOption>((i) => i as unknown as DropdownOption)
        ?.find((opt) => opt.label === existingAnswer.selected);
      setDropdown(temp);
    }
  }, [existingAnswer, question.options]);

  const handleSelect = (value: string) => {
    setSelected(value);
    setSelectedField("select");
    setOtherFieldText("");
    const temp = question.options
      ?.map<DropdownOption>((i) => i as unknown as DropdownOption)
      ?.find((opt) => opt.label === value);
    setDropdown(temp);
    setResponse({
      value: { selected: value, selectedField: "select" },
      parameter: question.parameter,
      answer_type: question.type,
    });
  };

  const handleFieldChange = (value: string) => {
    setSelectedField(value);
    if (!isOtherLikeOption(value)) {
      setOtherFieldText("");
      setResponse({
        value: { selected, selectedField: value },
        parameter: question.parameter,
        answer_type: question.type,
      });
    } else {
      setOtherFieldText("");
      setResponse({
        value: { selected, selectedField: value, otherFieldText: "" },
        parameter: question.parameter,
        answer_type: question.type,
      });
    }
  };

  const handleOtherFieldChange = (value: string) => {
    setOtherFieldText(value);
    setResponse({
      value: {
        selected,
        selectedField,
        otherFieldText: value,
      },
      parameter: question.parameter,
      answer_type: question.type,
    });
  };

  useEffect(() => {
    const hasBothLevels =
      selected !== "" &&
      selectedField !== "" &&
      selectedField !== "select";
    if (!hasBothLevels) {
      setIsCompleted(false);
      return;
    }
    if (isOtherLikeOption(selectedField)) {
      setIsCompleted(otherFieldText.trim().length > 0);
    } else {
      setIsCompleted(true);
    }
  }, [selected, selectedField, otherFieldText, setIsCompleted]);

  return (
    <React.Fragment>
      <IconAndQuestionText question={question} />

      <Options
        options={firstLevelLabels}
        type={question.type}
        action={handleSelect}
        selected={selected}
      />

      <div className='my-4'>
        <label
          htmlFor='field'
          className='block font-semibold text-title-black mb-4'>
          {question.label}
        </label>
        <select
          id='field'
          value={selectedField}
          onChange={(e) => handleFieldChange(e.target.value)}
          className='w-full border border-light-grey/40 rounded-lg px-4 py-2 focus:ring-purple focus:outline-none text-dark-grey'>
          <option value='select'>Select</option>
          {nestedOptions?.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        {isOtherLikeOption(selectedField) && (
          <div className='mt-4 text-left'>
            <label
              htmlFor='dropdown-other-specify'
              className='block text-sm font-medium text-title-black mb-2'>
              Please specify
            </label>
            <input
              id='dropdown-other-specify'
              type='text'
              value={otherFieldText}
              onChange={(e) => handleOtherFieldChange(e.target.value)}
              placeholder='Enter your answer'
              className='w-full border border-light-grey/40 rounded-lg px-4 py-2 focus:ring-purple focus:outline-none text-dark-grey'
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default SingleWithDropdown;
