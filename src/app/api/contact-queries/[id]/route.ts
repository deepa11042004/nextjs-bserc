import { NextResponse } from "next/server";

import { forwardContactQueriesRequest } from "@/app/api/contact-queries/_proxy";

function parseContactQueryId(rawId: string): number | null {
  const parsed = Number.parseInt(rawId, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const queryId = parseContactQueryId(id);

  if (!queryId) {
    return NextResponse.json({ message: "Invalid query id" }, { status: 400 });
  }

  return forwardContactQueriesRequest(
    request,
    `/api/contact-queries/${queryId}`,
    "DELETE",
  );
}
