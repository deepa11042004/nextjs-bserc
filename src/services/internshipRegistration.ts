import { ApiError } from "@/services/api";

async function parseResponseBody(response: Response): Promise<unknown> {
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

async function postJson<T>(path: string, payload: unknown): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const body = await parseResponseBody(response);

  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof (body as { message?: unknown }).message === "string"
        ? (body as { message: string }).message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, body);
  }

  return body as T;
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    method: "GET",
    cache: "no-store",
  });

  const body = await parseResponseBody(response);

  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof (body as { message?: unknown }).message === "string"
        ? (body as { message: string }).message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, body);
  }

  return body as T;
}

async function putJson<T>(path: string, payload: unknown): Promise<T> {
  const response = await fetch(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const body = await parseResponseBody(response);

  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof (body as { message?: unknown }).message === "string"
        ? (body as { message: string }).message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, body);
  }

  return body as T;
}

async function postFormData<T>(path: string, payload: FormData): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    body: payload,
    cache: "no-store",
  });

  const body = await parseResponseBody(response);

  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof (body as { message?: unknown }).message === "string"
        ? (body as { message: string }).message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, body);
  }

  return body as T;
}

export interface CreateInternshipOrderPayload {
  email: string;
  is_lateral?: boolean;
}

export interface CreateInternshipOrderResponse {
  requires_payment: boolean;
  already_registered?: boolean;
  key_id?: string;
  order_id?: string;
  amount: number;
  currency: string;
  application_fee?: number;
  message?: string;
}

export interface InternshipFeeSettingsResponse {
  general_fee_rupees: number;
  lateral_fee_rupees: number;
  message?: string;
}

export function createInternshipPaymentOrder(payload: CreateInternshipOrderPayload) {
  return postJson<CreateInternshipOrderResponse>(
    "/api/internship-registration/create-order",
    payload,
  );
}

export function verifyInternshipPaymentAndRegister(payload: FormData) {
  return postFormData<{ message: string }>(
    "/api/internship-registration/verify-payment",
    payload,
  );
}

export function registerInternshipWithoutPayment(payload: FormData) {
  return postFormData<{ message: string }>(
    "/api/internship-registration/register",
    payload,
  );
}

export function getInternshipFeeSettings() {
  return getJson<InternshipFeeSettingsResponse>(
    "/api/internship-registration/fee",
  );
}

export function updateInternshipFeeSettings(payload: {
  general_fee_rupees: number;
  lateral_fee_rupees: number;
}) {
  return putJson<InternshipFeeSettingsResponse>(
    "/api/internship-registration/fee",
    payload,
  );
}
