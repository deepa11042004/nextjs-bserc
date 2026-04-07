import { forwardSummerSchoolRequest } from "@/app/api/summer-school/_proxy";

const STUDENT_REGISTRATION_ENDPOINT = "/api/summer-school/student-registration";

export async function POST(request: Request) {
  return forwardSummerSchoolRequest(
    request,
    STUDENT_REGISTRATION_ENDPOINT,
    "POST",
  );
}

export async function GET(request: Request) {
  return forwardSummerSchoolRequest(
    request,
    STUDENT_REGISTRATION_ENDPOINT,
    "GET",
  );
}