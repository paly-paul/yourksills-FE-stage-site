import QuestionCard from "./QuestionCard";
import { QuestionnaireResponseType } from "@/store/useQuestionnaireResponseStore";


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
