import { NextResponse } from "next/server";

import { forwardTicketRequest } from "@/app/api/tickets/_proxy";

function parseTicketId(rawId: string): number | null {
  const parsed = Number.parseInt(rawId, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const ticketId = parseTicketId(id);

  if (!ticketId) {
    return NextResponse.json({ message: "Invalid ticket id" }, { status: 400 });
  }

  return forwardTicketRequest(request, `/api/admin/tickets/${ticketId}/status`, "PATCH", "admin");
}
