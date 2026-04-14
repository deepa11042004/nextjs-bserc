import { NextResponse } from "next/server";

const DEV_FALLBACK_BACKEND_URLS = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

const RETRIABLE_UPSTREAM_STATUSES = new Set([500, 502, 503, 504]);

function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

function getConfiguredApiUrl(): string {
  return process.env.API_URL?.trim() || process.env.NEXT_PUBLIC_API_URL?.trim() || "";
}

function getCandidateBackendUrls(): string[] {
  const envUrl = getConfiguredApiUrl();
  const raw = isProductionRuntime()
    ? [envUrl]
    : [...DEV_FALLBACK_BACKEND_URLS, envUrl];

  const normalized = raw.filter((value): value is string => Boolean(value));
  return [...new Set(normalized.map((value) => value.replace(/\/$/, "")))];
}

function toJsonOrTextResponse(status: number, contentType: string, bodyText: string): NextResponse {
  if (contentType.toLowerCase().includes("application/json")) {
    try {
      const parsed = bodyText ? JSON.parse(bodyText) : {};
      return NextResponse.json(parsed, { status });
    } catch {
      // Fall back to plain text if upstream sends malformed JSON.
    }
  }

  return new NextResponse(bodyText, {
    status,
    headers: {
      "Content-Type": contentType || "text/plain; charset=utf-8",
    },
  });
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const backendUrls = getCandidateBackendUrls();

  if (!backendUrls.length) {
    return NextResponse.json(
      {
        message:
          "API_URL (or NEXT_PUBLIC_API_URL) is missing on the server. Configure API_URL in deployment environment variables.",
      },
      { status: 500 },
    );
  }

  const endpoint = `/api/workshop-list/${encodeURIComponent(id)}/thumbnail`;
  let lastRetriableStatus: number | null = null;

  for (const backendUrl of backendUrls) {
    try {
      const upstreamResponse = await fetch(`${backendUrl}${endpoint}`, {
        method: "GET",
        cache: "no-store",
      });

      const status = upstreamResponse.status;
      const contentType = upstreamResponse.headers.get("content-type") ?? "";

      if (RETRIABLE_UPSTREAM_STATUSES.has(status)) {
        lastRetriableStatus = status;
        continue;
      }

      const isLikelyBinary = !contentType.toLowerCase().includes("application/json")
        && !contentType.toLowerCase().startsWith("text/");

      if (isLikelyBinary) {
        const body = await upstreamResponse.arrayBuffer();

        return new NextResponse(new Uint8Array(body), {
          status,
          headers: {
            "Content-Type": contentType || "application/octet-stream",
            "Cache-Control": "public, max-age=300",
          },
        });
      }

      const textBody = await upstreamResponse.text();
      return toJsonOrTextResponse(status, contentType, textBody);
    } catch {
      continue;
    }
  }

  if (lastRetriableStatus !== null) {
    return NextResponse.json(
      { message: "Workshop service is temporarily unavailable." },
      { status: lastRetriableStatus },
    );
  }

  return NextResponse.json(
    { message: "Workshop service is unavailable" },
    { status: 502 },
  );
}