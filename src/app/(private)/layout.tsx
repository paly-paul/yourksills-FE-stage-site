"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuthToken, removeAuthToken } from "@/utils/cookieHelper";
import { getUserProfile } from "@/services/auth/profileService";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.replace("/login"); // Redirect unauthenticated users to login
      return;
    }

    // Validate token by checking /profile. This prevents stale/invalid tokens
    // from letting users land in /create.
    (async () => {
      try {
        await getUserProfile();
        setReady(true);
      } catch (error: unknown) {
        const status =
          typeof error === "object" &&
          error !== null &&
          "response" in error
            ? // @ts-expect-error axios error typing is dynamic
              error.response?.status
            : undefined;

        if (status === 401 || status === 403) {
          removeAuthToken();
          router.replace("/login");
          return;
        }

        // If it's not an auth error, don't block the user entirely.
        setReady(true);
      }
    })();
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className='flex items-center justify-center h-screen'>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
