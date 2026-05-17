import React, { useState, useEffect, useRef } from "react";
import { Question } from "../QuestionSlider";
import IconAndQuestionText from "./(layoutComponents)/IconAndQuestionText";
import {
  useQuestionnaireResponseStore,
  QuestionnaireResponseType,
} from "@/store/useQuestionnaireResponseStore";

const CheckIcon = () => (
  <svg
    className='h-5 w-5 text-purple'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
    fill='currentColor'
    aria-hidden='true'>
    <path
      fillRule='evenodd'
      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
      clipRule='evenodd'
    />
  </svg>
);

interface CustomDropDownProps {
  placeholder?: string;
  question: Question;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  existingAnswer?: QuestionnaireResponseType;
}

export const DropdownWithMultiSelect = ({
  question,
  placeholder = "Select options",
  setIsCompleted,
  existingAnswer,
}: CustomDropDownProps) => {
  const maxSelections = 3;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const setResponse = useQuestionnaireResponseStore(
    (state) => state.setResponse
  );

  // Initialize with existing answer if available
  useEffect(() => {
    if (existingAnswer && Array.isArray(existingAnswer)) {
      setSelectedItems(existingAnswer);
      setIsCompleted(existingAnswer.length > 0);
    }
  }, [existingAnswer, setIsCompleted]);

  /**
   * Effect to handle clicks outside of the dropdown to close it.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * Toggles the selection of an item.
   * If multiple selections are allowed, it adds or removes the item from the list.
   * If only single selection is allowed, it replaces the current selection.
   * @param item - The item to toggle.
   */
  const handleItemClick = (item: string) => {
    const isSelected = selectedItems.includes(item);
    if (!isSelected && selectedItems.length >= maxSelections) return;
    const newSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];
    setSelectedItems(newSelectedItems);
    setIsCompleted(newSelectedItems.length > 0);
    setResponse({
      parameter: question.parameter,
      answer_type: question.type,
      value: newSelectedItems,
    });
  };

  /**
   * Generates the display text for the dropdown button.
   * Shows the number of selected items or a placeholder.
   */
  const getDisplayText = () => {
    if (selectedItems.length === 0) {
      return placeholder;
    }
    if (selectedItems.length > 2) {
      return `${selectedItems.length} items selected`;
    }
    return selectedItems.join(", ");
  };

  return (
    <React.Fragment>
      <IconAndQuestionText question={question} />{" "}
      <div className='relative w-full' ref={dropdownRef}>
        {/* The button that toggles the dropdown */}
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-left focus:outline-none focus:ring-1 focus:ring-purple focus:border-purple flex items-center justify-between'>
          <span className='text-gray-700 truncate'>{getDisplayText()}</span>
          <svg
            className={`h-5 w-5 text-grey transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>

        {/* The dropdown panel with the options */}
        {isOpen && (
          <div className='absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto'>
            <ul className='py-1'>
              {question.options?.map((option) => {
                const isSelected = selectedItems.includes(option);
                const isDisabled = !isSelected && selectedItems.length >= maxSelections;
                return (
                  <li
                    key={option}
                    onClick={() => handleItemClick(option)}
                    className={`px-4 py-2 flex items-center justify-between ${
                      isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-purple-50 cursor-pointer"
                    }`}>
                    <span
                      className={`truncate ${
                        isSelected
                          ? "font-semibold text-purple"
                          : "text-gray-800"
                      }`}>
                      {option}
                    </span>
                    {isSelected && <CheckIcon />}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <p className='text-xs text-light-grey mt-2'>
          Select up to {maxSelections} options.
        </p>

        <div className='mt-6 p-4 bg-white border border-gray-200 rounded-lg'>
          <h2 className='font-semibold text-gray-700'>Selected Items:</h2>
          {selectedItems.length > 0 ? (
            <div className='flex flex-wrap gap-1'>
              {selectedItems.map((item, index) => (
                <button
                  key={index}
                  className={
                    "border rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer text-purple border-purple"
                  }>
                  {item}
                </button>
              ))}
            </div>
          ) : (
            <p className='text-gray-500 mt-2'>No items selected.</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
