import axios from "axios";
import { getAuthToken, removeAuthToken } from "./cookieHelper";
import { addDeduplicationInterceptor } from "./requestDeduplication";

const authInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Apply request deduplication
addDeduplicationInterceptor(authInstance);

// Track active requests for cancellation on unmount
let requestController: AbortController | null = null;

authInstance.interceptors.request.use(
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

authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // TODO logout or redirect
      removeAuthToken();
      window.location.href = "/login";
    }
    
    // Handle timeout and abort errors
    if (error.code === "ECONNABORTED") {
      return Promise.reject(new Error("Request timeout - server took too long to respond"));
    }
    if (error.message === "canceled") {
      return Promise.reject(new Error("Request canceled - operation was interrupted"));
    }
    
    return Promise.reject(error);
  }
);

// Export function to cancel pending requests
export const cancelAuthRequests = () => {
  if (requestController) {
    requestController.abort();
    requestController = null;
  }
};

export default authInstance;
