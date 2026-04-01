import { NextResponse } from "next/server";

const FALLBACK_BACKEND_URLS = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

type WorkshopRegistrationEndpoint =
  | "/api/workshop/enrollment"
  | "/api/workshop/enrollment/create-order"
  | "/api/workshop/enrollment/verify-payment";

function getBackendBaseUrls(): string[] {
  const envUrl = process.env.API_URL?.trim();
  const raw = [envUrl, ...FALLBACK_BACKEND_URLS].filter(
    (value): value is string => Boolean(value),
  );

  return [...new Set(raw.map((value) => value.replace(/\/$/, "")))];
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

export async function forwardWorkshopRegistrationRequest(
  request: Request,
  endpoint: WorkshopRegistrationEndpoint,
) {
  const apiBaseUrls = getBackendBaseUrls();

  if (!apiBaseUrls.length) {
    return NextResponse.json(
      { message: "API_URL is missing on the server" },
      { status: 500 },
    );
  }

  const body = await parseIncomingBody(request);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
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

      if ([404, 500, 502, 503, 504].includes(response.status)) {
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
    return NextResponse.json(lastRetriablePayload ?? {}, {
      status: lastRetriableStatus,
    });
  }

  return NextResponse.json(
    { message: "Workshop registration service is unavailable" },
    { status: 502 },
  );
}
