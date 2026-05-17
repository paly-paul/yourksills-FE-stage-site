"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuthToken } from "@/utils/cookieHelper";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.replace("/create"); // Redirect logged-in users away from public pages
      return;
    }
    setReady(true);
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
