import { forwardInstitutionalRegistrationRequest } from "@/app/api/institutional-registration/_proxy";

const CREATE_ORDER_ENDPOINT = "/api/institutional-registration/create-order";

export async function POST(request: Request) {
  return forwardInstitutionalRegistrationRequest(
    request,
    CREATE_ORDER_ENDPOINT,
    "POST",
  );
}
