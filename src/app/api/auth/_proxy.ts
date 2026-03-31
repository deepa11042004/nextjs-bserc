import { NextResponse } from "next/server";

const FALLBACK_AUTH_URLS = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

function getAuthBaseUrls(): string[] {
  const envUrl = process.env.API_URL?.trim();
  const raw = [envUrl, ...FALLBACK_AUTH_URLS].filter(
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

export async function forwardAuthRequest(
  request: Request,
  endpoint: "/auth/login" | "/auth/register",
) {
  const apiBaseUrls = getAuthBaseUrls();

  if (apiBaseUrls.length === 0) {
    return NextResponse.json(
      { message: "API_URL is missing on the server" },
      { status: 500 },
    );
  }

  const body = await parseIncomingBody(request);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  try {
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

        if ([404, 500, 502, 503, 504].includes(response.status)) {
          continue;
        }

        const payload = await parseUpstreamBody(response);
        return NextResponse.json(payload, { status: response.status });
      } catch {
        continue;
      }
    }

    return NextResponse.json(
      { message: "Authentication service is unavailable" },
      { status: 502 },
    );
  } catch {
    return NextResponse.json(
      { message: "Authentication service is unavailable" },
      { status: 502 },
    );
  }
}
