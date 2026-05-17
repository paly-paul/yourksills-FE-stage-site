import { useStepIndicatorStore } from "@/store/useStepIndicatorStore";
import Image from "next/image";

const steps = [
  { label: "Log-In", href: "" },
  { label: "Upload", href: "upload" },
  { label: "Questionnaire", href: "questionnaire" },
  { label: "Summary", href: "summary" },
  { label: "Job Role", href: "job-title" },
  { label: "Snapshot", href: "snapshot" },
];

interface ProgressBarProps {
  currentStep: number;
  setCurrentScreen?: React.Dispatch<React.SetStateAction<string>>;
}

const StepIndicator: React.FC<ProgressBarProps> = ({
  currentStep,
  setCurrentScreen,
}) => {
  const completedStepsIndex = useStepIndicatorStore(
    (state) => state.completedStepsIndex
  );

  return (
    <div className='flex justify-between w-full max-w-5xl mx-auto px-0 py-2 md:px-6 md:py-6'>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.label}
            className='flex flex-col items-center relative flex-1 text-center'>
            {index !== 0 && (
              <div
                className={`absolute top-2 md:top-3.5 left-0 w-1/2 h-px ${index <= currentStep ? "bg-purple" : "bg-light-grey"
                  }`}
              />
            )}

            {!isLast && (
              <div
                className={`absolute top-2 md:top-3.5 right-0 w-1/2 h-px ${index < currentStep ? "bg-purple" : "bg-light-grey"
                  }`}
              />
            )}

            <div
              onClick={() =>
                completedStepsIndex >= index &&
                step.href.length !== 0 &&
                setCurrentScreen?.(step.href)
              }
              className={`z-10 w-4 h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center border transition-all cursor-pointer
                ${isCompleted
                  ? "bg-purple text-white border-purple"
                  : isActive
                    ? "bg-white border-purple"
                    : "bg-white border-light-grey"
                }`}>
              {isCompleted ? (
                <Image
                  src='/icons/tick-white.svg'
                  alt='done'
                  width={30}
                  height={30}
                />
              ) : isActive ? (
                <div className='w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-purple' />
              ) : null}
            </div>

            <span
              onClick={() =>
                completedStepsIndex >= index &&
                step.href.length !== 0 &&
                setCurrentScreen?.(step.href)
              }
              className={`mt-1 md:mt-2 text-[9px] md:text-xs font-medium leading-none tracking-tight w-full break-words px-0.5 cursor-pointer ${isActive ? "text-purple" : "text-grey"
                }`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
