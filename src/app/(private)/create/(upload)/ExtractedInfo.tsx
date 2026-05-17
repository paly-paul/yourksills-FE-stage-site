"use client";

import Image from "next/image";
import { AccentButton } from "@/components/CustomButton";
import ProfileProgressRing from "@/components/ProfileProgressRing";
import { CVResponse } from "@/services/cvParse/cvParseService";
import StepIndicator from "@/components/StepIndicator";
import { BackButton } from "@/components/BackButton";
import { useCvFlowStore } from "@/store/useCvFlowStore";
import { useStepIndicatorStore } from "@/store/useStepIndicatorStore";
import { useEffect, useState } from "react";
import EditJourney from "./EditJourney";

const ExtractedInfo = ({
  setCurrentScreen,
  extractedInfo,
}: {
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  extractedInfo: CVResponse | undefined;
}) => {
  const setWithCv = useCvFlowStore((state) => state.setWithCv);
  const setCompletedStepIndex = useStepIndicatorStore(
    (state) => state.setCompletedStepIndex
  );
  const [journey, setJourney] = useState<string>("");
  const [editJourney, setEditJouney] = useState<boolean>(false);
  const formattedJourney = journey.replace(/\s*\(/g, "\n(");
  const handleClick = () => {
    setCompletedStepIndex(1);
    setWithCv(true);
    setCurrentScreen("questionnaire");
  };

  useEffect(() => {
    setJourney(extractedInfo?.audienceType || "");
  }, [extractedInfo]);

  return !editJourney && extractedInfo ? (
    <div className='min-h-screen gradient-bg py-4 lg:py-12'>
      <div className='container'>
        <div className='relative flex flex-col lg:block mb-2 lg:mb-8'>
          <div className='self-start lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-10'>
            <BackButton action={() => setCurrentScreen("upload")} />
          </div>
          <StepIndicator currentStep={1} setCurrentScreen={setCurrentScreen} />
        </div>
        <div className='flex items-center justify-center'>
          <div className='section-card w-full !px-5 !py-6 md:!px-8 md:!py-10 lg:!px-10 xl:!px-16'>
            <div className='flex flex-col lg:grid lg:grid-cols-[2fr_4fr] xl:grid-cols-[2fr_4fr_2fr] gap-4 lg:gap-8 xl:gap-14 lg:py-4 xl:py-8'>
              <div className='flex flex-col items-center text-center justify-self-start'>
                <div className='flex flex-col items-center text-center'>
                  <ProfileProgressRing
                    progress={extractedInfo.candidate.known_percentage}
                    // imageUrl={Avatar}
                    name={extractedInfo.parsed_data.Name}
                  />
                  <h2 className='mt-2 md:mt-4 text-base md:text-lg text-indigo-900 font-semibold'>
                    {extractedInfo.parsed_data.Name}
                  </h2>
                  <p className='text-xs md:text-base text-grey'>
                    {extractedInfo.candidate.job_role}
                  </p>
                  <div
                    onClick={() => setEditJouney(true)}
                    className='cursor-pointer mt-2 md:mt-3 px-2 md:px-3 py-0.5 md:py-1 bg-violet-300/30 rounded-full flex items-start gap-2 text-xs md:text-sm text-indigo-900 font-medium'>
                    <span className='whitespace-pre-line leading-tight text-left'>
                      {formattedJourney}
                    </span>
                    <Image
                      src='/icons/PencilSimple.svg'
                      alt='edit'
                      width={12}
                      height={12}
                      className='w-3 h-3 md:w-3.5 md:h-3.5 mt-0.5'
                    />
                  </div>
                </div>
              </div>
              <div className='flex-1'>
                <h3 className='text-xl lg:text-3xl font-semibold text-title-black mb-2 lg:mb-4 leading-tight text-center lg:text-left'>
                  Here&apos;s what we&apos;ve learned about you
                </h3>

                <div className='grid grid-cols-2 gap-3 mt-4 lg:mt-8 text-xs lg:text-sm font-medium text-title-black'>
                  <ul className='space-y-2 lg:space-y-4'>
                    <div className='flex items-center gap-2 mb-2 text-xs md:text-sm font-semibold'>
                      <Image
                        src='/icons/check-circle-gradient.svg'
                        alt=''
                        width={20}
                        height={20}
                        className='w-5 h-5 shrink-0'
                      />
                      <span className='bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] bg-clip-text text-transparent'>
                        What we know
                      </span>
                    </div>
                    {extractedInfo.summary.known.map((item, index) => (
                      <li key={index} className='flex items-start gap-2'>
                        <Image
                          src='/icons/check-circle-gradient.svg'
                          alt=''
                          width={16}
                          height={16}
                          className='w-4 h-4 lg:w-5 lg:h-5 mt-0.5'
                        />
                        <span className='leading-tight'>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {extractedInfo.summary.unknown.length > 0 && (
                    <ul className='space-y-2 lg:space-y-4'>
                      <div className='flex items-center gap-2 mb-2 text-xs md:text-sm font-semibold'>
                        <Image
                          src='/icons/XCircle.svg'
                          alt=''
                          width={20}
                          height={20}
                          className='w-5 h-5 shrink-0'
                        />
                        <span className='bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] bg-clip-text text-transparent'>
                          What we don&apos;t know
                        </span>
                      </div>
                      {extractedInfo.summary.unknown.map((item, index) => (
                        <li key={index} className='flex items-start gap-2'>
                          <Image
                            src='/icons/XCircle.svg'
                            alt=''
                            width={16}
                            height={16}
                            className='w-4 h-4 lg:w-5 lg:h-5 mt-0.5'
                          />
                          <span className='leading-tight'>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className='flex flex-col justify-center mt-4 lg:mt-0 lg:col-span-2 xl:col-span-1 lg:items-center xl:items-start'>
                <div className='mb-4 lg:mb-6 text-center xl:text-left max-w-xs'>
                  <h4 className='font-semibold text-sm md:text-base text-title-black mb-1'>
                    Just a few questions to know you more.
                  </h4>
                  <p className='text-[10px] md:text-xs font-light text-grey'>
                    Get Sharper Skill Insights - Takes Under 2 Minutes.
                  </p>
                </div>

                <AccentButton
                  action={handleClick}
                  text='Continue'
                  classes='!text-sm lg:!text-base lg:!py-3 w-full max-w-xs xl:w-auto'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <EditJourney
      setEditJourney={setEditJouney}
      setJourney={setJourney}
      journey={journey}
    />
  );
};

export default ExtractedInfo;
