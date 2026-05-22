import { NextResponse } from "next/server";

export const runtime = "nodejs";

function upstreamBaseUrl() {
  return (
    process.env.API_UPSTREAM_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    ""
  ).trim();
}

export async function POST(req: Request) {
  const base = upstreamBaseUrl();
  if (!base) {
    return NextResponse.json(
      { success: false, message: "API upstream is not configured." },
      { status: 501 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const url = `${base.replace(/\/+$/, "")}/reset-password`;

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Service is unreachable. Please try again." },
      { status: 502 }
    );
  }

  const contentType = upstreamRes.headers.get("content-type") || "";
  const raw = await upstreamRes.text();

  if (contentType.includes("application/json")) {
    try {
      return NextResponse.json(JSON.parse(raw), { status: upstreamRes.status });
    } catch {
      // fall through
    }
  }

  return NextResponse.json(
    { success: upstreamRes.ok, message: raw || `Upstream error (${upstreamRes.status}).` },
    { status: upstreamRes.status }
  );
}
