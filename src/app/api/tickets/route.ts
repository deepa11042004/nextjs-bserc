import { forwardTicketRequest } from "@/app/api/tickets/_proxy";

export async function POST(request: Request) {
  return forwardTicketRequest(request, "/api/tickets", "POST", "user");
}
