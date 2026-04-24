import type { InternshipApplication } from "@/types/internshipApplication";
import { formatDate as sharedFormatDate, formatDateTime as sharedFormatDateTime } from "@/lib/formatDate";

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

function toInternshipApplication(value: unknown): InternshipApplication | null {
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
    internship_name: toNullableString(record.internship_name) || "-",
    internship_designation: toNullableString(record.internship_designation) || "-",
    full_name: toNullableString(record.full_name) || `Applicant ${id}`,
    guardian_name: toNullableString(record.guardian_name) || "-",
    gender: toNullableString(record.gender) || "-",
    dob: toNullableString(record.dob),
    mobile_number: toNullableString(record.mobile_number) || "-",
    email: toNullableString(record.email) || "-",
    alternative_email: toNullableString(record.alternative_email),
    address: toNullableString(record.address) || "-",
    city: toNullableString(record.city) || "-",
    state: toNullableString(record.state) || "-",
    pin_code: toNullableString(record.pin_code) || "-",
    institution_name: toNullableString(record.institution_name) || "-",
    educational_qualification:
      toNullableString(record.educational_qualification) || "-",
    is_lateral: toBoolean(record.is_lateral),
    declaration_accepted: toBoolean(record.declaration_accepted),
    has_passport_photo: toBoolean(record.has_passport_photo),
    passport_photo_mime_type: toNullableString(record.passport_photo_mime_type),
    passport_photo_file_name: toNullableString(record.passport_photo_file_name),
    payment_amount: toNullableNumber(record.payment_amount),
    payment_currency: toNullableString(record.payment_currency),
    razorpay_order_id: toNullableString(record.razorpay_order_id),
    razorpay_payment_id: toNullableString(record.razorpay_payment_id),
    payment_status: toNullableString(record.payment_status),
    created_at: toNullableString(record.created_at),
    updated_at: toNullableString(record.updated_at),
  };
}

export function extractInternshipApplications(
  payload: unknown,
): InternshipApplication[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const record = payload as Record<string, unknown>;

  if (!Array.isArray(record.applications)) {
    return [];
  }

  return record.applications
    .map(toInternshipApplication)
    .filter((application): application is InternshipApplication => application !== null);
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

export function formatDate(value: string | null): string {
  return sharedFormatDate(value);
}

export function formatDateTime(value: string | null): string {
  return sharedFormatDateTime(value);
}

export function formatMoney(amount: number | null, currency: string | null): string {
  if (amount === null || !Number.isFinite(amount)) {
    return "-";
  }

  const currencyCode = (currency || "INR").toUpperCase();

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currencyCode}`;
  }
}

export function getPaymentBadgeClasses(status: string | null): string {
  const normalized = (status || "").trim().toLowerCase();

  if (normalized === "captured" || normalized === "authorized") {
    return "bg-emerald-950 text-emerald-200 border border-emerald-900";
  }

  if (normalized === "not_required") {
    return "bg-sky-950 text-sky-200 border border-sky-900";
  }

  if (normalized === "failed") {
    return "bg-rose-950 text-rose-200 border border-rose-900";
  }

  return "bg-zinc-800 text-zinc-200 border border-zinc-700";
}
