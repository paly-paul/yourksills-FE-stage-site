"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function SocialAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setToken = useAuthStore((s) => s.setToken);

  const { token, error, message, nextPath } = useMemo(
    () => ({
      token: searchParams.get("token"),
      error: searchParams.get("error"),
      message: searchParams.get("message"),
      nextPath: searchParams.get("next") || "/create",
    }),
    [searchParams]
  );

  useEffect(() => {
    const tokenValue =
      token && token !== "undefined" && token !== "null" ? token : null;

    if (tokenValue) {
      setToken(tokenValue);
      router.replace(nextPath);
      return;
    }

    const failureReason = error || message || "Social login failed. Please try again.";
    router.replace(`/login?social_error=${encodeURIComponent(failureReason)}`);
  }, [error, message, nextPath, router, setToken, token]);

  return (
    <main className='gradient-bg min-h-screen'>
      <div className='container min-h-screen flex items-center justify-center p-6'>
        <p className='text-grey text-base'>Completing sign in...</p>
      </div>
    </main>
  );
}
