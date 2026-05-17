import axios from "axios";

export type GenerateAllInsightsRequest = {
  user_id: string;
  reference_id?: string;
  job_title: string;
  document_id?: string;
};

export interface SkillItem {
  Technology?: string;
  Description?: string;
  Skill?: string;
  ["Importance (%)"]?: number;
}

export interface JobStandardsBlock {
  Skills: string[];
  Abilities: string[];
  Knowledge: string[];
}

export interface PolishedCandidateBlock {
  Skills: string[];
  Abilities: string[];
  Knowledge: string[];
}

export interface SkillPillarsBlock {
  Skill_Pillars: string[];
  What_you_are_doing: string[];
  Outcome: string[];
  Takeaway: string;
}

export interface SkillJourneyStage {
  Foundation: string[];
  Strengthening: string[];
  Transition: string[];
}

export interface FunctionalStage {
  ["Transition phase"]: string[];
}

export interface BehavioralStage {
  ["Learning Growth"]: string[];
}

export interface SkillJourneyPolishedCandidate {
  Technical: SkillJourneyStage;
  Functional: FunctionalStage;
  Behavioral: BehavioralStage;
  ["Technical Skills Takeaway"]?: string;
  ["Functional Skills Takeaway"]?: string;
  ["Behavioral Skills Takeaway"]?: string;
}

export interface ExplorerItem {
  Technology: string;
  Description: string;
}

export interface WeeklyActivitiesItem {
  Activity: string;
  ["Value%"]: string;
}

export interface DailyRoutineBlock {
  Morning: string[];
  ["Mid-day"]: string[];
  Evening: string[];
}

export interface ToolsAndTechBlock {
  Tools: string[];
}

export interface SkillsAnalysisCategory {
  Skill: string;
  ["Importance (%)"]: number;
}

export interface SkillsAnalysisBlock {
  ["Hot Skills"]: SkillsAnalysisCategory[];
  ["Warm Skills"]: SkillsAnalysisCategory[];
  ["Getting There Skills"]: SkillsAnalysisCategory[];
}

export interface KPIBlock {
  KPI: string[];
}

export interface CountryOpportunity {
  ["Country with package"]: string[];
  City: string;
  Companies: string[];
}

export interface TechnicalAndCareer {
  Explorer: ExplorerItem[];
  Practitioner: ExplorerItem[];
  Expert: ExplorerItem[];
  Takeaway: string;
  ["Job Title"]?: string;
  ["Job role"]?: string;
  ["Daily Routine"]?: DailyRoutineBlock;
  ["Weekly Activities"]?: { Activity: string; ["Value%"]: string }[];
  ["KPI Focus"]?: KPIBlock;
  ["Tools and Technologies"]?: ToolsAndTechBlock;
  ["Skills Analysis"]?: SkillsAnalysisBlock;
}

export interface SkillAndRole {
  Job_Standards_and_Polished: {
    Job_Standards?: JobStandardsBlock;
    Polished_Candidate: PolishedCandidateBlock;
    Why_to_hire: string;
    Takeaway: string;
    ["Current Job"]?: string;
    ["AI Resilience"]?: string;
  };

  Skill_Journey: {
    Polished_Candidate: SkillJourneyPolishedCandidate;
    ["Experience"]?: string;
    Takeaway_ts?: string;
    Takeaway_fs?: string;
    Takeaway_bs?: string;
  };

  Skill_Pillars: SkillPillarsBlock;
}

export interface GrowthAndMarket {
  ["What to do next"]: {
    Learn: string[];
    Build: string[];
    Share: string[];
    Apply: Array<Record<string, string | undefined>>;
  };

  Pitches: {
    ["Overall Skill Match %"]?: string | number;
    ["Overall Behavioral Match %"]?: string | number;
    ["Overall Learning Match %"]?: string | number;
    ["Skill Pitch"]?: string;
    ["Behavioral Pitch"]?: string;
    ["Learning Pitch"]?: string;
    Name?: string;
    ["Job Title"]?: string;
    ["Job role"]?: string;
    ["Selected Job"]?: string;
    ["Career Stage"]?: string;
  };

  Career_Progression: {
    ["Job Level"]?: string;
    Entry?: Record<string, string[]>;
    Middle?: Record<string, string[]>;
    Senior?: Record<string, string[]>;
  };

  Geo_Opportunity?: {
    ["Country with package"]?: string[];
    City?: string;
    Companies?: string[];
  };
}

export interface ResultInterface {
  Skill_and_Role: SkillAndRole;
  Technical_and_Career: TechnicalAndCareer;
  Growth_and_Market: GrowthAndMarket;
}

export interface SnapShotData {
  status: string;
  results: ResultInterface;
}

export const generateAllInsightsService = async (
  data: GenerateAllInsightsRequest
): Promise<SnapShotData> => {
  const response = await axios.post("/api/generate-all-insights", data, {
    withCredentials: true,
    timeout: 45000,
  });
  return response.data;
};
