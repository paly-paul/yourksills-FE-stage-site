import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/** CV extraction runs on the same upstream as auth when configured. */
function upstreamBaseUrl() {
  return (
    process.env.API_UPSTREAM_BASE_URL ||
    process.env.AUTH_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_UPSTREAM_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    ""
  ).trim();
}

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  const base = upstreamBaseUrl();
  if (!base) {
    return NextResponse.json(
      {
        message:
          "API upstream is not configured. Set API_UPSTREAM_BASE_URL or NEXT_PUBLIC_API_BASE_URL to your backend base URL.",
      },
      { status: 501 }
    );
  }

  const userId = req.nextUrl.searchParams.get("user_id");
  if (!userId) {
    return NextResponse.json(
      { message: "Missing required query parameter: user_id." },
      { status: 400 }
    );
  }

  const authHeader = req.headers.get("authorization");
  const cookieToken = req.cookies.get("authToken")?.value;
  if (!authHeader && !cookieToken) {
    return NextResponse.json(
      { message: "Authentication is required to parse a CV." },
      { status: 401 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { message: "Invalid or empty multipart body." },
      { status: 400 }
    );
  }

  const url = new URL("/extract-cv", base);
  url.searchParams.set("user_id", userId);

  const headers: Record<string, string> = {};
  if (authHeader) {
    headers.authorization = authHeader;
  } else if (cookieToken) {
    const t = cookieToken.trim();
    headers.authorization = t.toLowerCase().startsWith("bearer ")
      ? t
      : `Bearer ${t}`;
  }

  // Create abort signal with 110s timeout (5s buffer before client timeout of 120s)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 110_000);

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
      cache: "no-store",
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      console.error("extract-cv upstream fetch aborted (timeout)");
      return NextResponse.json(
        { message: "CV extraction took too long. Please try again with a smaller file." },
        { status: 504 }
      );
    }
    console.error("extract-cv upstream fetch failed:", error);
    return NextResponse.json(
      { message: "Upstream CV service is unreachable." },
      { status: 502 }
    );
  }

  clearTimeout(timeoutId);

  const contentType = upstreamRes.headers.get("content-type") || "";
  const raw = await upstreamRes.text();

  if (contentType.includes("application/json")) {
    try {
      const json = JSON.parse(raw);
      return NextResponse.json(json, { status: upstreamRes.status });
    } catch {
      // fall through
    }
  }

  return new NextResponse(raw, {
    status: upstreamRes.status,
    headers: {
      "content-type": contentType || "text/plain; charset=utf-8",
    },
  });
}
