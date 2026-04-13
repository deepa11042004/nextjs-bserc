import { forwardTicketRequest } from "@/app/api/tickets/_proxy";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const endpoint = `/api/admin/tickets${requestUrl.search}`;

  return forwardTicketRequest(request, endpoint, "GET", "admin");
}
