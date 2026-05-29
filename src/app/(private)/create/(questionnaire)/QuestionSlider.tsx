import QuestionCard from "./QuestionCard";
import { QuestionnaireResponseType } from "@/store/useQuestionnaireResponseStore";
import { AccentButton } from "@/components/CustomButton";
import Image from "next/image";


export type Question = {
  parameter: string;
  question: string;
  type: string;
  iconfilename: string;
  label?: string;
  note?: string;
  options?: string[];
  w?: string[];
  limit?: number;
  min?: number;
  max?: number;
  metric?: string;
  list?: {
    title: string;
    experience: string;
  }[];
};

type AnswerEntry = {
  parameter: string;
  answer_type: string;
  value: QuestionnaireResponseType;
};

interface QuestionSliderProps {
  questions: Question[] | undefined;
  currentIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
  buttonText: string;
  existingAnswers?: AnswerEntry[];
  currentStep: number;
}

export default function QuestionSlider({
  questions,
  currentIndex,
  handleNext,
  handlePrevious,
  buttonText,
  existingAnswers,
  currentStep,
}: QuestionSliderProps) {

  if (!questions || questions.length === 0) {
    return (
      <div className='w-full flex justify-center pt-24 md:pt-32 px-4'>
        <div className='flex w-full py-8 justify-center items-start'>
          <div className='w-full max-w-[1100px] flex-shrink-0'>
            <div className='bg-white p-4 md:p-6 rounded-xl tag-shadow text-center'>
              <div className='flex flex-col items-center gap-3 py-4'>
                <Image
                  src='/icons/check-circle-gradient.svg'
                  alt='All good'
                  width={48}
                  height={48}
                />
                <p className='text-grey font-medium text-base'>
                  No missing entries — your resume is all set!
                </p>
              </div>
              <AccentButton
                text='Next'
                action={handleNext}
                classes='mt-4 w-full text-base'
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full flex justify-center pt-24 md:pt-32 px-4'>
      <div className='flex w-full py-8 justify-center items-start'>
        {questions?.map((q, i) => {
          const existingAnswer = existingAnswers?.find(
            (answer) => answer.parameter === q.parameter
          );
          const isActive = i === currentIndex;

          if (!isActive) return null;

          return (
            <div
              key={i}
              className='w-full max-w-[1100px] flex-shrink-0 transition-opacity duration-500'>
              <QuestionCard
                question={q}
                isVisible={isActive}
                handleNext={handleNext}
                buttonText={buttonText}
                handlePrevious={handlePrevious}
                existingAnswer={existingAnswer?.value}
                currentStep={currentStep}
                currentIndex={currentIndex}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
