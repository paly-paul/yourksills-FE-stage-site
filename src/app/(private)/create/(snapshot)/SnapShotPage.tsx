import StepIndicator from "@/components/StepIndicator";
import TitleComponent from "@/components/TitleComponent";
import Image from "next/image";
import { GraphComponent } from "../(jobtitle)/(components)/GraphComponent";
import SkillJourney from "./SkillJourney";
import WhyBox from "./WhyBox";
import BubbleChart from "./Bubblechart";
import PillarChart from "./PillarChart";
import TitleWithIcon from "./TitleWIthIcon";
import Linechart from "./LineChart";
import MapCart from "./MapChart";
import ProjectManager from "./ProjectManager";
import SkillHeatMap from "./SkillHeatMap";
import ActionSteps from "./ActionSteps";
import { AccentButton, BorderButton } from "@/components/CustomButton";
import Link from "next/link";
import { useCvFlowStore } from "@/store/useCvFlowStore";
import { BackButton } from "@/components/BackButton";
import {
  getProfileInfo,
  getPitches,
  getMatchScores,
  getWhyBoxes,
  getSkillJourneyCards,
  getPillarChartData,
  getActionSteps,
  getCareerProgressionRoles,
  getSalaryData,
  getToolsData,
  getProjectManagerSummary,
  getSkillHeatmapData,
  getTopSkills,
  getCareerStage,
} from "./helper/snapshotHelper";
import { useProfile } from "@/hooks/auth/profileHook";
import { useState, useRef, useEffect, useMemo } from "react";
import { useGenerateAllInsights } from "@/hooks/snapshot/useGenerateAllInsights";
import { useGetPredictModelOneResult } from "@/hooks/jobPrediction/useGetPredictModelOneResult";
import Summaryloader from "../(upload)/SummaryLoader";
import { generatePDF } from "@/utils/pdfGenerator";
import PDFLoadingOverlay from "./PDFLoadingOverlay";
import ProfileProgressRing from "@/components/ProfileProgressRing";
import { AxiosError } from "axios";

export const TextPill = ({
  text,
  classes,
  style,
}: {
  text?: string;
  classes: string;
  style?: { color: string };
}) => {
  if (!text) return null;
  return (
    <span
      className={`px-3 py-1 rounded-full text-slate-900 ${classes}`}
      style={style}>
      {text}
    </span>
  );
};

const SnapShotPage = ({
  setCurrentScreen,
}: {
  setCurrentScreen?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1280);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);
  const { data: profileData } = useProfile();

  const withCv = useCvFlowStore((state) => state.withCv);
  const referenceId = useCvFlowStore((state) => state.referenceId);
  const jobTitle = useCvFlowStore((state) => state.jobTitle);
  const hasHydrated = useCvFlowStore((state) => state.hasHydrated);

  const normalizedUserId =
    profileData?.profile?.id !== undefined ? String(profileData.profile.id) : "";
  const normalizedJobTitle = (jobTitle ?? "").trim();
  const normalizedReferenceId = (referenceId ?? "").trim();

  const hasValidReferenceId =
    normalizedReferenceId.length > 0 &&
    normalizedReferenceId !== "undefined" &&
    normalizedReferenceId !== "null";
  const canGenerateInsights =
    hasHydrated &&
    normalizedUserId.length > 0 &&
    normalizedJobTitle.length > 0 &&
    hasValidReferenceId;

  const payload = useMemo(
    () =>
      withCv
        ? {
            user_id: normalizedUserId,
            job_title: normalizedJobTitle,
            reference_id: normalizedReferenceId,
          }
        : {
            user_id: normalizedUserId,
            job_title: normalizedJobTitle,
            document_id: normalizedReferenceId,
          },
    [withCv, normalizedUserId, normalizedJobTitle, normalizedReferenceId]
  );

  const {
    data: snapshotData,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGenerateAllInsights(payload, {
    enabled: canGenerateInsights,
    onSuccess: () => {
      setShowLoader(false);
    },
  });

  // Fetch prediction data with the same payload
  const { data: predictionData } = useGetPredictModelOneResult(payload, {
    enabled: canGenerateInsights,
  });

  // Debug logging - remove after testing
  useEffect(() => {
    if (snapshotData && predictionData) {
      const apiResults = snapshotData?.results;
      console.log("=== SNAPSHOT & PREDICTION DATA DEBUG ===");
      console.log("Full snapshotData structure:", snapshotData);
      console.log("Full predictionData structure:", predictionData);
      console.log("---");
      console.log("Growth_and_Market:", apiResults?.Growth_and_Market);
      console.log("---");
      console.log("Pitches object:", apiResults?.Growth_and_Market?.Pitches);
      console.log("---");
      console.log("Name extracted:", apiResults?.Growth_and_Market?.Pitches?.Name);
      console.log("Job Title extracted:", apiResults?.Growth_and_Market?.Pitches?.["Job Title"]);
      console.log("Career Stage:", apiResults?.Growth_and_Market?.Pitches?.["Career Stage"]);
      console.log("---");
      console.log("Skill Match %:", apiResults?.Growth_and_Market?.Pitches?.["Overall Skill Match %"]);
      console.log("Behavioral Match %:", apiResults?.Growth_and_Market?.Pitches?.["Overall Behavioral Match %"]);
      console.log("Learning Match %:", apiResults?.Growth_and_Market?.Pitches?.["Overall Learning Match %"]);
      console.log("---");
      console.log("Prediction Data:");
      console.log("  Talent Match:", predictionData?.best_fit?.talent_match_pct);
      console.log("  Anchor Match:", predictionData?.best_fit?.anchor_match_pct);
      console.log("  Overall Match:", predictionData?.best_fit?.overall_match_pct);
      console.log("  Matched Skills:", predictionData?.best_fit?.matched_skills);
      console.log("  Missing Skills:", predictionData?.best_fit?.missing_skills);
      console.log("---");
      console.log("Hot Skills:", apiResults?.Technical_and_Career?.["Skills Analysis"]?.["Hot Skills"]);
      console.log("=== END DEBUG ===");
    }
  }, [snapshotData, predictionData]);

  // Show loader while snapshot API is being fetched
  if (showLoader || isLoading)
    return (
      <Summaryloader
        onComplete={() => setShowLoader(false)}
        isSuccess={isSuccess}
        isPending={isLoading}
      />
    );

  if (isError || !snapshotData) {
    const axiosError = error as AxiosError<{ detail?: string; message?: string }>;
    const errorMessage =
      axiosError?.response?.data?.detail ||
      axiosError?.response?.data?.message ||
      axiosError?.message ||
      "Unable to generate insights. Please try again.";

    return (
      <div className='py-8'>
        <div className='container'>
          <div className='rounded-2xl border border-red-100 bg-red-50 p-6 text-center max-w-2xl mx-auto mt-8'>
            <h2 className='text-lg font-semibold text-red-700'>Could not generate insights</h2>
            <p className='text-sm text-red-600 mt-2 break-words'>{errorMessage}</p>
            <div className='mt-4'>
              <AccentButton text='Try Again' action={() => refetch()} classes='w-full sm:w-auto' />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const apiResults = snapshotData?.results;

  // Extract all data using helper functions
  const { whyToHire, takeawayWhy } = getProfileInfo(apiResults);
  const pillarChartData = getPillarChartData(apiResults);
  const pitches = getPitches(apiResults);
  const matchScores = getMatchScores(apiResults);
  const topSkills = getTopSkills(apiResults);
  const careerStage = getCareerStage(apiResults);
  const whyBoxes = getWhyBoxes(apiResults);
  const skillJourneyCards = getSkillJourneyCards(apiResults);
  const stepsArray = getActionSteps(apiResults);
  const careerProgressionRoles = getCareerProgressionRoles(apiResults);
  const salaryData = getSalaryData(apiResults);
  const tools = getToolsData(apiResults);
  const projectManagerSummary = getProjectManagerSummary(apiResults);
  const skillHeatmapData = getSkillHeatmapData(apiResults);

  // Handle PDF download
  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    setIsGeneratingPDF(true);

    // Give React time to render the overlay and start the animation
    // before blocking the main thread with PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await generatePDF(contentRef.current);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className='py-8'>
      <div className='container'>
        <div className='flex flex-col xl:flex-row xl:items-center no-pdf'>
          <BackButton action={() => setCurrentScreen?.("job-title")} />
          <div className='w-full px-4 mt-4 xl:mt-0 xl:px-0'>
            <StepIndicator currentStep={5} setCurrentScreen={setCurrentScreen} />
          </div>
        </div>
        <div className='mt-10 xl:mt-14'>
          <TitleComponent
            text="Hey there here's your"
            gradientText='Skill Snapshot!'
            className='!text-xl xl:!text-3xl !mb-4 xl:!mb-6'
          />
          <p className='text-grey text-xs xl:text-sm text-center -mt-4 xl:-mt-6'>
            Here&apos;s what SkillSnap uncovered about you.
          </p>
        </div>
        <div ref={contentRef} className='rounded-3xl tag-shadow mt-6 xl:mt-10 p-4 xl:p-10'>
          <div className='w-full xl:max-w-7xl mx-auto space-y-8 xl:space-y-16'>
            {/* profile section */}
            <div className='flex flex-col gap-6 xl:flex-row'>
              {/* Left Panel */}
              <div className='xl:w-3/7 flex flex-col items-start'>
                <div className='flex flex-row items-center gap-3 w-full'>
                  <div className='w-[60px] h-[60px] xl:w-36 xl:h-36 relative flex-shrink-0'>
                    <ProfileProgressRing
                      name={apiResults?.Growth_and_Market?.Pitches?.Name || "User"}
                      size={isMobile ? 60 : 144}
                    />
                  </div>
                  <div className='text-left flex-1'>
                    <h1 className='text-sm xl:text-2xl leading-none font-semibold gradient-text mb-3 xl:mb-5'>
                      {apiResults?.Growth_and_Market?.Pitches?.Name}
                    </h1>
                    <TextPill
                      text={
                        apiResults?.Growth_and_Market?.Pitches?.["Job Title"]
                      }
                      classes={"bg-violet-50 text-[8px] xl:text-xs"}
                    />
                    <div className='flex items-center justify-start my-1 xl:my-6 space-x-1 xl:space-x-2'>
                      <TextPill text={careerStage.current} classes={"bg-sky-50 text-[8px] xl:text-sm"} />
                      <Image
                        src='/icons/arrow-right-grey.svg'
                        width={12}
                        height={12}
                        alt=''
                        className='xl:w-5 xl:h-5'
                      />
                      <TextPill
                        text={careerStage.target}
                        classes={"bg-indigo-400/60 text-[8px] xl:text-sm"}
                      />
                    </div>
                  </div>
                </div>
                <GraphComponent
                  data={matchScores}
                  heightClass='h-16 xl:h-30'
                  classes='w-full justify-center xl:justify-end'
                />
                {/* Top Skills Display */}
                {topSkills.length > 0 && (
                  <div className='mt-4 flex flex-wrap gap-2 xl:gap-3'>
                    {topSkills.map((skill, index) => (
                      <div
                        key={index}
                        className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100'
                      >
                        <span className='text-xs xl:text-sm font-semibold text-gray-800'>
                          {skill.name}
                        </span>
                        <span className='text-xs font-bold text-purple-600'>
                          {skill.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className='space-y-1 mt-2 text-left'>
                  {Object.entries(pitches).map(([key, items], index) => (
                    <p className='text-[8px] xl:text-sm' key={index}>
                      <span className='font-semibold'>{key}- </span>
                      {items}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right Panel */}
              <div className='xl:w-4/7 flex flex-col justify-center'>
                <h3 className='text-lg xl:text-2xl font-semibold mb-3 xl:mb-5 text-center xl:text-left'>
                  <Image
                    src='/icons/Info.svg'
                    width={18}
                    height={18}
                    alt=''
                    className='xl:w-6 xl:h-6'
                    style={{
                      display: "inline-block",
                      marginRight: ".5rem",
                      verticalAlign: "text-bottom",
                    }}
                  />
                  Why {apiResults?.Growth_and_Market?.Pitches?.Name}
                </h3>
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-3 xl:gap-4 mb-4'>
                  {whyBoxes.map((box, index) => (
                    <WhyBox
                      key={index}
                      title={box.title}
                      description={box.description}
                      color={["#1373B6", "#2E7D32", "#313189"][index]}
                    />
                  ))}
                </div>
                <div className='mt-2 xl:mt-4 space-y-4 xl:space-y-6'>
                  <ul className='list-disc text-black mt-2 xl:mt-4 px-4 xl:pl-8 text-sm xl:text-base'>
                    <li>{whyToHire}</li>
                  </ul>
                  <div className='px-4 xl:px-0'>
                    <p className='font-semibold text-green-600 text-xs xl:text-sm'>
                      Takeaway Insight:
                    </p>
                    <p className='text-xs xl:text-sm'>{takeawayWhy}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* skill journey section */}
            <div>
              <TitleWithIcon
                image={"/icons/map-alt.svg"}
                title={"Skill Journey"}
              />
              <div className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
                {skillJourneyCards.map((card, i) => (
                  <SkillJourney
                    key={i}
                    title={card.title}
                    duration={card.duration}
                    stages={card.stages}
                    takeaway={card.takeaway}
                    progress={card.progress}
                    color={["#5656E2", "#105B94", "#2E7D32"][i]}
                  />
                ))}
              </div>
            </div>
            <br />
            <div className='pdf-page-break'></div>
            {/* chart section */}
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16'>
              <PillarChart
                skills={pillarChartData.skills}
                doing={pillarChartData.doing}
                outcome={pillarChartData.outcome}
                takeaway={pillarChartData.takeaway}
              />
              <BubbleChart toolsData={tools} />
            </div>

            {/* chart section */}
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16'>
              <Linechart roles={careerProgressionRoles.roles} />
              <MapCart salaryData={salaryData} />
            </div>
            <br />
            <div className='pdf-page-break'></div>
            {/* Project Manager - only show if data exists */}
            {apiResults?.Technical_and_Career?.["Daily Routine"] &&
              apiResults?.Technical_and_Career?.["Weekly Activities"] &&
              apiResults?.Technical_and_Career?.["KPI Focus"] &&
              apiResults?.Technical_and_Career?.["Tools and Technologies"] && (
                <ProjectManager summary={{ ...projectManagerSummary, jobTitle: projectManagerSummary.jobTitle || "Professional" }} />
              )}

            {/* skill heat map - only show if data exists */}
            {apiResults?.Technical_and_Career?.["Skills Analysis"] &&
              Object.keys(apiResults.Technical_and_Career["Skills Analysis"])
                .length > 0 && (
                <div className='pb-2 xl:pb-0'>
                  <TitleWithIcon
                    image={"/icons/arrow-up-split.svg"}
                    title={"Skill Heat map"}
                  />
                  <SkillHeatMap skills={skillHeatmapData} />
                </div>
              )}
            {/* action steps */}
            <div className='pt-6 xl:pt-10'>
              <TitleWithIcon
                image={"/icons/arrow-up-split.svg"}
                title={"What to Do Next?"}
              />
              <ActionSteps steps={stepsArray} />
            </div>
          </div>
          <div className='mt-6 xl:mt-8 space-y-3 no-pdf'>
            <div className='button-container flex flex-col sm:flex-row justify-center gap-3 mt-2'>
              <AccentButton
                text={isGeneratingPDF ? "Generating PDF..." : "Download"}
                action={handleDownloadPDF}
                disabled={isGeneratingPDF}
                classes='w-full sm:w-auto px-6 xl:px-8 text-sm xl:text-base'
              />
              <BorderButton text='Share Link' classes='w-full sm:w-auto px-6 xl:px-8 text-sm xl:text-base' />
              <BorderButton
                text='Continue to Dashboard'
                href='/dashboard'
                classes='w-full sm:w-auto px-6 xl:px-8 text-sm xl:text-base'
              />
            </div>
            <div className='text-center'>
              <Link
                className='text-xs xl:text-sm font-medium text-gray-400 hover:text-gray-600 ease-in-out duration-200'
                href='/create'>
                Generate New Skill Snapshot
              </Link>
            </div>
          </div>
        </div>
      </div>
      <PDFLoadingOverlay isVisible={isGeneratingPDF} />
    </div>
  );
};

export default SnapShotPage;
