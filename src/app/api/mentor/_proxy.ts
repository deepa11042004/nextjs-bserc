import { NextResponse } from "next/server";

const DEV_FALLBACK_BACKEND_URLS = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

const HOP_BY_HOP_HEADERS = [
  "host",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "content-length",
  "accept-encoding",
];

type MentorEndpoint = "/api/mentor/register";

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

function getBackendBaseUrls(): string[] {
  const envUrl = getConfiguredApiUrl();
  const raw = isProductionRuntime()
    ? [envUrl]
    : [envUrl, ...DEV_FALLBACK_BACKEND_URLS];

  const normalized = raw.filter((value): value is string => Boolean(value));
  return [...new Set(normalized.map((value) => value.replace(/\/$/, "")))];
}

function buildForwardHeaders(requestHeaders: Headers): Headers {
  const headers = new Headers(requestHeaders);
  HOP_BY_HOP_HEADERS.forEach((header) => headers.delete(header));
  return headers;
}

function toResponse(snapshot: UpstreamSnapshot): NextResponse {
  if (snapshot.contentType.toLowerCase().includes("application/json")) {
    try {
      const parsed = snapshot.bodyText ? JSON.parse(snapshot.bodyText) : {};
      return NextResponse.json(parsed, { status: snapshot.status });
    } catch {
      // Fall through to plain response when upstream sends invalid JSON.
    }
  }

  return new NextResponse(snapshot.bodyText, {
    status: snapshot.status,
    headers: {
      "Content-Type": snapshot.contentType || "text/plain; charset=utf-8",
    },
  });
}

export async function forwardMentorRequest(
  request: Request,
  endpoint: MentorEndpoint,
): Promise<NextResponse> {
  const apiBaseUrls = getBackendBaseUrls();

  if (!apiBaseUrls.length) {
    return NextResponse.json(
      {
        message:
          "API_URL (or NEXT_PUBLIC_API_URL) is missing on the server. Configure it in environment variables.",
      },
      { status: 500 },
    );
  }

  const requestBody = await request.arrayBuffer();
  const forwardedHeaders = buildForwardHeaders(request.headers);

  let lastRetriableResponse: UpstreamSnapshot | null = null;

  for (const apiBaseUrl of apiBaseUrls) {
    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: "POST",
        headers: forwardedHeaders,
        body: requestBody.byteLength > 0 ? requestBody : undefined,
        cache: "no-store",
      });

      const snapshot: UpstreamSnapshot = {
        status: response.status,
        contentType: response.headers.get("content-type") ?? "",
        bodyText: await response.text(),
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
    { message: "Mentor registration service is unavailable" },
    { status: 502 },
  );
}
