import { forwardSummerSchoolRequest } from "@/app/api/summer-school/_proxy";

const SETTINGS_ENDPOINT = "/api/summer-school/student-registration/settings";

export async function GET(request: Request) {
  return forwardSummerSchoolRequest(request, SETTINGS_ENDPOINT, "GET");
}

export async function PUT(request: Request) {
  return forwardSummerSchoolRequest(request, SETTINGS_ENDPOINT, "PUT");
}
