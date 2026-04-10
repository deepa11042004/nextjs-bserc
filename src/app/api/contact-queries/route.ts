import { forwardContactQueriesRequest } from "@/app/api/contact-queries/_proxy";

const CONTACT_QUERIES_ENDPOINT = "/api/contact-queries";

export async function POST(request: Request) {
  return forwardContactQueriesRequest(
    request,
    CONTACT_QUERIES_ENDPOINT,
    "POST",
  );
}

export async function GET(request: Request) {
  return forwardContactQueriesRequest(
    request,
    CONTACT_QUERIES_ENDPOINT,
    "GET",
  );
}
