import { useEffect } from "react";
import { cancelAiRequests } from "@/utils/axiosAiInstance";
import { cancelAuthRequests } from "@/utils/axiosAuthInstance";

/**
 * Hook to cancel all pending API requests when component unmounts.
 * Prevents stale state updates and race conditions when navigating away.
 *
 * Usage:
 * ```
 * useCleanupOnUnmount();
 * ```
 */
export const useCleanupOnUnmount = () => {
  useEffect(() => {
    return () => {
      // Cancel all pending requests on unmount
      cancelAiRequests();
      cancelAuthRequests();
    };
  }, []);
};

export default useCleanupOnUnmount;
