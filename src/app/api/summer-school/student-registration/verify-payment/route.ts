import { forwardSummerSchoolRequest } from "@/app/api/summer-school/_proxy";

const VERIFY_PAYMENT_ENDPOINT =
  "/api/summer-school/student-registration/verify-payment";

export async function POST(request: Request) {
  return forwardSummerSchoolRequest(request, VERIFY_PAYMENT_ENDPOINT, "POST");
}
