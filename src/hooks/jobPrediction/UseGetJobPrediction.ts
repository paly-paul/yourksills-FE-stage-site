import {
  getJobPredictionService,
  JobPredictionResponse,
} from "@/services/jobPrediction/getJobPredictionService";
import { useQuery } from "@tanstack/react-query";

export const UseGetJobPrediction = (options = {}) => {
  return useQuery<JobPredictionResponse, Error>({
    queryKey: ["job-prediction"],
    queryFn: getJobPredictionService,
    placeholderData: undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes - cache job predictions during session
    gcTime: 1000 * 60 * 10, // 10 minutes - reduce duplicate requests
    // Disable aggressive retries on expensive ML model prediction
    // Max 1 retry only on timeout errors to avoid overloading AI service
    retry: (failureCount, error) => {
      const isTimeoutError =
        error.message?.includes("timeout") || (error as { code?: string }).code === "ECONNABORTED";
      // Only 1 retry on timeout, never retry on other errors (auth, validation, etc.)
      return isTimeoutError && failureCount < 1;
    },
    retryDelay: () => 3000,
    ...options,
  });
};
