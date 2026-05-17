import { AccentButton, BorderButton } from "@/components/CustomButton";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import {
  AlternateJob,
  PredictModelResponse,
} from "@/services/jobPrediction/getPredictModelOneService";
import { PredictModelTwoResponse } from "@/services/jobPrediction/getPredictModelTwoService";
import { JobTitle } from "./(components)/JobTitle";
import { MatchPercentage } from "./(components)/MatchPercentage";
import { IndustrySection } from "./(components)/IndustrySection";
import { GraphComponent } from "./(components)/GraphComponent";
import { AttributeSection } from "./(components)/AttributeSection";
import { useStepIndicatorStore } from "@/store/useStepIndicatorStore";
import { useCvFlowStore } from "@/store/useCvFlowStore";
import AILoader from "@/components/AILoader";

type Props = {
  setJobTitlePage: Dispatch<SetStateAction<string>>;
  onNext: () => void;
  modelOne: UseQueryResult<PredictModelResponse, Error>;
  modelTwo: UseQueryResult<PredictModelTwoResponse, Error>;
  roleDetail: AlternateJob | undefined;
};

const RoleDetail = ({
  setJobTitlePage,
  onNext,
  modelOne,
  modelTwo,
  roleDetail,
}: Props) => {
  const isLoading = modelOne.isFetching || modelTwo.isFetching;
  const setCompletedStepIndex = useStepIndicatorStore(
    (state) => state.setCompletedStepIndex
  );
  const setJobTitle = useCvFlowStore((state) => state.setJobTitle);

  const handleContinue = () => {
    setCompletedStepIndex(4);
    onNext();
  };

  useEffect(() => {
    const title = roleDetail?.job_title;
    if (title) setJobTitle(title);
  }, [roleDetail, setJobTitle]);

  const roleData = useMemo(() => {
    // You could select a job more dynamically if needed; here uses the first alternate_job
    const first = roleDetail;
    if (!first) return null;
    return {
      jobTitle: first.job_title,
      matchPercent: parseFloat(
        (first.overall_match_pct || "").replace("%", "")
      ),
      industry: first.industry,
      subSector: first.sub_sector,
      seniority: first.managerial_level,
      matchBreakdown: [
        {
          label: "Talent",
          percentage: parseFloat(
            (first.talent_match_pct || "").replace("%", "")
          ),
          color: "#8FB20E",
        },
        {
          label: "Persona",
          percentage: parseFloat(
            (first.anchor_match_pct || "").replace("%", "")
          ),
          color: "#3C3CC2",
        },
      ],
      tags: ["Talent", "Persona"],
      matchAttributes: (first.matched_skills || []).map((item) => ({
        item,
        tag: "Persona" as const,
      })),
      skillGaps: (first.missing_skills || []).map((item) => ({
        item,
        tag: "Persona" as const,
      })),
    };
  }, [roleDetail]);

  if (isLoading || !roleData)
    return (
        <div className='w-full block mx-auto'>
          <AILoader />
        </div>

    );

  const secondaryButtonText =
    modelOne.data?.best_fit.job_family === "job"
      ? "Explore Alternate Industry"
      : "Explore Predictions";

  return (
    <div className='text-center mt-8 space-y-6 px-4 lg:px-0'>
      <div className='flex flex-col lg:grid lg:grid-cols-[3fr_4fr] lg:max-w-4/5 2xl:max-w-2/3 mx-auto gap-8 lg:gap-20 py-8 lg:py-16'>
        <div className="w-full">
          <JobTitle title={roleData.jobTitle} />
          <div className='flex flex-col lg:grid lg:grid-cols-2 gap-8 mt-6'>
            <div className='space-y-8 flex flex-col items-center lg:items-start'>
              <div className="w-full">
                <MatchPercentage percentage={roleData.matchPercent} />
              </div>
              <div className="w-full">
                <IndustrySection
                  industry={roleData.industry}
                  subSector={roleData.subSector}
                  seniority={roleData.seniority}
                />
              </div>
            </div>
            <div className="h-20 md:h-40 lg:h-full">
              <GraphComponent
                data={roleData.matchBreakdown}
                heightClass='h-full'
              />
            </div>
          </div>
        </div>
        <AttributeSection
          tags={roleData.tags}
          matchAttributes={roleData.matchAttributes}
          skillGaps={roleData.skillGaps}
        />
      </div>
      <div className='flex flex-col sm:flex-row justify-center gap-4 mt-8 lg:mt-16 px-4 lg:px-0'>
        <AccentButton
          text='Skill Snapshot'
          action={handleContinue}
          classes="w-full sm:w-auto text-sm lg:text-base"
        />
        <BorderButton
          text={secondaryButtonText}
          action={() => setJobTitlePage("role-recommendations")}
          classes="w-full sm:w-auto text-sm lg:text-base"
        />
      </div>
    </div>
  );
};

export default RoleDetail;
