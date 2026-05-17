import { useQuery } from "@tanstack/react-query";
import {
  GenerateAllInsightsRequest,
  generateAllInsightsService,
  SnapShotData,
} from "@/services/snapshot/generateAllInsightsService";

export const useGenerateAllInsights = (
  payload: GenerateAllInsightsRequest,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: SnapShotData) => void;
    onError?: (error: Error) => void;
  }
) => {
  const isEnabled =
    options?.enabled !== false &&
    !!payload?.user_id &&
    (!!payload?.reference_id || !!payload?.document_id) &&
    !!payload?.job_title;

  return useQuery<SnapShotData, Error>({
    queryKey: ["generate-all-insights", payload],
    queryFn: () => generateAllInsightsService(payload),
    enabled: isEnabled,
    retry: (failureCount, error) => {
      // Only retry on timeout errors, not on permanent failures
      const isTimeoutError =
        error.message?.includes("timeout") ||
        (error as { code?: string }).code === "ECONNABORTED";
      
      // Max 2 retries for timeout errors
      return isTimeoutError && failureCount < 2;
    },
    retryDelay: (attemptIndex) => {
      // Exponential backoff: 1s, 2s
      return Math.min(1000 * Math.pow(2, attemptIndex), 10000);
    },
    ...options,
  });
};

