import { TICKET_STATUS_LABELS } from "@/data/helpDeskFaqs";
import type { TicketStatus } from "@/types/helpdesk";

export function getApiMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const typedPayload = payload as { message?: unknown; error?: unknown };

  if (typeof typedPayload.message === "string" && typedPayload.message.trim()) {
    return typedPayload.message.trim();
  }

  if (typeof typedPayload.error === "string" && typedPayload.error.trim()) {
    return typedPayload.error.trim();
  }

  return "";
}

export function formatTicketDate(value: string | null): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTicketDateTime(value: string | null): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTicketStatusBadgeClass(status: string | null | undefined): string {
  const normalized = String(status || "").trim().toLowerCase();

  if (normalized === "open") {
    return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
  }

  if (normalized === "in-progress") {
    return "bg-amber-500/20 text-amber-300 border border-amber-500/40";
  }

  if (normalized === "resolved") {
    return "bg-blue-500/20 text-blue-300 border border-blue-500/40";
  }

  return "bg-zinc-700/40 text-zinc-300 border border-zinc-600";
}

export function toTicketStatusLabel(status: string | null | undefined): string {
  const normalized = String(status || "").trim().toLowerCase() as TicketStatus;

  if (normalized in TICKET_STATUS_LABELS) {
    return TICKET_STATUS_LABELS[normalized as keyof typeof TICKET_STATUS_LABELS];
  }

  return "Closed";
}

export function resolveAttachmentHref(pathOrUrl: string | null): string | null {
  if (!pathOrUrl) {
    return null;
  }

  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");
  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;

  return `${apiBase}${normalizedPath}`;
}
