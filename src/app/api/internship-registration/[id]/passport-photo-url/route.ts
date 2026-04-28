import type { NextRequest } from "next/server";
import { forwardInternshipRegistrationRequest } from "@/app/api/internship-registration/_proxy";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  return forwardInternshipRegistrationRequest(
    request,
    `/api/internship/registration/${id}/passport-photo-url`,
    "GET",
  );
}
