import { NextResponse } from "next/server";

import { forwardMouApplicationRequest } from "@/app/api/mou-application/_proxy";

function parseMouRequestId(rawId: string): number | null {
  const parsed = Number.parseInt(rawId, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const requestId = parseMouRequestId(id);

  if (!requestId) {
    return NextResponse.json({ message: "Invalid MoU request id" }, { status: 400 });
  }

  return forwardMouApplicationRequest(
    request,
    `/api/mou-requests/${requestId}/document`,
    "GET",
  );
}
