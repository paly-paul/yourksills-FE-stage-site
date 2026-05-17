"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function AuthHydrator() {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
