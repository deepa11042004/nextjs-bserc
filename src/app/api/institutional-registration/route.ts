import { forwardInstitutionalRegistrationRequest } from "@/app/api/institutional-registration/_proxy";

const INSTITUTIONAL_REGISTRATION_ENDPOINT = "/api/institutional-registration";

export async function POST(request: Request) {
  return forwardInstitutionalRegistrationRequest(
    request,
    INSTITUTIONAL_REGISTRATION_ENDPOINT,
    "POST",
  );
}

export async function GET(request: Request) {
  return forwardInstitutionalRegistrationRequest(
    request,
    INSTITUTIONAL_REGISTRATION_ENDPOINT,
    "GET",
  );
}
