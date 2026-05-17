import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 50; // 50s timeout (5s buffer before client timeout of 45s)

function upstreamBaseUrl() {
  return (
    process.env.AI_UPSTREAM_BASE_URL ||
    process.env.NEXT_PUBLIC_AI_API_BASE_URL ||
    ""
  ).trim();
}

export async function POST(req: NextRequest) {
  const base = upstreamBaseUrl();
  if (!base) {
    return NextResponse.json(
      {
        success: false,
        message:
          "AI_UPSTREAM_BASE_URL is not set. Configure it to your AI backend URL.",
      },
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

  const parsed = body as {
    user_id?: string;
    job_title?: string;
    reference_id?: string;
    document_id?: string;
  };

  if (
    !parsed?.user_id ||
    !parsed?.job_title ||
    (!parsed?.reference_id && !parsed?.document_id)
  ) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Invalid insights payload. Required: user_id, job_title, and reference_id or document_id.",
      },
      { status: 400 }
    );
  }

  const token = req.cookies.get("authToken")?.value;
  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Authentication token is missing. Please log in again and retry snapshot generation.",
      },
      { status: 401 }
    );
  }

  const url = new URL("/generate-all-insights", base);

  // Create abort signal with 40s timeout (5s buffer before route timeout of 50s)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 40_000);

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      console.error("generate-all-insights upstream fetch aborted (timeout)");
      return NextResponse.json(
        {
          success: false,
          message: "AI inference took too long. The job insights generation failed. Please try again.",
        },
        { status: 504 }
      );
    }
    console.error("generate-all-insights upstream fetch failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Upstream AI service is unreachable.",
      },
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
      // fall through to text response
    }
  }

  return new NextResponse(raw, {
    status: upstreamRes.status,
    headers: {
      "content-type": contentType || "text/plain; charset=utf-8",
    },
  });
}
