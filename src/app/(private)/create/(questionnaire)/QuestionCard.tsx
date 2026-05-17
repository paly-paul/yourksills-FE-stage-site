import React, { useState, useEffect } from "react";
import QuestionLayout from "./QuestionLayout";
import { Question } from "./QuestionSlider";
import { AccentButton } from "@/components/CustomButton";
import Image from "next/image";
import { QuestionnaireResponseType } from "@/store/useQuestionnaireResponseStore";

interface QuestionCardProps {
  question: Question;
  isVisible: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
  buttonText: string;
  existingAnswer?: QuestionnaireResponseType;
  currentStep: number;
  currentIndex: number;
}

export default function QuestionCard({
  question,
  isVisible,
  handleNext,
  handlePrevious,
  buttonText,
  existingAnswer,
  currentStep,
  currentIndex,
}: QuestionCardProps) {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Set isCompleted to true if there's an existing answer
  useEffect(() => {
    if (existingAnswer !== undefined) {
      setIsCompleted(true);
    }
  }, [existingAnswer]);

  return (
    <div
      className={`w-full transition-transform duration-500 ${isVisible ? "scale-100" : "scale-95 opacity-50"
        }`}>
      <div className='bg-white p-4 md:p-6 rounded-xl tag-shadow text-center'>
        <QuestionLayout
          question={question}
          setIsCompleted={setIsCompleted}
          existingAnswer={existingAnswer}
        />

        <AccentButton
          disabled={!isCompleted || buttonText === "Loading"}
          text={buttonText}
          action={handleNext}
          classes={`mt-6 w-full text-base`}
        />

        <div className='container mx-auto flex justify-between items-center mt-4 md:mt-8'>
          <div
            onClick={
              currentStep === 0 && currentIndex === 0
                ? undefined
                : handlePrevious
            }
            className={`flex gap-1 items-center ${currentStep === 0 && currentIndex === 0
              ? "cursor-not-allowed"
              : "cursor-pointer"
              }`}>
            <Image
              src='icons/ArrowLeft-grey.svg'
              alt=''
              width={20}
              height={20}
              className="w-4 h-4 md:w-5 md:h-5"
            />

            <p
              className={`font-semibold text-base ${currentStep === 0 && currentIndex === 0
                ? "text-light-grey"
                : "text-grey"
                } ${currentStep === 0 && currentIndex === 0
                  ? "text-light-grey"
                  : "hover:text-purple"
                } transition ease-in duration-100`}>
              Previous
            </p>
          </div>

          <button className='cursor-not-allowed' disabled>
            <p className='font-semibold text-base text-light-grey'>
              Skip
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

