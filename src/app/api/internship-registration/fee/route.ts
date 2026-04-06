import { forwardInternshipRegistrationRequest } from "@/app/api/internship-registration/_proxy";

export async function GET(request: Request) {
  return forwardInternshipRegistrationRequest(
    request,
    "/api/internship/registration/fee",
    "GET",
  );
}

export async function PUT(request: Request) {
  return forwardInternshipRegistrationRequest(
    request,
    "/api/internship/registration/fee",
    "PUT",
  );
}
