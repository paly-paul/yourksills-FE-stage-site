import { processCountryPackages } from "./countryUtils";
import type {
  SnapShotData,
  SkillsAnalysisCategory,
} from "@/services/snapshot/generateAllInsightsService";

// Type alias for the results object
type ApiResults = SnapShotData["results"];

// Local interfaces for component props
interface MatchScore {
  label: string;
  percentage: number;
  color: string;
}

interface WhyBox {
  title: string;
  description: string;
}

interface SkillJourneyCard {
  title: string;
  duration: string;
  progress: number;
  stages: Array<{
    title: string;
    skills: string[];
  }>;
  takeaway: string;
  color: string;
}

interface ActionStep {
  title: string;
  items: string[];
  icon: string;
}

/**
 * Extracts profile information (Why to hire and Takeaway)
 */
const getProfileInfo = (apiResults: ApiResults) => {
  const jobStandardsAndPolished =
    apiResults?.Skill_and_Role?.Job_Standards_and_Polished;

  return {
    whyToHire: jobStandardsAndPolished?.Why_to_hire ?? "",
    takeawayWhy: jobStandardsAndPolished?.Takeaway ?? "",
  };
};

/**
 * Extracts pitch information for skill, behavioral, and learning matches
 */
const getPitches = (apiResults: ApiResults) => {
  const pitches = apiResults?.Growth_and_Market?.Pitches;

  return {
    "Skill Pitch": pitches?.["Skill Pitch"] ?? "",
    "Behavioral Pitch": pitches?.["Behavioral Pitch"] ?? "",
    "Learning Pitch": pitches?.["Learning Pitch"] ?? "",
  };
};

/**
 * Calculates match scores for skill, behavioral, and learning
 */
const getMatchScores = (apiResults: ApiResults): MatchScore[] => {
  const parsePercentage = (value: string | number | undefined): number => {
    return Number((value ?? "0").toString().replace("%", "")) || 0;
  };

  return [
    {
      label: "Skill",
      percentage: parsePercentage(
        apiResults?.Growth_and_Market?.Pitches?.["Overall Skill Match %"]
      ),
      color: "#48ABE8",
    },
    {
      label: "Behavioral",
      percentage: parsePercentage(
        apiResults?.Growth_and_Market?.Pitches?.["Overall Behavioral Match %"]
      ),
      color: "#8FB20E",
    },
    {
      label: "Learning",
      percentage: parsePercentage(
        apiResults?.Growth_and_Market?.Pitches?.["Overall Learning Match %"]
      ),
      color: "#3C3CC2",
    },
  ];
};

/**
 * Generates why boxes data from polished candidate
 */
const getWhyBoxes = (apiResults: ApiResults): WhyBox[] => {
  const polishedCandidate =
    apiResults?.Skill_and_Role?.Job_Standards_and_Polished?.Polished_Candidate;

  return [
    {
      title: "Top Skills",
      description: (polishedCandidate?.Skills ?? []).join(", "),
    },
    {
      title: "Abilities",
      description: (polishedCandidate?.Abilities ?? []).join(", "),
    },
    {
      title: "Knowledge",
      description: (polishedCandidate?.Knowledge ?? []).join(", "),
    },
  ];
};

/**
 * Extracts and formats skill journey cards data
 */
const getSkillJourneyCards = (apiResults: ApiResults): SkillJourneyCard[] => {
  const journey = apiResults?.Skill_and_Role?.Skill_Journey?.Polished_Candidate;

  return [
    {
      title: "Technical Skills",
      duration: "",
      progress: 100,
      stages: [
        {
          title: "Foundation",
          skills: journey?.Technical?.Foundation ?? [],
        },
        {
          title: "Strengthening",
          skills: journey?.Technical?.Strengthening ?? [],
        },
        {
          title: "Transition",
          skills: journey?.Technical?.Transition ?? [],
        },
      ],
      takeaway: apiResults?.Skill_and_Role?.Skill_Journey?.Takeaway_ts ?? "",
      color: "#5656E2",
    },
    {
      title: "Functional Skills",
      duration: "",
      progress: 50,
      stages: [
        {
          title: "Transition Phase",
          skills: journey?.Functional?.["Transition phase"] ?? [],
        },
      ],
      takeaway: apiResults?.Skill_and_Role?.Skill_Journey?.Takeaway_fs ?? "",
      color: "#105B94",
    },
    {
      title: "Behavioral Skills",
      duration: "",
      progress: 80,
      stages: [
        {
          title: "Learning Growth",
          skills: journey?.Behavioral?.["Learning Growth"] ?? [],
        },
      ],
      takeaway: apiResults?.Skill_and_Role?.Skill_Journey?.Takeaway_bs ?? "",
      color: "#2E7D32",
    },
  ];
};

/**
 * Extracts pillar chart data (skills, doing, outcome, takeaway)
 */
const getPillarChartData = (apiResults: ApiResults) => {
  const skillPillarsBlock = apiResults?.Skill_and_Role?.Skill_Pillars;

  return {
    skills: (skillPillarsBlock?.Skill_Pillars ?? []) as string[],
    doing: (skillPillarsBlock?.What_you_are_doing ?? []) as string[],
    outcome: (skillPillarsBlock?.Outcome ?? []) as string[],
    takeaway: (skillPillarsBlock?.Takeaway ?? "") as string,
  };
};

/**
 * Extracts and formats action steps (Learn, Build, Share, Apply)
 */
const getActionSteps = (apiResults: ApiResults): ActionStep[] => {
  const actionSteps = apiResults?.Growth_and_Market?.["What to do next"];

  const learn = actionSteps?.Learn ?? [];
  const build = actionSteps?.Build ?? [];
  const share = actionSteps?.Share ?? [];
  const apply = (actionSteps?.Apply ?? []).map((j) => {
    // Get first defined value from the record
    const value = Object.values(j).find((v) => v !== undefined);
    return value ?? "";
  });

  return [
    { title: "Learn", items: learn, icon: "/icons/learn.svg" },
    { title: "Build", items: build, icon: "/icons/build.svg" },
    { title: "Share", items: share, icon: "/icons/share.svg" },
    { title: "Apply", items: apply, icon: "/icons/apply.svg" },
  ];
};

/**
 * Extracts career progression roles data
 * Extracts the dynamic job title key from each level as the title
 */
const getCareerProgressionRoles = (apiResults: ApiResults) => {
  const careerProgression = apiResults?.Growth_and_Market?.Career_Progression;

  // Helper function to get the job title key and points from a level
  const getLevelData = (level: Record<string, string[]> | undefined) => {
    if (!level) return { title: "", points: [] };

    // Get the first key that's not "Job Level"
    const jobTitleKey =
      Object.keys(level).find((key) => key !== "Job Level") ?? "";
    const points = level[jobTitleKey] ?? [];

    return { title: jobTitleKey, points };
  };

  const entryData = getLevelData(careerProgression?.Entry);
  const middleData = getLevelData(careerProgression?.Middle);
  const seniorData = getLevelData(careerProgression?.Senior);

  return {
    roles: [
      {
        level: "Entry",
        experience: 2,
        icon: "/icons/food.svg",
        title: entryData.title,
        points: entryData.points,
      },
      {
        level: "Middle",
        experience: 5,
        icon: "/icons/food.svg",
        title: middleData.title,
        points: middleData.points,
      },
      {
        level: "Senior",
        experience: 8,
        icon: "/icons/food.svg",
        title: seniorData.title,
        points: seniorData.points,
      },
    ],
  };
};

/**
 * Extracts and processes salary and geo opportunity data
 */
const getSalaryData = (apiResults: ApiResults) => {
  const geoOpportunity = apiResults?.Growth_and_Market?.Geo_Opportunity;
  const countryPackages = geoOpportunity?.["Country with package"] ?? [];

  const mapDataArray = processCountryPackages(countryPackages);

  // Parse city data
  const cityData = geoOpportunity?.City ?? "";
  const firstSpaceIndex = cityData.indexOf(" ");

  let averageSalary = "";
  let cityName = "";

  if (firstSpaceIndex !== -1) {
    averageSalary = cityData.slice(0, firstSpaceIndex).trim();
    cityName = cityData.slice(firstSpaceIndex + 1).trim();
  }

  return {
    averageSalary,
    city: cityName,
    demand: "High",
    companies: geoOpportunity?.Companies ?? [],
    mapData: mapDataArray,
  };
};

/**
 * Extracts tools data for different expertise levels
 */
const getToolsData = (apiResults: ApiResults) => {
  const technicalCareer = apiResults?.Technical_and_Career;

  return {
    Explorer: technicalCareer?.Explorer,
    Practitioner: technicalCareer?.Practitioner,
    Expert: technicalCareer?.Expert,
    Takeaway: technicalCareer?.Takeaway ?? "",
  };
};

/**
 * Extracts and formats project manager summary data
 */
const getProjectManagerSummary = (apiResults: ApiResults) => {
  const technicalCareer = apiResults?.Technical_and_Career;
  const daily = technicalCareer?.["Daily Routine"];

  const scheduleData = [
    {
      time: "morning",
      icon: "/icons/Sun.svg",
      details: daily?.Morning || [],
    },
    {
      time: "midday",
      icon: "/icons/Cloud.svg",
      details: daily?.["Mid-day"] || [],
    },
    {
      time: "evening",
      icon: "/icons/Moon.svg",
      details: daily?.Evening || [],
    },
  ];

  const weekly = technicalCareer?.["Weekly Activities"] || [];
  const chartData = weekly.map(
    (item: { Activity: string; "Value%": string }) => {
      const activity = item.Activity || "";
      const valuePercent = item["Value%"] || "0%";
      const percentValue = parseInt(String(valuePercent).replace("%", "")) || 0;
      return { name: activity, value: percentValue };
    }
  );

  const kpiList = technicalCareer?.["KPI Focus"]?.KPI || [];
  const kpiData = kpiList.map((kpi: string) => ({ name: kpi }));

  const toolsList = technicalCareer?.["Tools and Technologies"]?.Tools || [];
  const toolsData = toolsList.map((tool: string) => ({ name: tool }));

  return {
    jobTitle: technicalCareer?.["Job Title"],
    scheduleData,
    chartData,
    kpiData,
    toolsData,
  };
};

/**
 * Extracts and formats skill heatmap data
 */
const getSkillHeatmapData = (apiResults: ApiResults) => {
  const technicalCareer = apiResults?.Technical_and_Career;

  const colorMap: Record<string, string> = {
    "Hot Skills": "from-[#C95151] to-[#FF8E53]",
    "Warm Skills": "from-[#AA8246] to-[#FFCB47]",
    "Getting There Skills": "from-[#82AA50] to-[#86EFAC]",
  };

  const skillHeatmapData: Record<
    string,
    {
      color: string;
      skills: Array<{
        name: string;
        value: number;
        level?: string;
      }>;
    }
  > = {};

  Object.entries(technicalCareer?.["Skills Analysis"] || {}).forEach(
    ([category, skills]) => {
      const skillsArray = skills as SkillsAnalysisCategory[];
      const transformed = skillsArray.map((item, index) => ({
        name: item.Skill,
        value: item["Importance (%)"],
        level:
          index === 0
            ? "Expert"
            : index === skillsArray.length - 1
            ? "Beginner"
            : undefined,
      }));

      skillHeatmapData[category] = {
        color: colorMap[category],
        skills: transformed,
      };
    }
  );

  return skillHeatmapData;
};

/**
 * Extracts top 3 hot skills from Skills Analysis
 */
interface TopSkill {
  name: string;
  percentage: number;
}

const getTopSkills = (apiResults: ApiResults): TopSkill[] => {
  const hotSkills = apiResults?.Technical_and_Career?.["Skills Analysis"]?.["Hot Skills"] ?? [];

  if (!Array.isArray(hotSkills) || hotSkills.length === 0) {
    return [];
  }

  return hotSkills
    .slice(0, 3)
    .map((skill: { Skill?: string; "Importance (%)"?: number }) => ({
      name: skill.Skill || "Unknown",
      percentage: typeof skill["Importance (%)"] === "number" ? skill["Importance (%)"] : 0,
    }));
};

/**
 * Extracts career progression data (current and target career levels)
 */
interface CareerStage {
  current: string;
  target: string;
}

const getCareerStage = (apiResults: ApiResults): CareerStage => {
  // Try to extract from Career_Progression job level
  const jobLevel = apiResults?.Growth_and_Market?.Career_Progression?.["Job Level"];
  const career_stage = apiResults?.Growth_and_Market?.Pitches?.["Career Stage"];

  if (career_stage) {
    if (typeof career_stage === "string" && career_stage.includes("-")) {
      const [current, target] = career_stage.split("-").map(s => s.trim());
      return { current, target };
    }
    return { current: "Entry", target: career_stage };
  }

  if (jobLevel) {
    return { current: "Entry", target: jobLevel };
  }

  return { current: "Entry", target: "Senior" };
};

/**
 * Extracts prediction metrics from predict-model1 API response
 */
interface PredictionMetrics {
  talentMatch: number;
  anchorMatch: number;
  overallMatch: number;
}

interface PredictionMatchMetric {
  value: string;
  label: string;
  color: string;
}

const getPredictionMetrics = (
  predictionData: { best_fit?: { talent_match_pct?: string | number; anchor_match_pct?: string | number; overall_match_pct?: string | number } } | undefined
): PredictionMatchMetric[] => {
  const parsePercentage = (value: string | number | undefined): number => {
    return Number((value ?? "0").toString().replace("%", "")) || 0;
  };

  const talentMatch = parsePercentage(predictionData?.best_fit?.talent_match_pct);
  const anchorMatch = parsePercentage(predictionData?.best_fit?.anchor_match_pct);
  const overallMatch = parsePercentage(predictionData?.best_fit?.overall_match_pct);

  return [
    {
      value: `${talentMatch}%`,
      label: "Talent Match",
      color: "#3b5bdb",
    },
    {
      value: `${anchorMatch}%`,
      label: "Anchor Match",
      color: "#40c057",
    },
    {
      value: `${overallMatch}%`,
      label: "Overall Match",
      color: "#7950f2",
    },
  ];
};

// Consolidated exports
export {
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
  getPredictionMetrics,
  type TopSkill,
  type CareerStage,
  type PredictionMetrics,
  type PredictionMatchMetric,
};
