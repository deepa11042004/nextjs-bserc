import { NextResponse } from "next/server";

const DEV_FALLBACK_BACKEND_URLS = [
  "http://127.0.0.1:5001",
  "http://localhost:5001",
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

type MouApplicationEndpoint = `/api/mou-requests${string}`;
type MouApplicationHttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

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

  const publicApiUrl = process.env.API_URL?.trim();
  if (publicApiUrl) {
    return publicApiUrl;
  }

  return "";
}

function isLoopbackUrl(value: string): boolean {
  if (!value) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return (
      parsed.hostname === "localhost"
      || parsed.hostname === "127.0.0.1"
      || parsed.hostname === "::1"
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

function isJsonContentType(contentType: string | null): boolean {
  if (!contentType) {
    return false;
  }

  return contentType.toLowerCase().includes("application/json");
}

function isHtmlMissingRouteResponse(contentType: string | null, status: number): boolean {
  if (status !== 404 || !contentType) {
    return false;
  }

  return contentType.toLowerCase().includes("text/html");
}

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

async function parseIncomingJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function buildForwardPayload(
  request: Request,
  method: MouApplicationHttpMethod,
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
          "Content-Type":
            request.headers.get("content-type") || "application/octet-stream",
        }
      : undefined,
  };
}

export async function forwardMouApplicationRequest(
  request: Request,
  endpoint: MouApplicationEndpoint,
  method: MouApplicationHttpMethod,
): Promise<NextResponse> {
  let preferLocal = false;

  try {
    const requestUrl = new URL(request.url);
    preferLocal = isLocalHostname(requestUrl.hostname);
  } catch {
    preferLocal = false;
  }

  const backendUrls = getBackendBaseUrls({ preferLocal });

  if (!backendUrls.length) {
    return NextResponse.json(
      {
        message:
          "API_URL (or API_URL) is missing on the server. Configure API_URL in deployment environment variables.",
      },
      { status: 500 },
    );
  }

  const payload = await buildForwardPayload(request, method);

  if (payload === null) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }

  let lastRetriableResponse: NextResponse | null = null;

  for (const backendUrl of backendUrls) {
    try {
      const upstreamResponse = await fetch(`${backendUrl}${endpoint}`, {
        method,
        headers: payload.headers,
        body: payload.body,
        cache: "no-store",
      });

      const contentType = upstreamResponse.headers.get("content-type");

      if (!isJsonContentType(contentType)) {
        const rawBody = await upstreamResponse.arrayBuffer();
        const bodyBytes = new Uint8Array(rawBody);

        const shouldRetry =
          [500, 502, 503, 504].includes(upstreamResponse.status)
          || isHtmlMissingRouteResponse(contentType, upstreamResponse.status);

        const responseHeaders: Record<string, string> = {
          "Content-Type": contentType || "application/octet-stream",
          "Cache-Control": "no-store",
        };

        const contentDisposition = upstreamResponse.headers.get("content-disposition");
        if (contentDisposition) {
          responseHeaders["Content-Disposition"] = contentDisposition;
        }

        if (shouldRetry) {
          lastRetriableResponse = new NextResponse(bodyBytes, {
            status: upstreamResponse.status,
            headers: responseHeaders,
          });
          continue;
        }

        return new NextResponse(bodyBytes, {
          status: upstreamResponse.status,
          headers: responseHeaders,
        });
      }

      const responsePayload = await parseUpstreamBody(upstreamResponse);

      if ([500, 502, 503, 504].includes(upstreamResponse.status)) {
        lastRetriableResponse = NextResponse.json(responsePayload, {
          status: upstreamResponse.status,
        });
        continue;
      }

      return NextResponse.json(responsePayload, {
        status: upstreamResponse.status,
      });
    } catch {
      continue;
    }
  }

  if (lastRetriableResponse) {
    return lastRetriableResponse;
  }

  return NextResponse.json(
    { message: "MoU request service is unavailable" },
    { status: 502 },
  );
}