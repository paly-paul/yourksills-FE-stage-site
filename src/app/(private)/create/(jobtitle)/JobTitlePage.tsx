import StepIndicator from "@/components/StepIndicator";
import { useState } from "react";
import JobPrediction from "./JobPrediction";
import RoleRadar from "./RoleRadar";
import RoleRecommendations from "./RoleRecommendations";
import RoleDetail from "./RoleDetail";
import { BackButton } from "@/components/BackButton";
import { useGetPredictModelOne } from "@/hooks/jobPrediction/useGetPredictModelOne";
import { useGetPredictModelTwo } from "@/hooks/jobPrediction/useGetPredictModelTwo";
import { useProfile } from "@/hooks/auth/profileHook";
import React, { useEffect } from "react";
import { useCvFlowStore } from "@/store/useCvFlowStore";
import { AlternateJob } from "@/services/jobPrediction/getPredictModelOneService";

const JobTitlePage = ({
  setCurrentScreen,
}: {
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [jobTitlePage, setJobTitlePage] = useState<string>("job-prediction");
  const [recommendationType] = useState<"same" | "alternate">("same");

  const { data: profileData } = useProfile();
  const referenceId = useCvFlowStore((state) => state.referenceId);
  const setJobTitle = useCvFlowStore((state) => state.setJobTitle);
  const [roleDetail, setRoleDetail] = useState<AlternateJob>();

  const predictModelRequestPayload = {
    user_id: String(profileData?.profile.id ?? ""),
    reference_id: referenceId,
  };

  const canQuery = Boolean(
    predictModelRequestPayload.user_id &&
    predictModelRequestPayload.reference_id
  );

  const modelOne = useGetPredictModelOne(predictModelRequestPayload, {
    enabled: canQuery,
  });
  const modelTwo = useGetPredictModelTwo(predictModelRequestPayload, {
    enabled: canQuery,
  });

  // Persist best fit job title into central store when available
  useEffect(() => {
    const title = modelOne.data?.best_fit?.job_role;
    if (title) setJobTitle(title);
  }, [modelOne.data?.best_fit?.job_role, setJobTitle]);

  const backNav =
    jobTitlePage === "job-prediction"
      ? () => setCurrentScreen("summary")
      : jobTitlePage === "role-radar"
        ? () => setJobTitlePage("job-prediction")
        : jobTitlePage === "role-recommendations"
          ? () => setJobTitlePage("role-radar")
          : () => setJobTitlePage("role-recommendations");

  const pageMeta: Record<string, { title: string; description: string }> = {
    "job-prediction": {
      title: "Job Prediction",
      description:
        "Discover Tailored Career Opportunities Aligned with Your Skills in a Rapidly Evolving Industry",
    },
    "role-radar": {
      title: "Role Radar",
      description:
        "Visualize how your skills align with target roles to spot strengths and gaps",
    },
    "role-recommendations": {
      title: "Role Recommendations",
      description:
        "Get curated role suggestions matched to your profile and career goals",
    },
    "role-detail": {
      title: "Role Detail",
      description:
        "Dive deeper into responsibilities, required skills, and growth paths for this role",
    },
  };

  const headerTitle =
    pageMeta[jobTitlePage]?.title ?? pageMeta["job-prediction"].title;
  const headerDescription =
    pageMeta[jobTitlePage]?.description ??
    pageMeta["job-prediction"].description;

  return (
    <main className='min-h-screen py-6 lg:py-10 gradient-bg '>
      <div className='container'>
        <div className='tag-shadow p-4 lg:p-8 rounded-3xl bg-white/90'>
          <div className='flex flex-col lg:flex-row lg:items-center'>
            <BackButton action={backNav} />
            <div className='w-full px-4 mt-4 lg:mt-0 lg:px-0'>
              <StepIndicator
                currentStep={4}
                setCurrentScreen={setCurrentScreen}
              />
            </div>
          </div>
          <div className='space-y-4 lg:space-y-6 mt-14 mb-4 lg:my-8 text-center'>
            <h1 className='font-semibold text-xl lg:text-2xl text-title-black'>
              {headerTitle}
            </h1>
            <p className='text-xs lg:text-sm text-grey'>{headerDescription}</p>
          </div>
          {jobTitlePage === "job-prediction" && (
            <JobPrediction setJobTitlePage={setJobTitlePage} />
          )}
          {jobTitlePage === "role-radar" && (
            <RoleRadar
              onNext={() => setCurrentScreen("snapshot")}
              modelOne={modelOne}
              modelTwo={modelTwo}
            />
          )}
          {jobTitlePage === "role-recommendations" && (
            <RoleRecommendations
              setJobTitlePage={setJobTitlePage}
              onNext={() => setCurrentScreen("snapshot")}
              modelOne={modelOne}
              modelTwo={modelTwo}
              initialType={recommendationType}
              setRoleDetail={setRoleDetail}
            />
          )}
          {jobTitlePage === "role-detail" && (
            <RoleDetail
              setJobTitlePage={setJobTitlePage}
              onNext={() => setCurrentScreen("snapshot")}
              modelOne={modelOne}
              modelTwo={modelTwo}
              roleDetail={roleDetail}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default JobTitlePage;
