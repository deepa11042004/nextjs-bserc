import { forwardMentorRequest } from "@/app/api/mentor/_proxy";

export async function GET(request: Request) {
  return forwardMentorRequest(request, "/api/mentor/list", "GET");
}
