import { forwardMouApplicationRequest } from "@/app/api/mou-application/_proxy";

const MOU_APPLICATION_ENDPOINT = "/api/mou-requests";

export async function POST(request: Request) {
  return forwardMouApplicationRequest(
    request,
    MOU_APPLICATION_ENDPOINT,
    "POST",
  );
}

export async function GET(request: Request) {
  return forwardMouApplicationRequest(
    request,
    MOU_APPLICATION_ENDPOINT,
    "GET",
  );
}