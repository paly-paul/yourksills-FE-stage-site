export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  type UpstreamErrorPayload = {
    message?: string;
    reason?: string;
  };

  // Call same-origin Next.js proxy to avoid browser CORS/mixed-content issues.
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  // Best-effort parse JSON; upstream proxy returns JSON on success/failure.
  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    const parsed =
      data && typeof data === "object"
        ? (data as UpstreamErrorPayload)
        : undefined;

    const message =
      parsed?.message || parsed?.reason || `Login failed (${res.status})`;

    // Keep shape compatible with existing React Query error handler (expects `error.response.data.message`).
    const err = new Error(message) as Error & {
      response?: { data: unknown };
    };
    err.response = { data };
    throw err;
  }

  return data;
};
