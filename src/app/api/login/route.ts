import { NextResponse } from "next/server";

export const runtime = "nodejs";

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  // If Origin is absent (same-origin / curl), avoid adding CORS headers.
  if (!origin) return {};

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  };
}

function upstreamBaseUrl() {
  return (
    process.env.API_UPSTREAM_BASE_URL ||
    process.env.AUTH_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_UPSTREAM_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    ""
  ).trim();
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders(req),
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: Request) {
  const base = upstreamBaseUrl();
  if (!base) {
    return NextResponse.json(
      {
        success: false,
        message:
          "API_UPSTREAM_BASE_URL is not set. Set it to your backend base URL (e.g. https://api.dev.yourskills.ai).",
      },
      { status: 501, headers: corsHeaders(req) }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400, headers: corsHeaders(req) }
    );
  }

  const url = `${base.replace(/\/+$/, "")}/login`;

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(req.headers.get("authorization")
          ? { authorization: req.headers.get("authorization") as string }
          : {}),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Upstream login service is unreachable." },
      { status: 502, headers: corsHeaders(req) }
    );
  }

  const contentType = upstreamRes.headers.get("content-type") || "";
  const raw = await upstreamRes.text();
  const upstreamSetCookies =
    (upstreamRes.headers as unknown as { getSetCookie?: () => string[] })
      .getSetCookie?.() ?? [];

  if (contentType.includes("application/json")) {
    try {
      const json = JSON.parse(raw);
      const response = NextResponse.json(json, {
        status: upstreamRes.status,
        headers: corsHeaders(req),
      });
      // If the upstream auth server uses cookie-based tokens via Set-Cookie,
      // forward them to the browser so auth works consistently.
      for (const sc of upstreamSetCookies) {
        response.headers.append("set-cookie", sc);
      }
      return response;
    } catch {
      // fall through to text response
    }
  }

  const response = new NextResponse(raw, {
    status: upstreamRes.status,
    headers: {
      ...corsHeaders(req),
      "content-type": contentType || "text/plain; charset=utf-8",
    },
  });
  for (const sc of upstreamSetCookies) {
    response.headers.append("set-cookie", sc);
  }
  return response;
}

