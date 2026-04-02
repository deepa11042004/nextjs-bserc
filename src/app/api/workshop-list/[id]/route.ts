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
    : [...DEV_FALLBACK_BACKEND_URLS, envUrl];

  const normalized = raw.filter((value): value is string => Boolean(value));
  return [...new Set(normalized.map((value) => value.replace(/\/$/, "")))];
}

function buildForwardHeaders(requestHeaders: Headers): Headers {
  const headers = new Headers(requestHeaders);
  HOP_BY_HOP_HEADERS.forEach((header) => headers.delete(header));
  return headers;
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

async function forwardWorkshopByIdRequest(
  request: Request,
  workshopId: string,
  method: "GET" | "PUT" | "DELETE",
) {
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

  const endpoint = `/api/workshop-list/${encodeURIComponent(workshopId)}`;
  const forwardedHeaders = buildForwardHeaders(request.headers);
  const requestBody =
    method === "PUT" ? await request.arrayBuffer() : new ArrayBuffer(0);
  let lastRetriableResponse: UpstreamSnapshot | null = null;

  for (const backendUrl of backendUrls) {
    try {
      const upstreamResponse = await fetch(`${backendUrl}${endpoint}`, {
        method,
        headers: forwardedHeaders,
        body:
          method === "PUT" && requestBody.byteLength > 0
            ? requestBody
            : undefined,
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

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  return forwardWorkshopByIdRequest(request, id, "GET");
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  return forwardWorkshopByIdRequest(request, id, "PUT");
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  return forwardWorkshopByIdRequest(request, id, "DELETE");
}
