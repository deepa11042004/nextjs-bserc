import { forwardInternshipRegistrationRequest } from "@/app/api/internship-registration/_proxy";

export async function POST(request: Request) {
  return forwardInternshipRegistrationRequest(
    request,
    "/api/internship/registration/register",
  );
}
