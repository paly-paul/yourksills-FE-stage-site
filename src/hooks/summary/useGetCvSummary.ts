import {
  CvApiResponse,
  getCvSummaryService,
} from "@/services/summary/getCvSummaryService";
import { useQuery } from "@tanstack/react-query";

export const useGetCvSummary = (withCv: boolean, options = {}) => {
  return useQuery<CvApiResponse, Error>({
    queryKey: ["cv-summary"],
    queryFn: () => getCvSummaryService(withCv),
    placeholderData: undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes - cache CV summary since it doesn't change often
    gcTime: 1000 * 60 * 10, // 10 minutes - keep in cache longer
    // Limit retries to prevent cascading failures
    // Max 1 retry only on timeout errors
    retry: (failureCount, error) => {
      const isTimeoutError =
        error.message?.includes("timeout") || (error as { code?: string }).code === "ECONNABORTED";
      // Only 1 retry on timeout, never retry on other errors (auth, validation, etc.)
      return isTimeoutError && failureCount < 1;
    },
    retryDelay: () => 2000,
    ...options,
  });
};
