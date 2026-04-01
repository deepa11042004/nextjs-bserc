import { forwardWorkshopRegistrationRequest } from "@/app/api/workshop-registration/_proxy";

export async function POST(request: Request) {
  return forwardWorkshopRegistrationRequest(
    request,
    "/api/workshop/enrollment/create-order",
  );
}
