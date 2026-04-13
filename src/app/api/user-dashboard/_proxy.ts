import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEV_FALLBACK_BACKEND_URLS = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

const RETRIABLE_UPSTREAM_STATUSES = new Set([500, 502, 503, 504, 521, 522, 523, 524]);

type DashboardHttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ForwardPayload = {
  body?: BodyInit;
  headers?: Record<string, string>;
};

function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

function splitConfiguredApiUrls(): string[] {
  const configured = [
    process.env.API_URL,
    process.env.NEXT_PUBLIC_API_URL,
    process.env.API_URL_FALLBACK,
  ]
    .map((value) => value?.trim() ?? "")
    .filter((value) => Boolean(value));

  return configured.flatMap((value) =>
    value
      .split(",")
      .map((entry) => entry.trim())
      .filter((entry) => Boolean(entry)),
  );
}

function getBackendBaseUrls(): string[] {
  const envUrls = splitConfiguredApiUrls();
  const raw = isProductionRuntime()
    ? envUrls
    : [...DEV_FALLBACK_BACKEND_URLS, ...envUrls];

  const normalized = raw.filter((value): value is string => Boolean(value));
  return [...new Set(normalized.map((value) => value.replace(/\/$/, "")))];
}

function isJsonContentType(contentType: string | null): boolean {
  return Boolean(contentType && contentType.toLowerCase().includes("application/json"));
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
  method: DashboardHttpMethod,
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

async function getAuthorizationHeader(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("userAuthToken")?.value?.trim();

  if (!token) {
    return null;
  }

  return `Bearer ${token}`;
}

export async function forwardUserDashboardRequest(
  request: Request,
  endpoint: string,
  method: DashboardHttpMethod,
): Promise<NextResponse> {
  const backendUrls = getBackendBaseUrls();

  if (!backendUrls.length) {
    return NextResponse.json(
      { message: "API_URL is not configured on the server." },
      { status: 500 },
    );
  }

  const authorization = await getAuthorizationHeader();

  if (!authorization) {
    return NextResponse.json(
      { message: "Authentication required." },
      { status: 401 },
    );
  }

  const payload = await buildForwardPayload(request, method);

  if (payload === null) {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  let lastRetriablePayload: unknown = null;
  let lastRetriableStatus: number | null = null;

  for (const backendUrl of backendUrls) {
    try {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method,
        headers: {
          Authorization: authorization,
          ...(payload.headers || {}),
        },
        body: payload.body,
        cache: "no-store",
      });

      const contentType = response.headers.get("content-type");

      if (!isJsonContentType(contentType)) {
        const rawBody = await response.arrayBuffer();
        const bodyBytes = new Uint8Array(rawBody);

        if (RETRIABLE_UPSTREAM_STATUSES.has(response.status)) {
          lastRetriablePayload = {
            message: "User dashboard service is temporarily unavailable.",
          };
          lastRetriableStatus = response.status;
          continue;
        }

        return new NextResponse(bodyBytes, {
          status: response.status,
          headers: {
            "Content-Type": contentType || "application/octet-stream",
            "Cache-Control": "no-store",
          },
        });
      }

      const responsePayload = await parseUpstreamBody(response);

      if (RETRIABLE_UPSTREAM_STATUSES.has(response.status)) {
        lastRetriablePayload = responsePayload;
        lastRetriableStatus = response.status;
        continue;
      }

      return NextResponse.json(responsePayload, { status: response.status });
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
    { message: "User dashboard service is unavailable." },
    { status: 502 },
  );
}
