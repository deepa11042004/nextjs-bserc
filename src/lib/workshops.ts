import type { Workshop } from "@/types/workshop";

const FALLBACK_BACKEND_URLS = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

const WORKSHOP_LIST_PATHS = [
  "/api/workshop-list",
  "/api/workshop-list/list",
  "/api/workshop-list/all",
];

const DEFAULT_THUMBNAIL = "/img/bserc_new_logo.png";

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}

function getCandidateBackendUrls(): string[] {
  const envUrl = process.env.API_URL?.trim();
  const raw = [envUrl, ...FALLBACK_BACKEND_URLS].filter(
    (value): value is string => Boolean(value),
  );

  return [...new Set(raw.map((value) => value.replace(/\/$/, "")))];
}

function readString(source: JsonRecord, keys: string[]): string | null {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
}

function readIdentifier(source: JsonRecord, keys: string[]): string | null {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return null;
}

function readNumber(source: JsonRecord, keys: string[]): number | null {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}

function readBoolean(source: JsonRecord, keys: string[]): boolean | null {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "boolean") {
      return value;
    }

    if (typeof value === "number") {
      return value === 1;
    }

    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (["true", "1", "yes"].includes(normalized)) {
        return true;
      }

      if (["false", "0", "no"].includes(normalized)) {
        return false;
      }
    }
  }

  return null;
}

function normalizeImageUrl(rawValue: string | null, backendUrl: string): string {
  if (!rawValue) {
    return DEFAULT_THUMBNAIL;
  }

  if (/^https?:\/\//i.test(rawValue)) {
    return rawValue;
  }

  if (rawValue.startsWith("/")) {
    return `${backendUrl}${rawValue}`;
  }

  return `${backendUrl}/${rawValue.replace(/^\/+/, "")}`;
}

function normalizeOptionalImageUrl(
  rawValue: string | null,
  backendUrl: string,
): string | null {
  if (!rawValue) {
    return null;
  }

  if (/^https?:\/\//i.test(rawValue)) {
    return rawValue;
  }

  if (rawValue.startsWith("/")) {
    return `${backendUrl}${rawValue}`;
  }

  return `${backendUrl}/${rawValue.replace(/^\/+/, "")}`;
}

function toWorkshopArray(payload: unknown): JsonRecord[] {
  if (Array.isArray(payload)) {
    return payload.filter(isRecord);
  }

  if (!isRecord(payload)) {
    return [];
  }

  const candidates = [
    payload.data,
    payload.results,
    payload.items,
    payload.workshops,
    payload.programs,
    payload.rows,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate.filter(isRecord);
    }
  }

  if (isRecord(payload.data)) {
    const nested = [
      payload.data.items,
      payload.data.results,
      payload.data.workshops,
      payload.data.programs,
    ];

    for (const candidate of nested) {
      if (Array.isArray(candidate)) {
        return candidate.filter(isRecord);
      }
    }
  }

  return [];
}

function normalizeWorkshop(
  item: JsonRecord,
  backendUrl: string,
  index: number,
): Workshop | null {
  const title = readString(item, ["title", "name", "workshop_title", "program_name"]);
  if (!title) {
    return null;
  }

  const idValue = readIdentifier(item, ["id", "workshop_id", "program_id", "_id"]);

  const description =
    readString(item, ["description", "details", "summary", "about"]) ||
    "No description available.";

  const workshopDate =
    readString(item, ["workshop_date", "start_date", "date", "created_at"]) ||
    "";

  const startTime = readString(item, ["start_time", "time", "startTime"]) || "";
  const endTime = readString(item, ["end_time", "endTime"]) || "";

  const mode = readString(item, ["mode", "workshop_mode"]) || "Not specified";

  const eligibility =
    readString(item, ["eligibility", "eligible_for", "audience"]) ||
    "Open for all";

  const fee = readNumber(item, ["fee", "fees", "price", "amount"]) ?? 0;
  const certificate =
    readBoolean(item, ["certificate", "has_certificate", "has_certificate_file"]) ??
    false;

  const thumbnailUrl = normalizeImageUrl(
    readString(item, [
      "thumbnail_url",
      "thumbnail",
      "image_url",
      "image",
      "banner",
      "cover_image",
    ]),
    backendUrl,
  );

  const certificateUrl = normalizeOptionalImageUrl(
    readString(item, [
      "certificate_url",
      "certificateUrl",
      "certificate_template_url",
      "certificate_template",
    ]),
    backendUrl,
  );

  const duration = readString(item, ["duration"]);

  return {
    id: idValue || `workshop-${index + 1}`,
    title,
    description,
    workshopDate,
    startTime,
    endTime: endTime || undefined,
    mode,
    eligibility,
    certificate,
    certificateUrl: certificateUrl || undefined,
    fee,
    thumbnailUrl,
    duration: duration || undefined,
  };
}

function parseWorkshopDate(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const isoDateMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoDateMatch) {
    const year = Number(isoDateMatch[1]);
    const month = Number(isoDateMatch[2]);
    const day = Number(isoDateMatch[3]);

    const parsed = new Date(year, month - 1, day);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

function sortWorkshopsByNearestDate(workshops: Workshop[]): Workshop[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return [...workshops].sort((left, right) => {
    const leftDate = parseWorkshopDate(left.workshopDate);
    const rightDate = parseWorkshopDate(right.workshopDate);

    if (!leftDate && !rightDate) {
      return 0;
    }

    if (!leftDate) {
      return 1;
    }

    if (!rightDate) {
      return -1;
    }

    const leftIsUpcoming = leftDate.getTime() >= today.getTime();
    const rightIsUpcoming = rightDate.getTime() >= today.getTime();

    if (leftIsUpcoming && rightIsUpcoming) {
      return leftDate.getTime() - rightDate.getTime();
    }

    if (leftIsUpcoming) {
      return -1;
    }

    if (rightIsUpcoming) {
      return 1;
    }

    // For past workshops, keep the most recent ones first.
    return rightDate.getTime() - leftDate.getTime();
  });
}

async function parseResponsePayload(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return [];
  }

  try {
    return JSON.parse(text);
  } catch {
    return [];
  }
}

export async function fetchWorkshops(options?: {
  limit?: number;
  revalidateSeconds?: number;
}): Promise<Workshop[]> {
  const backendUrls = getCandidateBackendUrls();
  if (!backendUrls.length) {
    return [];
  }

  const revalidateSeconds = options?.revalidateSeconds ?? 300;

  for (const backendUrl of backendUrls) {
    for (const path of WORKSHOP_LIST_PATHS) {
      try {
        const response = await fetch(`${backendUrl}${path}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          next: { revalidate: revalidateSeconds },
        });

        if (!response.ok) {
          continue;
        }

        const payload = await parseResponsePayload(response);
        const rawItems = toWorkshopArray(payload);
        const normalized = rawItems
          .map((item, index) => normalizeWorkshop(item, backendUrl, index))
          .filter((item): item is Workshop => Boolean(item));

        if (!normalized.length) {
          continue;
        }

        const sorted = sortWorkshopsByNearestDate(normalized);

        if (typeof options?.limit === "number") {
          return sorted.slice(0, options.limit);
        }

        return sorted;
      } catch {
        continue;
      }
    }
  }

  return [];
}

export async function fetchWorkshopById(
  id: string,
  options?: { revalidateSeconds?: number },
): Promise<Workshop | null> {
  const normalizedId = decodeURIComponent(id).trim();
  if (!normalizedId) {
    return null;
  }

  const workshops = await fetchWorkshops({
    revalidateSeconds: options?.revalidateSeconds ?? 300,
  });

  return (
    workshops.find((workshop) => String(workshop.id) === normalizedId) ?? null
  );
}
