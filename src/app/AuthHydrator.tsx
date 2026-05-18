"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function AuthHydrator() {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    // Debug: Test actual backend connection
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";
    console.log(`[Backend Connection] Testing connection to: ${backendUrl}`);
    
    // Attempt a simple request to verify backend is reachable
    fetch(`${backendUrl}/login`, { 
      method: 'OPTIONS',
      credentials: 'include'
    })
      .then((res) => {
        const statusMessage = `✓ Connected to ${backendUrl} - Server responded with status ${res.status}`;
        console.log(`[Backend Connection] ${statusMessage}`);
        
        // Log to server terminal as well
        fetch('/api/debug', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: statusMessage,
            status: res.status,
            url: backendUrl
          })
        }).catch(() => {});
        
        return res;
      })
      .catch((err) => {
        const errorMessage = `✗ Failed to connect to ${backendUrl} - ${err.message}`;
        console.error(`[Backend Connection] ${errorMessage}`);
        
        // Log error to server terminal as well
        fetch('/api/debug', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: errorMessage,
            status: 'ERROR',
            url: backendUrl
          })
        }).catch(() => {});
      });
    
    hydrate();
  }, [hydrate]);

  return null;
}
