import { NextResponse } from "next/server";

const DEV_FALLBACK_BACKEND_URLS = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

type UpstreamSnapshot = {
  status: number;
  contentType: string;
  bodyText: string;
};

function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

function getConfiguredApiUrl(): string {
  const apiUrl = process.env.API_URL?.trim();
  if (apiUrl) {
    return apiUrl;
  }

  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (publicApiUrl) {
    return publicApiUrl;
  }

  return "";
}

function getCandidateBackendUrls(): string[] {
  const envUrl = getConfiguredApiUrl();
  const raw = isProductionRuntime()
    ? [envUrl]
    : [...DEV_FALLBACK_BACKEND_URLS, envUrl];

  const normalized = raw.filter((value): value is string => Boolean(value));
  return [...new Set(normalized.map((value) => value.replace(/\/$/, "")))];
}

function toResponse(snapshot: UpstreamSnapshot): NextResponse {
  const { status, contentType, bodyText } = snapshot;

  if (contentType.toLowerCase().includes("application/json")) {
    try {
      const parsed = bodyText ? JSON.parse(bodyText) : {};
      return NextResponse.json(parsed, { status });
    } catch {
      // Fall back to plain text response when upstream sends invalid JSON.
    }
  }

  return new NextResponse(bodyText, {
    status,
    headers: {
      "Content-Type": contentType || "text/plain; charset=utf-8",
    },
  });
}

export async function GET() {
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

  const endpoint = "/api/workshop-list/participants";
  let lastRetriableResponse: UpstreamSnapshot | null = null;

  for (const backendUrl of backendUrls) {
    try {
      const upstreamResponse = await fetch(`${backendUrl}${endpoint}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      const snapshot: UpstreamSnapshot = {
        status: upstreamResponse.status,
        contentType: upstreamResponse.headers.get("content-type") ?? "",
        bodyText: await upstreamResponse.text(),
      };

      if ([500, 502, 503, 504].includes(snapshot.status)) {
        lastRetriableResponse = snapshot;
        continue;
      }

      return toResponse(snapshot);
    } catch {
      continue;
    }
  }

  if (lastRetriableResponse) {
    return toResponse(lastRetriableResponse);
  }

  return NextResponse.json(
    { message: "Workshop service is unavailable" },
    { status: 502 },
  );
}
