import { forwardSummerSchoolRequest } from "@/app/api/summer-school/_proxy";

const CREATE_ORDER_ENDPOINT =
  "/api/summer-school/student-registration/create-order";

export async function POST(request: Request) {
  return forwardSummerSchoolRequest(request, CREATE_ORDER_ENDPOINT, "POST");
}
