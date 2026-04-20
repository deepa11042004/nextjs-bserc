import { forwardInstitutionalRegistrationRequest } from "@/app/api/institutional-registration/_proxy";

const LOG_PAYMENT_ATTEMPT_ENDPOINT =
  "/api/institutional-registration/log-payment-attempt";

export async function POST(request: Request) {
  return forwardInstitutionalRegistrationRequest(
    request,
    LOG_PAYMENT_ATTEMPT_ENDPOINT,
    "POST",
  );
}
