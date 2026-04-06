import { NextResponse } from "next/server";

const DEV_FALLBACK_AUTH_URLS = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

function isLocalHostname(hostname: string): boolean {
  return (
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
  );
}

function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
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

function getAuthBaseUrls(options?: { preferLocal?: boolean }): string[] {
  const envUrl = getConfiguredApiUrl();
  const preferLocal = Boolean(options?.preferLocal);
  const raw = isProductionRuntime()
    ? [envUrl]
    : preferLocal
      ? [...DEV_FALLBACK_AUTH_URLS, envUrl]
      : [envUrl, ...DEV_FALLBACK_AUTH_URLS];

  const normalized = raw.filter((value): value is string => Boolean(value));

  return [...new Set(normalized.map((value) => value.replace(/\/$/, "")))];
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

async function parseIncomingBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function forwardAuthRequest(
  request: Request,
  endpoint: "/auth/login" | "/auth/register",
) {
  let preferLocal = false;
  try {
    const requestUrl = new URL(request.url);
    preferLocal = isLocalHostname(requestUrl.hostname);
  } catch {
    preferLocal = false;
  }

  const apiBaseUrls = getAuthBaseUrls({ preferLocal });

  if (apiBaseUrls.length === 0) {
    return NextResponse.json(
      {
        message:
          "API_URL (or API_URL) is missing on the server. Configure API_URL in deployment environment variables.",
      },
      { status: 500 },
    );
  }

  const body = await parseIncomingBody(request);

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }

  let lastRetriablePayload: unknown = null;
  let lastRetriableStatus: number | null = null;

  for (const apiBaseUrl of apiBaseUrls) {
    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      });

      const payload = await parseUpstreamBody(response);

      if ([500, 502, 503, 504].includes(response.status)) {
        lastRetriablePayload = payload;
        lastRetriableStatus = response.status;
        continue;
      }

      return NextResponse.json(payload, { status: response.status });
    } catch {
      continue;
    }
  }

  if (lastRetriableStatus !== null) {
    return NextResponse.json(
      lastRetriablePayload ?? {
        message: "Authentication service is unavailable",
      },
      { status: lastRetriableStatus },
    );
  }

  return NextResponse.json(
    {
      message:
        "Authentication service is unavailable. Verify API_URL points to a reachable public backend.",
    },
    { status: 502 },
  );
}
