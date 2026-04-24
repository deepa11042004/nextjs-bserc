export function parseToDate(value: unknown): Date | null {
  if (value === null || value === undefined) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const raw = String(value).trim();
  if (!raw) return null;

  // Numeric epoch (seconds or milliseconds)
  if (/^[0-9]+$/.test(raw)) {
    const n = Number(raw);
    const ms = n > 1e12 ? n : n * 1000;
    const d = new Date(ms);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  // If string looks ISO or already contains timezone info, try direct parse
  if (raw.includes("T") || /Z$/.test(raw) || /[+-]\d{2}:?\d{2}$/.test(raw)) {
    const d = new Date(raw);
    if (!Number.isNaN(d.getTime())) return d;
  }

  // Handle common MySQL DATETIME format like "YYYY-MM-DD HH:mm:ss" or date-only
  if (/^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?)?$/.test(raw)) {
    let candidate = raw.includes("T") ? raw : raw.replace(" ", "T");
    if (!/Z$/.test(candidate) && !/[+-]\d{2}:?\d{2}$/.test(candidate)) {
      candidate = `${candidate}Z`;
    }

    const d = new Date(candidate);
    if (!Number.isNaN(d.getTime())) return d;
  }

  // Fallback
  const fallback = new Date(raw);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

export function formatDate(value: unknown): string {
  const d = parseToDate(value);
  if (!d) return "-";

  return d.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(value: unknown): string {
  const d = parseToDate(value);
  if (!d) return "-";

  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
