import { forwardSummerSchoolRequest } from "@/app/api/summer-school/_proxy";

const LOG_PAYMENT_ATTEMPT_ENDPOINT =
  "/api/summer-school/student-registration/log-payment-attempt";

export async function POST(request: Request) {
  return forwardSummerSchoolRequest(request, LOG_PAYMENT_ATTEMPT_ENDPOINT, "POST");
}
