import aiInstance from "@/utils/axiosAiInstance";

export interface PredictModelRequest {
  user_id: string;
  reference_id: string;
}

type StructuredInput = {
  "Profile Information": {
    "Full Name": string;
  };
};

export interface AlternateJob {
  job_title: string;
  job_family: string;
  sector: string;
  sub_sector: string;
  industry: string;
  talent_match_pct: string;
  anchor_match_pct: string;
  overall_match_pct: string;
  matched_skills: string[];
  missing_skills: string[];
  managerial_level: string;
}

export interface PredictModelResponse {
  success: boolean;
  best_fit: BestFit;
  structured_input: StructuredInput;
  "Same Industry_Alternate jobs": AlternateJob[];
}

interface BestFit {
  job_role: string;
  managerial_level: string;
  job_family: string;
  sector: string;
  sub_sector: string;
  industry: string;
  talent_match_pct: string;
  anchor_match_pct: string;
  overall_match_pct: string;
  matched_skills: string[];
  missing_skills: string[];
}

export const getPredictModelOneService = async (
  data: PredictModelRequest
): Promise<PredictModelResponse> => {
  try {
    console.log("[predict-model1-db] Request starting...", {
      user_id: data.user_id,
      reference_id: data.reference_id,
    });

    // Model prediction is computationally expensive - use high timeout (3 minutes)
    // No global timeout on aiInstance, so this is the actual limit
    const response = await aiInstance.post("/predict-model1-db", data, {
      timeout: 180000, // 3 minutes for heavy ML inference
    });

    console.log("[predict-model1-db] Request successful", {
      hasData: !!response.data,
      status: response.status,
    });

    return response.data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[predict-model1-db] Request failed:", {
      error: errorMsg,
      user_id: data.user_id,
      reference_id: data.reference_id,
    });
    throw error;
  }
};
