import { NextResponse } from "next/server";

import { forwardInternshipRegistrationRequest } from "@/app/api/internship-registration/_proxy";

function parseInternshipRegistrationId(rawId: string): number | null {
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
  const registrationId = parseInternshipRegistrationId(id);

  if (!registrationId) {
    return NextResponse.json(
      { message: "Invalid internship registration id" },
      { status: 400 },
    );
  }

  return forwardInternshipRegistrationRequest(
    request,
    `/api/internship/registration/${registrationId}`,
    "DELETE",
  );
}
