import { BackButton } from "@/components/BackButton";
import { AccentButton, BorderButton } from "@/components/CustomButton";
import ProfileProgressRing from "@/components/ProfileProgressRing";
import SkillCard from "@/components/SkillCard";
import StepIndicator from "@/components/StepIndicator";
import { useGetCvSummary } from "@/hooks/summary/useGetCvSummary";
import React, { useEffect, useState } from "react";
import Summaryloader from "../(upload)/SummaryLoader";
import { useCvFlowStore } from "@/store/useCvFlowStore";
import { useStepIndicatorStore } from "@/store/useStepIndicatorStore";
import AILoader from "@/components/AILoader";
import Image from "next/image";

/** Trim and treat common empty placeholders as absent */
function normalizeDisplayPart(value: unknown): string | null {
  const s = String(value ?? "").trim();
  if (!s) return null;
  if (s === "-" || s === "—" || s === "–") return null;
  const lower = s.toLowerCase();
  if (lower === "n/a" || lower === "not specified") return null;
  return s;
}

function joinDisplayParts(
  parts: unknown[],
  separator: string
): string | null {
  const out = parts.map(normalizeDisplayPart).filter(Boolean) as string[];
  return out.length ? out.join(separator) : null;
}

function filterMeaningfulStrings(items: string[] | undefined): string[] {
  return (items ?? [])
    .map((raw) => normalizeDisplayPart(raw))
    .filter(Boolean) as string[];
}

interface SummaryPageProps {
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}

const Summary = ({ setCurrentScreen }: SummaryPageProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const withCv = useCvFlowStore((state) => state.withCv);

  const {
    data: questionnaireSummary,
    isPending,
    isFetching,
    isSuccess,
  } = useGetCvSummary(withCv);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const setCompletedStepIndex = useStepIndicatorStore(
    (state) => state.setCompletedStepIndex
  );
  // set the loader state if api isPending
  useEffect(() => {
    if (isPending) setShowLoader(true);
  }, [isPending]);

  // Show loader while fetching summary data
  if (showLoader)
    return (
      <Summaryloader
        onComplete={() => setShowLoader(false)}
        isSuccess={isSuccess}
        isPending={isPending}
      />
    );

  const handleContinue = () => {
    setCompletedStepIndex(3);
    setCurrentScreen("job-title");
  };

  // Show loader while fetching summary data
  if (isFetching)
    return (
      <div className='h-screen flex items-start justify-center'>
        <div className='w-full block mx-auto'>
          <AILoader />
        </div>
      </div>
    );

  if (questionnaireSummary && questionnaireSummary.cv_details)
    return (
      <main className='min-h-screen bg-white py-6 md:py-12 gradient-bg'>
        <div className='container'>
          <div className='flex flex-col md:flex-row md:items-center'>
            <BackButton action={() => setCurrentScreen("questionnaire")} />
            <div className='w-full px-4 mt-4 md:mt-0 md:px-0'>
              <StepIndicator
                currentStep={3}
                setCurrentScreen={setCurrentScreen}
              />
            </div>
          </div>

          <div className='space-y-4 md:space-y-6 mt-14 mb-4 md:my-8 text-center'>
            <h1 className='font-semibold text-3xl md:text-5xl text-title-black'>
              Quick review to make sure <br className='hidden md:block' />{" "}
              <span className='gradient-text'>everything fits you</span>
            </h1>
            <p className='text-xs text-grey px-4'>
              This is just a preview of your profile you can edit it before we
              create your final Skill Snapshot
            </p>
          </div>
          <div className='bg-white max-w-5xl mx-auto rounded-3xl tag-shadow p-6 sm:p-8 lg:p-10 w-full'>
            <div className=' grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8'>
              <div className='lg:col-span-1 flex flex-col items-center text-center h-full'>
                <div className='mb-6'>
                  <ProfileProgressRing
                    size={isMobile ? 100 : 140}
                    name={questionnaireSummary?.cv_details.name ?? ""}
                  />
                </div>
                <p className='text-title-black mb-6 md:mb-8 max-w-xs text-sm md:text-[18px] italic mx-auto text-center'>
                  &quot;{questionnaireSummary?.cv_details.Summary}&quot;
                </p>

                <div className='mt-auto flex flex-col items-center lg:items-center lg:gap-2'>
                  <h1 className='text-2xl font-semibold gradient-text text-center max-w-xs break-words leading-snug'>
                    {questionnaireSummary?.cv_details.name}
                  </h1>
                  <p className='text-grey/80 text-sm md:text-[18px] font-medium text-center max-w-xs break-words leading-snug'>
                    {questionnaireSummary?.cv_details.role}
                  </p>
                </div>
              </div>
              <div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  <SkillCard
                    title='Hard Skills'
                    items={filterMeaningfulStrings(
                      questionnaireSummary?.cv_details.hard_skills ?? []
                    )}
                  />
                  <SkillCard
                    title='Soft Skills'
                    items={filterMeaningfulStrings(
                      questionnaireSummary?.cv_details.soft_skills ?? []
                    )}
                  />
                  <SkillCard
                    title='Tools'
                    items={filterMeaningfulStrings(
                      questionnaireSummary?.cv_details.tools ?? []
                    )}
                  />
                </div>
                <div className='bg-indigo-50 p-5 rounded-lg text-center md:text-left'>
                  <h2 className='text-xl font-semibold mb-3 text-dark-grey'>
                    Education summary
                  </h2>

                  {(() => {
                    const rows =
                      questionnaireSummary?.cv_details.education ?? [];
                    const hasAny = rows.some(
                      (e) =>
                        normalizeDisplayPart(e.Degree) ||
                        normalizeDisplayPart(e.Grade) ||
                        joinDisplayParts([e.Institution, e.Year], " | ")
                    );

                    return (
                      <>
                        {rows.map((education, index) => {
                          const degree = normalizeDisplayPart(education.Degree);
                          const grade = normalizeDisplayPart(education.Grade);
                          const institutionYear = joinDisplayParts(
                            [education.Institution, education.Year],
                            " | "
                          );
                          if (!degree && !grade && !institutionYear)
                            return null;

                          return (
                            <React.Fragment key={index}>
                              {degree ? (
                                <p className='text-title-black font-medium text-sm'>
                                  {degree}
                                </p>
                              ) : null}
                              {grade ? (
                                <p className='text-title-black font-medium text-sm'>
                                  {grade}
                                </p>
                              ) : null}
                              {institutionYear ? (
                                <p className='text-grey text-xs font-medium'>
                                  {institutionYear}
                                </p>
                              ) : null}
                            </React.Fragment>
                          );
                        })}
                        {!hasAny ? (
                          <p className='text-sm text-grey py-2'>
                            No education details available yet.
                          </p>
                        ) : null}
                      </>
                    );
                  })()}
                </div>
                <div className='bg-indigo-50 p-5 rounded-lg flex flex-col md:flex-row items-center md:justify-between text-center md:text-left'>
                  <div>
                    <h2 className='text-xl font-semibold mb-1 text-dark-grey'>
                      Career overview
                    </h2>
                    <p className='text-grey text-xs'>
                      Total Years Of Experience
                    </p>
                  </div>
                  <span className='font-semibold text-title-black tabular-nums tracking-tight text-3xl sm:text-4xl md:text-4xl lg:text-5xl'>
                    {questionnaireSummary?.cv_details.career_overview
                      .toString()
                      .padStart(2, "0")}
                  </span>
                </div>

                <div className='md:col-span-2 bg-indigo-50 p-5 rounded-lg text-left'>
                  {(() => {
                    const certifications =
                      questionnaireSummary?.cv_details.certifications ?? [];
                    const visibleCertifications = showAllCertifications
                      ? certifications
                      : certifications.slice(0, 6);
                    const hiddenCount = Math.max(
                      certifications.length - visibleCertifications.length,
                      0
                    );

                    return (
                      <>
                  <div className='flex flex-wrap items-center justify-between gap-3'>
                    <h2 className='text-xl text-title-black font-semibold'>
                      Certifications
                    </h2>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs font-semibold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full'>
                        {questionnaireSummary?.cv_details.certifications?.length ?? 0}{" "}
                        items
                      </span>
                      <div className='h-14 w-14 rounded-full bg-white border border-indigo-100 flex items-center justify-center shadow-sm shrink-0'>
                        <Image
                          src='/icons/certificate.png'
                          alt='Certifications'
                          width={30}
                          height={30}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='w-full mt-5 md:mt-6'>
                    {certifications.length ? (
                      <>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2.5'>
                          {visibleCertifications.map((cert, idx) => (
                            <div
                              key={`${cert.Name}-${idx}`}
                              className='bg-white/80 border border-indigo-100 rounded-lg px-3 py-3 flex flex-col gap-1 items-stretch text-left w-full min-w-0'>
                              <p className='text-indigo-700 font-semibold text-xs md:text-sm leading-snug break-words text-left'>
                                {cert.Name}
                              </p>
                              {(cert.Issuer && cert.Issuer !== "Not specified" || cert.Year) && (
                                <div className='flex items-center justify-between gap-2 text-xs text-grey w-full'>
                                  {cert.Issuer && cert.Issuer !== "Not specified" && (
                                    <span className='truncate'>{cert.Issuer}</span>
                                  )}
                                  {cert.Year && (
                                    <span className='font-medium shrink-0'>{cert.Year}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {certifications.length > 6 && (
                          <button
                            type='button'
                            onClick={() =>
                              setShowAllCertifications((prev) => !prev)
                            }
                            className='mt-4 block w-full text-left text-xs md:text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors'>
                            {showAllCertifications
                              ? "Show fewer certifications"
                              : `Show ${hiddenCount} more certification${
                                  hiddenCount > 1 ? "s" : ""
                                }`}
                          </button>
                        )}
                      </>
                    ) : (
                      <p className='text-sm text-grey py-4 text-left md:text-center'>
                        No certifications available yet.
                      </p>
                    )}
                  </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className='text-grey p-2 text-center w-full bg-gradient-to-r from-white via-gray-100 to-white mt-6 md:mt-10 text-[10px] md:text-base'>
          This is just a preview,Want a hyper personalized skill snapshot?
        </p>
        <div className='button-container flex flex-col md:flex-row justify-center items-center gap-2 mt-4 md:mt-6 px-4 max-w-2xl mx-auto'>
          <BorderButton
            text='Back to questionnaire'
            action={() => setCurrentScreen("questionnaire")}
            classes="w-full md:flex-1 text-sm md:text-base py-2.5 md:py-2 order-2 md:order-1"
          />
          <AccentButton
            text='Continue Building'
            action={handleContinue}
            classes="w-full md:flex-1 text-sm md:text-base py-2.5 md:py-2 order-1 md:order-2"
          />
        </div>
      </main>
    );
};

export default Summary;
