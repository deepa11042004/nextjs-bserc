import { forwardMentorRequest } from "@/app/api/mentor/_proxy";
import { NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const mentorId = String(id || "").trim();

  if (!mentorId) {
    return Response.json({ message: "Invalid mentor id" }, { status: 400 });
  }

  return forwardMentorRequest(
    request,
    `/api/mentor/${mentorId}/profile-photo`,
    "GET",
  );
}
