import type { MentorProfile } from "@/types/mentor";
import { formatDate as sharedFormatDate } from "@/lib/formatDate";

function toNullableString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value.trim();
  return cleaned || null;
}

function toNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toBoolean(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "yes";
  }

  return false;
}

function toMentorProfile(value: unknown): MentorProfile | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const id = Number(record.id);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return {
    id,
    full_name: toNullableString(record.full_name) || `Mentor ${id}`,
    email: toNullableString(record.email) || "-",
    phone: toNullableString(record.phone) || "-",
    dob: toNullableString(record.dob),
    current_position: toNullableString(record.current_position),
    organization: toNullableString(record.organization),
    years_experience: toNullableNumber(record.years_experience),
    professional_bio: toNullableString(record.professional_bio),
    primary_track: toNullableString(record.primary_track),
    secondary_skills: toNullableString(record.secondary_skills),
    key_competencies: toNullableString(record.key_competencies),
    availability: toNullableString(record.availability),
    status: (toNullableString(record.status) || "pending").toLowerCase(),
    has_resume: toBoolean(record.has_resume),
    has_profile_photo: toBoolean(record.has_profile_photo),
    created_at: toNullableString(record.created_at),
  };
}

export function extractMentors(payload: unknown): MentorProfile[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const record = payload as Record<string, unknown>;
  if (!Array.isArray(record.mentors)) {
    return [];
  }

  return record.mentors
    .map(toMentorProfile)
    .filter((mentor): mentor is MentorProfile => mentor !== null);
}

export function getApiMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const record = payload as Record<string, unknown>;

  if (typeof record.message === "string" && record.message.trim()) {
    return record.message;
  }

  if (typeof record.error === "string" && record.error.trim()) {
    return record.error;
  }

  return null;
}

export function formatMentorDate(value: string | null): string {
  return sharedFormatDate(value);
}

export function getStatusBadgeClasses(status: string): string {
  const normalized = status.trim().toLowerCase();

  if (normalized === "active") {
    return "bg-emerald-950 text-emerald-200 border border-emerald-900";
  }

  if (normalized === "pending") {
    return "bg-amber-950 text-amber-200 border border-amber-900";
  }

  return "bg-zinc-800 text-zinc-200 border border-zinc-700";
}
