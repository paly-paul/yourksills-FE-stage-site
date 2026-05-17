import axios from "axios";
import { getAuthToken } from "./cookieHelper";
import { addDeduplicationInterceptor } from "./requestDeduplication";

const aiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_API_BASE_URL,
  withCredentials: true,
  // No global timeout - each request can configure its own based on operation type
  // Model inference operations can take 90-120+ seconds
  timeout: undefined,
});

// Apply request deduplication
addDeduplicationInterceptor(aiInstance);

// Track active requests for cancellation on unmount
let requestController: AbortController | null = null;

aiInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      const trimmed = token.trim();
      // Backend/token source may already include the "Bearer " prefix.
      config.headers.Authorization = trimmed.toLowerCase().startsWith("bearer ")
        ? trimmed
        : `Bearer ${trimmed}`;
    }
    
    // Create abort controller for this request
    requestController = new AbortController();
    config.signal = requestController.signal;
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response error interceptor for timeout and abort handling
aiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject(new Error("Request timeout - AI service took too long to respond"));
    }
    if (error.message === "canceled") {
      return Promise.reject(new Error("Request canceled - operation was interrupted"));
    }
    return Promise.reject(error);
  }
);

// Export function to cancel pending requests
export const cancelAiRequests = () => {
  if (requestController) {
    requestController.abort();
    requestController = null;
  }
};

export default aiInstance;
