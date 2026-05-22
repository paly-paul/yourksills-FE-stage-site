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

export const maxDuration = 300;

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

  const url = new URL(`${base.replace(/\/+$/, "")}/extract-cv`);
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

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
      cache: "no-store",
    });
  } catch (error) {
    console.error("extract-cv upstream fetch failed:", error);
    return NextResponse.json(
      { message: "Upstream CV service is unreachable." },
      { status: 502 }
    );
  }

  const contentType = upstreamRes.headers.get("content-type") || "";
  const raw = await upstreamRes.text();

  // Return clean JSON errors for upstream gateway/server errors instead of
  // forwarding raw nginx HTML (e.g. 502, 503, 504 pages).
  if (!upstreamRes.ok && !contentType.includes("application/json")) {
    const messages: Record<number, string> = {
      502: "CV service is temporarily unavailable. Please try again.",
      503: "CV service is temporarily unavailable. Please try again.",
      504: "CV extraction timed out on the server. Please try again with a smaller file.",
    };
    return NextResponse.json(
      { message: messages[upstreamRes.status] || `Upstream error (${upstreamRes.status}).` },
      { status: upstreamRes.status }
    );
  }

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
