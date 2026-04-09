import { forwardMentorRequest } from "@/app/api/mentor/_proxy";

export async function POST(request: Request) {
  return forwardMentorRequest(request, "/api/mentor/create-order");
}
