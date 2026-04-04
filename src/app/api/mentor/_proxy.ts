import { NextResponse } from "next/server";

const DEV_FALLBACK_BACKEND_URLS = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

type MentorEndpoint = `/api/mentor/${string}`;
type MentorHttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

function isLocalHostname(hostname: string): boolean {
  return (
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
  );
}

function getConfiguredApiUrl(): string {
  const apiUrl = process.env.API_URL?.trim();
  if (apiUrl) {
    return apiUrl;
  }

  return process.env.API_URL?.trim() ?? "";
}

function isLoopbackUrl(value: string): boolean {
  if (!value) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return (
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "::1"
    );
  } catch {
    return false;
  }
}

function getBackendBaseUrls(options?: { preferLocal?: boolean }): string[] {
  const envUrl = getConfiguredApiUrl();
  const preferLocal = Boolean(options?.preferLocal);
  const shouldIncludeDevFallback = !isProductionRuntime() || preferLocal;

  const raw = shouldIncludeDevFallback
    ? isLoopbackUrl(envUrl)
      ? [envUrl, ...DEV_FALLBACK_BACKEND_URLS]
      : [...DEV_FALLBACK_BACKEND_URLS, envUrl]
    : [envUrl];

  const normalized = raw.filter((value): value is string => Boolean(value));
  return [...new Set(normalized.map((value) => value.replace(/\/$/, "")))];
}

type ForwardPayload = {
  body?: BodyInit;
  headers?: Record<string, string>;
};

async function parseUpstreamBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

function isJsonContentType(contentType: string | null): boolean {
  if (!contentType) {
    return false;
  }

  return contentType.toLowerCase().includes("application/json");
}

async function parseIncomingJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function buildForwardPayload(
  request: Request,
  method: MentorHttpMethod,
): Promise<ForwardPayload | null> {
  if (method === "GET" || method === "DELETE") {
    return {};
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";

  if (contentType.includes("application/json")) {
    const body = await parseIncomingJson(request);

    if (!body || typeof body !== "object") {
      return null;
    }

    return {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    return { body: formData };
  }

  const rawBody = await request.arrayBuffer();

  return {
    body: rawBody.byteLength > 0 ? rawBody : undefined,
    headers: contentType
      ? {
          "Content-Type": request.headers.get("content-type") || "application/octet-stream",
        }
      : undefined,
  };
}

export async function forwardMentorRequest(
  request: Request,
  endpoint: MentorEndpoint,
  method: MentorHttpMethod = "POST",
): Promise<NextResponse> {
  let preferLocal = false;
  try {
    const requestUrl = new URL(request.url);
    preferLocal = isLocalHostname(requestUrl.hostname);
  } catch {
    preferLocal = false;
  }

  const apiBaseUrls = getBackendBaseUrls({ preferLocal });

  if (!apiBaseUrls.length) {
    return NextResponse.json(
      {
        message:
          "API_URL (or API_URL) is missing on the server. Configure it in environment variables.",
      },
      { status: 500 },
    );
  }

  const payload = await buildForwardPayload(request, method);

  if (payload === null) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  let lastRetriablePayload: unknown = null;
  let lastRetriableStatus: number | null = null;

  for (const apiBaseUrl of apiBaseUrls) {
    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method,
        headers: payload.headers,
        body: payload.body,
        cache: "no-store",
      });

      const contentType = response.headers.get("content-type");

      if (!isJsonContentType(contentType)) {
        const bodyBuffer = await response.arrayBuffer();

        return new NextResponse(bodyBuffer, {
          status: response.status,
          headers: {
            "Content-Type": contentType || "application/octet-stream",
            "Cache-Control": "no-store",
          },
        });
      }

      const upstreamPayload = await parseUpstreamBody(response);

      if ([500, 502, 503, 504].includes(response.status)) {
        lastRetriablePayload = upstreamPayload;
        lastRetriableStatus = response.status;
        continue;
      }

      return NextResponse.json(upstreamPayload, { status: response.status });
    } catch {
      continue;
    }
  }

  if (lastRetriableStatus !== null) {
    return NextResponse.json(lastRetriablePayload ?? {}, {
      status: lastRetriableStatus,
    });
  }

  return NextResponse.json(
    { message: "Mentor registration service is unavailable" },
    { status: 502 },
  );
}
