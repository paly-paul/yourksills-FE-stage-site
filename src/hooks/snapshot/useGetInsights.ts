import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  GetInsightsRequest,
  getInsightsService,
} from "@/services/snapshot/getInsightsService";
import type { SnapShotData } from "@/services/snapshot/generateAllInsightsService";

/**
 * Fetches the latest generated insights snapshot for a user.
 * Automatically enabled when user_id and either reference_id or document_id are provided.
 *
 * @param request - Request with user_id and either reference_id or document_id
 * @param options - Additional React Query options
 * @returns Query result with insights data
 */
export const useGetInsights = (
  request: Partial<GetInsightsRequest>,
  options?: Partial<UseQueryOptions<SnapShotData, Error>>
) => {
  // Validate that we have user_id and at least one of reference_id or document_id
  const canQuery = Boolean(
    request.user_id &&
      (request.reference_id || request.document_id)
  );

  return useQuery<SnapShotData, Error>({
    queryKey: [
      "insights",
      request.user_id,
      request.reference_id,
      request.document_id,
    ],
    queryFn: () =>
      getInsightsService({
        user_id: request.user_id!,
        reference_id: request.reference_id,
        document_id: request.document_id,
      }),
    enabled: canQuery,
    staleTime: 1000 * 60 * 5, // 5 minutes - cache insights
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

export default useGetInsights;
