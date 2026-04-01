import { NextResponse } from "next/server";

const DEV_FALLBACK_BACKEND_URLS = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

const WORKSHOP_LIST_PATHS = ["/api/workshop-list", "/api/workshop-list/list"];

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

  return process.env.NEXT_PUBLIC_API_URL?.trim() ?? "";
}

function getCandidateBackendUrls(): string[] {
  const envUrl = getConfiguredApiUrl();
  const raw = isProductionRuntime()
    ? [envUrl]
    : [envUrl, ...DEV_FALLBACK_BACKEND_URLS];

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
          "API_URL (or NEXT_PUBLIC_API_URL) is missing on the server. Configure it in environment variables.",
      },
      { status: 500 },
    );
  }

  let lastRetriableResponse: UpstreamSnapshot | null = null;

  for (const backendUrl of backendUrls) {
    for (const path of WORKSHOP_LIST_PATHS) {
      try {
        const upstreamResponse = await fetch(`${backendUrl}${path}`, {
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

        if (upstreamResponse.ok) {
          return toResponse(snapshot);
        }

        // Try alternate list path if one of the aliases is unavailable.
        if (snapshot.status === 404) {
          continue;
        }

        if ([500, 502, 503, 504].includes(snapshot.status)) {
          lastRetriableResponse = snapshot;
          continue;
        }

        return toResponse(snapshot);
      } catch {
        continue;
      }
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
