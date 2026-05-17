import {
  getPredictModelOneService,
  PredictModelRequest,
  PredictModelResponse,
} from "@/services/jobPrediction/getPredictModelOneService";
import { useQuery } from "@tanstack/react-query";

export const useGetPredictModelOne = (
  data: PredictModelRequest,
  options = {}
) => {
  return useQuery<PredictModelResponse, Error>({
    queryKey: ["predict-model-1", data.user_id, data.reference_id],
    queryFn: () => getPredictModelOneService(data),
    placeholderData: undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes - cache predictions during session
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
