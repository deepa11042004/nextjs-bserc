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

export interface WorkshopRegistrationPayload {
  workshop_id: string;
  full_name: string;
  email: string;
  contact_number: string;
  alternative_email: string;
  institution: string;
  designation: string;
  nationality: string;
  country?: string | null;
  agree_recording: boolean;
  agree_terms: boolean;
}

export interface CreateWorkshopOrderPayload {
  workshop_id: string;
  email?: string;
}

export interface CreateWorkshopOrderResponse {
  requires_payment: boolean;
  already_registered?: boolean;
  key_id?: string;
  order_id?: string;
  amount: number;
  currency: string;
  workshop_id: number | string;
  workshop_title?: string;
  message?: string;
}

export interface VerifyWorkshopPaymentPayload
  extends WorkshopRegistrationPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RecordWorkshopFailedPaymentPayload
  extends WorkshopRegistrationPayload {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  payment_status: string;
  payment_mode?: string;
}

export function createWorkshopPaymentOrder(payload: CreateWorkshopOrderPayload) {
  return postJson<CreateWorkshopOrderResponse>(
    "/api/workshop-registration/create-order",
    payload,
  );
}

export function verifyWorkshopPaymentAndRegister(
  payload: VerifyWorkshopPaymentPayload,
) {
  return postJson<{ message: string }>(
    "/api/workshop-registration/verify-payment",
    payload,
  );
}

export function registerWorkshopWithoutPayment(
  payload: WorkshopRegistrationPayload,
) {
  return postJson<{ message: string }>(
    "/api/workshop-registration/register",
    payload,
  );
}

export function recordWorkshopPaymentAttempt(
  payload: RecordWorkshopFailedPaymentPayload,
) {
  return postJson<{ message: string }>(
    "/api/workshop-registration/register",
    payload,
  );
}

export function recordWorkshopFailedPaymentAttempt(
  payload: RecordWorkshopFailedPaymentPayload,
) {
  return recordWorkshopPaymentAttempt(payload);
}
