import { BackButton } from "@/components/BackButton";
import { AccentButton } from "@/components/CustomButton";
import JourneyCards from "@/components/JourneyCards";
import { useSetJourney } from "@/hooks/journey/useSetJourney";
import { useState } from "react";
import Summaryloader from "./SummaryLoader";
import { useStepIndicatorStore } from "@/store/useStepIndicatorStore";

interface ResumePageProps {
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}

const NoResume = ({ setCurrentScreen }: ResumePageProps) => {
  const [journey, setJourney] = useState<string>(""),
    { mutateAsync: postJourney, isPending, isSuccess } = useSetJourney();
  const setCompletedStepIndex = useStepIndicatorStore(
    (state) => state.setCompletedStepIndex
  );

  const [showLoader, setShowLoader] = useState<boolean>(false);

  if (showLoader)
    return (
      <Summaryloader
        onComplete={() => setCurrentScreen("questionnaire")}
        isSuccess={isSuccess}
        isPending={isPending}
      />
    );

  const handleClick = () => {
    setCompletedStepIndex(1);
    setShowLoader(true);
    postJourney(journey);
  };

  return (
    <div className='min-h-screen flex items-center justify-center gradient-bg'>
      <div className='text-center space-y-6 container px-4'>
        <div className='flex flex-col items-center justify-center relative'>
          <div className='self-start mb-4'>
            <BackButton action={() => setCurrentScreen("upload")} />
          </div>
          <div className='flex-1 px-2'>
            <h1 className='font-semibold text-xl text-title-black leading-tight'>
              Choose your stage to unlock the next steps
            </h1>
            <p className='text-xs text-grey mb-6 mt-2'>
              Select the option that matches your journey
            </p>
          </div>
        </div>
        <JourneyCards handleClick={setJourney} />
        {journey !== "" ? (
          <div className='space-y-4 mt-6 pb-12'>
            <p className='font-semibold text-sm text-title-black'>
              Just a few questions to know you more.
            </p>
            <p className='text-[10px] font-light text-grey'>
              Get sharper skill insights — takes under 2 minutes.
            </p>
            <AccentButton
              action={handleClick}
              text='Continue'
              classes='w-max mx-auto'
            />
          </div>
        ) : (
          <div className='p-2 border border-gray-200 rounded-lg gradient-bg w-max m-auto mt-6'>
            <p className='text-grey text-xs'>
              ⭐ This helps us personalize your snapshot better
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoResume;
