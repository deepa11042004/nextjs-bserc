import { NextResponse } from "next/server";

const DEV_FALLBACK_BACKEND_URLS = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

type InternshipRegistrationEndpoint =
  | "/api/internship/registration/create-order"
  | "/api/internship/registration/verify-payment"
  | "/api/internship/registration/register"
  | "/api/internship/registration/list";

type InternshipHttpMethod = "GET" | "POST";

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

  return process.env.NEXT_PUBLIC_API_URL?.trim() ?? "";
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

async function parseIncomingJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function buildForwardPayload(
  request: Request,
  method: InternshipHttpMethod,
): Promise<ForwardPayload | null> {
  if (method === "GET") {
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

export async function forwardInternshipRegistrationRequest(
  request: Request,
  endpoint: InternshipRegistrationEndpoint,
  method: InternshipHttpMethod = "POST",
): Promise<NextResponse> {
  let preferLocal = false;
  try {
    const requestUrl = new URL(request.url);
    preferLocal = isLocalHostname(requestUrl.hostname);
  } catch {
    preferLocal = false;
  }

  const backendUrls = getBackendBaseUrls({ preferLocal });

  if (backendUrls.length === 0) {
    return NextResponse.json(
      { message: "API_URL (or NEXT_PUBLIC_API_URL) is missing on the server" },
      { status: 500 },
    );
  }

  const payload = await buildForwardPayload(request, method);

  if (payload === null) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  let lastRetriablePayload: unknown = null;
  let lastRetriableStatus: number | null = null;

  for (const backendUrl of backendUrls) {
    try {
      const upstreamResponse = await fetch(`${backendUrl}${endpoint}`, {
        method,
        headers: payload.headers,
        body: payload.body,
        cache: "no-store",
      });

      const responsePayload = await parseUpstreamBody(upstreamResponse);

      if ([500, 502, 503, 504].includes(upstreamResponse.status)) {
        lastRetriablePayload = responsePayload;
        lastRetriableStatus = upstreamResponse.status;
        continue;
      }

      return NextResponse.json(responsePayload, { status: upstreamResponse.status });
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
    { message: "Internship registration service is unavailable" },
    { status: 502 },
  );
}
