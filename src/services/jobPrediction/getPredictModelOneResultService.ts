import aiInstance from "@/utils/axiosAiInstance";

export interface GetPredictModelOneResultRequest {
  user_id: string;
  reference_id?: string;
  document_id?: string;
}

export interface BestFitResult {
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

export interface PredictModelOneResult {
  structured_input: Record<string, unknown>;
  best_fit: BestFitResult;
  meta: {
    device: string;
    model_dir: string;
    execution_time: {
      start_time: string;
      end_time: string;
      duration_seconds: number;
    };
  };
}

/**
 * Fetches the latest stored Model1 prediction result from MongoDB.
 * Returns the best-fit job role with match percentages and matched/missing skills.
 * 
 * @param request - Request parameters with user_id and either reference_id or document_id
 * @returns Promise with prediction result including best_fit job role and skills
 */
export const getPredictModelOneResultService = async (
  request: GetPredictModelOneResultRequest
): Promise<PredictModelOneResult> => {
  // Validate that either reference_id or document_id is provided
  if (!request.reference_id && !request.document_id) {
    throw new Error(
      "Either reference_id or document_id must be provided"
    );
  }

  try {
    console.log("[predict-model1-db-result] Request starting...", {
      user_id: request.user_id,
      reference_id: request.reference_id,
      document_id: request.document_id,
    });

    const params = new URLSearchParams({
      user_id: request.user_id,
      ...(request.reference_id && { reference_id: request.reference_id }),
      ...(request.document_id && { document_id: request.document_id }),
    });

    // GET request with query parameters
    const response = await aiInstance.get(
      `/predict-model1-db?${params.toString()}`,
      {
        timeout: 180000, // 3 minutes for fetching prediction results
      }
    );

    console.log("[predict-model1-db-result] Request successful", {
      hasData: !!response.data,
      status: response.status,
      jobRole: response.data?.best_fit?.job_role,
      overallMatch: response.data?.best_fit?.overall_match_pct,
    });

    return response.data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[predict-model1-db-result] Request failed:", {
      error: errorMsg,
      user_id: request.user_id,
      reference_id: request.reference_id,
      document_id: request.document_id,
    });
    throw error;
  }
};
