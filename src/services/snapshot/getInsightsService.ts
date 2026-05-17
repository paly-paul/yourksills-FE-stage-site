import aiInstance from "@/utils/axiosAiInstance";
import type { SnapShotData } from "./generateAllInsightsService";

export interface GetInsightsRequest {
  user_id: string;
  reference_id?: string;
  document_id?: string;
}

/**
 * Fetches the latest generated insights snapshot from MongoDB.
 * Either reference_id OR document_id must be provided.
 * 
 * @param request - Request parameters with user_id and either reference_id or document_id
 * @returns Promise with insights snapshot data
 */
export const getInsightsService = async (
  request: GetInsightsRequest
): Promise<SnapShotData> => {
  // Validate that either reference_id or document_id is provided
  if (!request.reference_id && !request.document_id) {
    throw new Error(
      "Either reference_id or document_id must be provided"
    );
  }

  try {
    console.log("[get-insights] Request starting...", {
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
      `/generate-all-insights?${params.toString()}`,
      {
        timeout: 180000, // 3 minutes for fetching insights
      }
    );

    console.log("[get-insights] Request successful", {
      hasData: !!response.data,
      status: response.status,
    });

    return response.data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[get-insights] Request failed:", {
      error: errorMsg,
      user_id: request.user_id,
      reference_id: request.reference_id,
      document_id: request.document_id,
    });
    throw error;
  }
};
