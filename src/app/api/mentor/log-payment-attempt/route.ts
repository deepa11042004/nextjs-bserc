import { forwardMentorRequest } from "@/app/api/mentor/_proxy";

const LOG_PAYMENT_ATTEMPT_ENDPOINT = "/api/mentor/log-payment-attempt";

export async function POST(request: Request) {
  return forwardMentorRequest(request, LOG_PAYMENT_ATTEMPT_ENDPOINT, "POST");
}
