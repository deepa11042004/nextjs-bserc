import { forwardTicketRequest } from "@/app/api/tickets/_proxy";

export async function GET(request: Request) {
  return forwardTicketRequest(request, "/api/tickets/my", "GET", "user");
}
