import { NextResponse } from "next/server";

import { forwardMentorRequest } from "@/app/api/mentor/_proxy";

function parseMentorId(rawId: string): number | null {
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
  const mentorId = parseMentorId(id);

  if (!mentorId) {
    return NextResponse.json({ message: "Invalid mentor id" }, { status: 400 });
  }

  return forwardMentorRequest(
    request,
    `/api/mentor/${mentorId}/approve`,
    "PATCH",
  );
}
