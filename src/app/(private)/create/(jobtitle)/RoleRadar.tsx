"use client";
import { AccentButton } from "@/components/CustomButton";
import ProfileProgressRing from "@/components/ProfileProgressRing";
import React, { useEffect, useMemo, useState } from "react";
import AILoader from "@/components/AILoader";

import { JobTitle } from "./(components)/JobTitle";
import { GraphComponent } from "./(components)/GraphComponent";
import { IndustrySection } from "./(components)/IndustrySection";
import { AttributeSection } from "./(components)/AttributeSection";
import { UseQueryResult } from "@tanstack/react-query";
import { PredictModelResponse } from "@/services/jobPrediction/getPredictModelOneService";
import { PredictModelTwoResponse } from "@/services/jobPrediction/getPredictModelTwoService";
import { useStepIndicatorStore } from "@/store/useStepIndicatorStore";

// CTA tabs inlined below to capture click type

const toNum = (s?: string) => (s ? parseFloat(String(s).replace("%", "")) : 0);

type Props = {
  onNext: () => void;
  modelOne: UseQueryResult<PredictModelResponse, Error>;
  modelTwo: UseQueryResult<PredictModelTwoResponse, Error>;
};

const RoleRadar = ({ onNext, modelOne, modelTwo }: Props) => {
  const predictModelOne = modelOne.data;
  const [loadingProgress, setLoadingProgress] = useState(0);

  const isLoading = modelOne.isFetching || modelTwo.isFetching;
  const setCompletedStepIndex = useStepIndicatorStore(
    (state) => state.setCompletedStepIndex
  );
  const handleContinue = () => {
    setCompletedStepIndex(4);
    onNext();
  };

  const mergedRoleData = useMemo(() => {
    const best = predictModelOne?.best_fit;
    return {
      jobTitle: best?.job_role,
      matchPercentage: toNum(best?.overall_match_pct),
      matchBreakdown: [
        {
          label: "Talent",
          percentage: toNum(best?.talent_match_pct),
          color: "#8FB20E",
        },
        {
          label: "Persona",
          percentage: toNum(best?.anchor_match_pct),
          color: "#3C3CC2",
        },
      ],
      user: { imageUrl: "/avatar.png" },
      industry: best?.industry,
      subSector: best?.sub_sector,
      seniority: best?.managerial_level,
      tags: ["Talent", "Persona"],
      matchAttributes: (best?.matched_skills || []).map((item) => ({
        item,
        tag: "Persona" as const,
      })),
    };
  }, [predictModelOne]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isLoading) {
      setLoadingProgress(0);
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const increment = prev < 75 ? 1 : 0.5;
          return Math.min(prev + increment, 90);
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  if (isLoading)
    return (
      <div className='w-full max-w-5xl mx-auto py-8 px-4'>
        <AILoader lottieSize='w-1/4' showQuotes={false} />
        <p className='text-center text-grey mt-8 w-full text-sm font-medium uppercase tracking-wider'>
          Mapping your role fit...
        </p>
        <div className='w-2/3 h-2 bg-light-grey/30 overflow-hidden mx-auto my-6 rounded-2xl'>
          <div
            className='h-full bg-purple rounded-r-2xl transition-all duration-500 ease-in-out'
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <AILoader showLottie={false} />
      </div>
    );

  return (
    <div className='space-y-6 mt-8 text-center'>
      <div className='w-full lg:max-w-5xl mx-auto py-4 lg:py-8 px-4 lg:px-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch'>
          <div className='bg-indigo-50/60 rounded-2xl p-5 md:p-6 border border-indigo-100 flex flex-col'>
            <div className='flex flex-col items-center lg:items-start'>
              <JobTitle title={mergedRoleData.jobTitle} />
              <div className='mt-4 lg:mt-2 flex flex-col items-center lg:items-start w-full'>
                <ProfileProgressRing
                  size={120}
                  progress={mergedRoleData.matchPercentage}
                  name={
                    predictModelOne?.structured_input?.["Profile Information"]?.[
                      "Full Name"
                    ] || "User"
                  }
                />
                <p className='text-center lg:text-left text-base lg:text-lg text-indigo-900 mt-2'>
                  Match -{" "}
                  <span className='font-bold'>{mergedRoleData.matchPercentage}%</span>
                </p>
              </div>
            </div>

            <div className='w-full'>
              <IndustrySection
                industry={mergedRoleData.industry}
                subSector={mergedRoleData.subSector}
                seniority={mergedRoleData.seniority}
              />
            </div>
          </div>

          <div className='bg-white rounded-2xl p-5 md:p-6 border border-indigo-100 flex flex-col'>
            <div className='h-28 md:h-36 lg:h-44 mb-6'>
              <GraphComponent
                data={mergedRoleData.matchBreakdown}
                heightClass='h-full'
                classes='h-full'
              />
            </div>
            <div className='w-full mt-2'>
              <AttributeSection
                tags={mergedRoleData.tags}
                matchAttributes={mergedRoleData.matchAttributes}
              />
            </div>
          </div>
        </div>

        <div className='flex justify-center mt-6'>
          <AccentButton
            text='Skill Snapshot'
            action={handleContinue}
            classes='w-full sm:w-auto'
          />
        </div>
      </div>
    </div>
  );
};

export default RoleRadar;
