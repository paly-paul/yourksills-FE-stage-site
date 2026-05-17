import Image from "next/image";
import { useState } from "react";
import { Question } from "./QuestionSlider";
import { useCvFlowStore } from "@/store/useCvFlowStore";

interface SidebarProps {
  steps: {
    title: string;
    totalQuestions: number | undefined;
    questions: Question[] | undefined;
  }[];
  currentStep: number;
  currentQuestion: number;
  onStepChange: (stepIndex: number) => void;
  onQuestionChange: (questionIndex: number) => void;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({
  steps,
  currentStep,
  currentQuestion,
  onStepChange,
  onQuestionChange,
  setCurrentScreen,
}: SidebarProps) {
  const withCv = useCvFlowStore((state) => state.withCv);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-72 md:shadow-none md:rounded-tr-4xl flex-shrink-0 ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:w-72"
        }`}>
      {/* Mobile Toggle Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='absolute top-8 -right-8 w-8 h-8 mt-7 flex items-center justify-center bg-white rounded-r-md shadow-md cursor-pointer md:hidden'>
        <Image
          src='icons/right-arrow.svg'
          alt='toggle'
          width={20}
          height={20}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
          style={{
            filter:
              "invert(38%) sepia(90%) saturate(4328%) hue-rotate(208deg) brightness(100%) contrast(106%)",
          }}
        />
      </div>

      <div
        onClick={() =>
          setCurrentScreen(withCv ? "extracted-info" : "no-resume")
        }
        className='flex items-center mb-10 gap-1 cursor-pointer'>
        <Image src='icons/arrow-left.svg' alt='' width={20} height={20} />
        <p className='font-medium text-base md:text-lg text-purple'>
          Resume Overview
        </p>
      </div>
      <div className='space-y-8'>
        {steps.map((step, stepIndex) => {
          const isActive = stepIndex === currentStep;
          const isCompleted = stepIndex < currentStep;
          const total = step.totalQuestions;
          const current = isActive
            ? currentQuestion + 1
            : isCompleted
              ? total
              : 0;
          const percentage = ((current ?? 0) / (total ?? 0)) * 100;
          return (
            <div key={step.title} className='relative'>
              {/* Vertical Line */}

              {/* {stepIndex !== steps.length - 1 && ( */}
              <div className='absolute left-3 top-6 bottom-0 w-0.5 bg-grey/30'>
                <div
                  className='bg-purple absolute left-0 top-0 w-0.5 rounded-full'
                  style={{ height: `${percentage}%` }}
                />
              </div>
              {/* )} */}

              {/* Step circle + title */}
              <button
                onClick={() => {
                  if (isCompleted) onStepChange(stepIndex);
                  // Optional: Close sidebar on selection logic if needed, but user didn't ask.
                }}
                className='relative z-10 flex items-center space-x-2 focus:outline-none'>
                <div
                  className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold ${isCompleted || isActive
                    ? "bg-purple text-white"
                    : "bg-white text-grey/50 border border-grey/50"
                    }`}>
                  {stepIndex + 1}
                </div>
                <span
                  className={`text-xs cursor-not-allowed ${isCompleted
                    ? "text-purple font-regular cursor-pointer"
                    : isActive
                      ? "text-purple font-bold cursor-pointer"
                      : "text-grey font-medium"
                    }`}>
                  {step.title}
                </span>
              </button>

              {/* Question Numbers */}
              {isActive && (
                <div className='grid grid-cols-5 gap-1 mt-3 ml-7 md:ml-8'>
                  {Array.from({ length: step.totalQuestions ?? 0 }).map(
                    (_, i) => {
                      const isCurrent = i === currentQuestion;
                      const isCompleted = i < currentQuestion;

                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (isCompleted) onQuestionChange(i);
                          }}
                          className={`p-1 text-xs font-medium rounded-md border cursor-not-allowed ${isCompleted
                            ? "bg-purple/20 border-purple text-purple cursor-pointer"
                            : isCurrent
                              ? "bg-green-700/20 text-green-700 border-green-700 cursor-pointer"
                              : "bg-gray-100 text-grey border-gray-50"
                            }`}>
                          {i + 1}
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
