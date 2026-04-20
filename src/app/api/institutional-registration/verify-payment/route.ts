import { forwardInstitutionalRegistrationRequest } from "@/app/api/institutional-registration/_proxy";

const VERIFY_PAYMENT_ENDPOINT = "/api/institutional-registration/verify-payment";

export async function POST(request: Request) {
  return forwardInstitutionalRegistrationRequest(
    request,
    VERIFY_PAYMENT_ENDPOINT,
    "POST",
  );
}
