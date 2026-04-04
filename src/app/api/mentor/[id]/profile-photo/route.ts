import { forwardMentorRequest } from "@/app/api/mentor/_proxy";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  const mentorId = String(params.id || "").trim();

  if (!mentorId) {
    return Response.json({ message: "Invalid mentor id" }, { status: 400 });
  }

  return forwardMentorRequest(
    request,
    `/api/mentor/${mentorId}/profile-photo`,
    "GET",
  );
}
