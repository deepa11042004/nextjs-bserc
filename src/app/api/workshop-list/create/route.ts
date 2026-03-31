import { NextResponse } from "next/server";

const WORKSHOP_PATH = "/api/workshop-list/create";

const FALLBACK_BACKEND_URLS = [
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

function getCandidateBackendUrls(): string[] {
  const envUrl = process.env.API_URL?.trim();
  const raw = [envUrl, ...FALLBACK_BACKEND_URLS].filter(
    (value): value is string => Boolean(value),
  );

  return [...new Set(raw.map((value) => value.replace(/\/$/, "")))];
}

function buildForwardHeaders(requestHeaders: Headers): Headers {
  const headers = new Headers(requestHeaders);
  HOP_BY_HOP_HEADERS.forEach((header) => headers.delete(header));
  return headers;
}

type UpstreamSnapshot = {
  status: number;
  contentType: string;
  bodyText: string;
};

function toResponse(snapshot: UpstreamSnapshot): NextResponse {
  const { status, contentType, bodyText } = snapshot;

  const isJson = contentType.toLowerCase().includes("application/json");
  if (isJson) {
    try {
      const parsed = bodyText ? JSON.parse(bodyText) : {};
      return NextResponse.json(parsed, { status });
    } catch {
      // Fall back to text response below when upstream sends invalid JSON.
    }
  }

  return new NextResponse(bodyText, {
    status,
    headers: {
      "Content-Type": contentType || "text/plain; charset=utf-8",
    },
  });
}

export async function POST(request: Request) {
  const backendUrls = getCandidateBackendUrls();
  if (backendUrls.length === 0) {
    return NextResponse.json(
      { message: "API_URL is not configured on the server" },
      { status: 500 },
    );
  }

  const requestBody = await request.arrayBuffer();
  const forwardedHeaders = buildForwardHeaders(request.headers);
  let lastRetriableResponse: UpstreamSnapshot | null = null;

  try {
    for (const backendUrl of backendUrls) {
      const upstreamUrl = `${backendUrl}${WORKSHOP_PATH}`;

      try {
        const upstreamResponse = await fetch(upstreamUrl, {
          method: request.method,
          headers: forwardedHeaders,
          body: requestBody.byteLength > 0 ? requestBody : undefined,
          cache: "no-store",
        });

        const snapshot: UpstreamSnapshot = {
          status: upstreamResponse.status,
          contentType: upstreamResponse.headers.get("content-type") ?? "",
          bodyText: await upstreamResponse.text(),
        };

        if ([404, 500, 502, 503, 504].includes(snapshot.status)) {
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
  } catch (error) {
    console.error("Workshop proxy error:", error);
    return NextResponse.json(
      { message: "Workshop service is unavailable" },
      { status: 502 },
    );
  }
}
