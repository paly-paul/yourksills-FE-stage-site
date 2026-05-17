import { AxiosInstance, AxiosRequestConfig } from "axios";

interface PendingRequest {
  controller: AbortController;
  timestamp: number;
}

// Map of request keys to their controllers
const pendingRequests = new Map<string, PendingRequest>();

/**
 * Generate a unique key for a request to detect duplicates
 */
function getRequestKey(config: AxiosRequestConfig): string {
  const method = config.method?.toUpperCase() || "GET";
  const url = config.url || "";
  const data = config.data ? JSON.stringify(config.data) : "";
  return `${method}:${url}:${data}`;
}

/**
 * Axios interceptor to prevent duplicate requests
 * If the same request is made within the configured window, it returns the first one's response
 */
export const addDeduplicationInterceptor = (instance: AxiosInstance) => {
  // Track the last request key to identify duplicates
  let lastKey: string | null = null;

  instance.interceptors.request.use((config) => {
    const key = getRequestKey(config);

    // Check if same request is already pending
    if (pendingRequests.has(key)) {
      const pending = pendingRequests.get(key)!;
      const timeSinceRequest = Date.now() - pending.timestamp;

      // If request is very recent (within 100ms), deduplicate it
      if (timeSinceRequest < 100) {
        // Abort this request and reuse the last one
        const controller = new AbortController();
        controller.abort();
        config.signal = controller.signal;
        lastKey = key;
        return config;
      } else {
        // Request is old, clean it up and allow new one
        pendingRequests.delete(key);
      }
    }

    // Register this request
    const controller = new AbortController();
    pendingRequests.set(key, {
      controller,
      timestamp: Date.now(),
    });

    config.signal = controller.signal;
    lastKey = key;
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      const key = lastKey;
      if (key) {
        pendingRequests.delete(key);
      }
      return response;
    },
    (error) => {
      const key = lastKey;
      if (key) {
        pendingRequests.delete(key);
      }
      return Promise.reject(error);
    }
  );
};

/**
 * Clean up pending requests (useful on app unload)
 */
export const cleanupPendingRequests = () => {
  pendingRequests.forEach((pending) => {
    pending.controller.abort();
  });
  pendingRequests.clear();
};
