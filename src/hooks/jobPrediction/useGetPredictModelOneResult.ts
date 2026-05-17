import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  GetPredictModelOneResultRequest,
  getPredictModelOneResultService,
  PredictModelOneResult,
} from "@/services/jobPrediction/getPredictModelOneResultService";

/**
 * Fetches the latest stored Model1 prediction result for a user.
 * Automatically enabled when user_id and either reference_id or document_id are provided.
 *
 * @param request - Request with user_id and either reference_id or document_id
 * @param options - Additional React Query options
 * @returns Query result with prediction data including best_fit job role
 */
export const useGetPredictModelOneResult = (
  request: Partial<GetPredictModelOneResultRequest>,
  options?: Partial<UseQueryOptions<PredictModelOneResult, Error>>
) => {
  // Validate that we have user_id and at least one of reference_id or document_id
  const canQuery = Boolean(
    request.user_id &&
      (request.reference_id || request.document_id)
  );

  return useQuery<PredictModelOneResult, Error>({
    queryKey: [
      "predict-model-1-result",
      request.user_id,
      request.reference_id,
      request.document_id,
    ],
    queryFn: () =>
      getPredictModelOneResultService({
        user_id: request.user_id!,
        reference_id: request.reference_id,
        document_id: request.document_id,
      }),
    enabled: canQuery,
    staleTime: 1000 * 60 * 5, // 5 minutes - cache prediction results
    gcTime: 1000 * 60 * 10, // 10 minutes - keep in memory longer
    // Smart retry logic: only retry on timeout
    retry: (failureCount, error) => {
      const isTimeoutError =
        error.message?.includes("timeout") || (error as { code?: string }).code === "ECONNABORTED";
      return isTimeoutError && failureCount < 1;
    },
    retryDelay: () => 3000,
    ...options,
  });
};

export default useGetPredictModelOneResult;
