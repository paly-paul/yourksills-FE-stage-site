"use client";

import ActivityCard from "@/components/dashboard/ActivityCard";
import CreditsCard from "@/components/dashboard/CreditsCard";
import GreetingBanner from "@/components/dashboard/GreetingBanner";
import PredictedRoleCard from "@/components/dashboard/PredictedRoleCard";
import ProfileCard from "@/components/dashboard/ProfileCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import SkillGapCard from "@/components/dashboard/SkillGapCard";
import SkillJourneyChart from "@/components/dashboard/SkillJourneyChart";
import SkillSnapshotCard from "@/components/dashboard/SkillSnapshotCard";
import { useProfile } from "@/hooks/auth/profileHook";
import { useCvFlowStore } from "@/store/useCvFlowStore";
import { useGetInsights } from "@/hooks/snapshot/useGetInsights";
import { useGetPredictModelOneResult } from "@/hooks/jobPrediction/useGetPredictModelOneResult";

export default function DashboardPage() {
  const { data: profileData } = useProfile();
  const referenceId = useCvFlowStore((state) => state.referenceId);
  const withCv = useCvFlowStore((state) => state.withCv);

  const normalizedUserId =
    profileData?.profile?.id !== undefined ? String(profileData.profile.id) : "";

  // Fetch the latest insights
  const { data: insightsData, isLoading, isError } = useGetInsights({
    user_id: normalizedUserId,
    reference_id: withCv ? referenceId : undefined,
    document_id: !withCv ? referenceId : undefined,
  });

  // Fetch the latest prediction result
  const { data: predictionData, isLoading: predictionLoading } = useGetPredictModelOneResult({
    user_id: normalizedUserId,
    reference_id: withCv ? referenceId : undefined,
    document_id: !withCv ? referenceId : undefined,
  });

  // Extract data for ProfileCard and GreetingBanner
  const profileName = insightsData?.results?.Growth_and_Market?.Pitches?.Name || "User";
  const profileRole = insightsData?.results?.Growth_and_Market?.Pitches?.["Job Title"] || "Professional";
  const profileCareerStage = insightsData?.results?.Growth_and_Market?.Pitches?.["Career Stage"] || "Mid-Career";
  const profileDescription =
    insightsData?.results?.Skill_and_Role?.Job_Standards_and_Polished?.Why_to_hire ||
    "Dedicated professional bringing expertise and commitment to every project.";
  
  // Extract match percentages
  const parsePercentage = (value: string | number | undefined): number => {
    return Number((value ?? "0").toString().replace("%", "")) || 0;
  };

  const skillMatch = parsePercentage(
    insightsData?.results?.Growth_and_Market?.Pitches?.["Overall Skill Match %"]
  );
  const behavioralMatch = parsePercentage(
    insightsData?.results?.Growth_and_Market?.Pitches?.["Overall Behavioral Match %"]
  );
  const learningMatch = parsePercentage(
    insightsData?.results?.Growth_and_Market?.Pitches?.["Overall Learning Match %"]
  );

  return (
    <div className='max-w-[1120px] mx-auto px-5 pt-7 pb-12'>
      <GreetingBanner
        skillMatch={skillMatch}
        behavioralMatch={behavioralMatch}
        learningMatch={learningMatch}
        isLoading={isLoading}
      />

      <div className='grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-5 items-start'>
        <div className='flex flex-col gap-5'>
          <ProfileCard
            name={profileName}
            role={profileRole}
            careerStage={profileCareerStage}
            description={profileDescription}
            isLoading={isLoading}
          />
          <CreditsCard />
          <QuickActionsCard />
        </div>

        <div className='flex flex-col gap-5'>
          <PredictedRoleCard predictionData={predictionData} isLoading={predictionLoading} />
          <SkillSnapshotCard insightsData={insightsData} isLoading={isLoading} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <SkillGapCard insightsData={insightsData} />
            <ActivityCard insightsData={insightsData} />
          </div>
          <SkillJourneyChart insightsData={insightsData} />
        </div>
      </div>

      {/* Error state */}
      {isError && (
        <div className='mt-8 p-4 bg-red-50 border border-red-200 rounded-lg'>
          <p className='text-sm text-red-700'>
            Failed to load insights. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
}
