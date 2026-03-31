import { forwardAuthRequest } from "@/app/api/auth/_proxy";

export async function POST(request: Request) {
  return forwardAuthRequest(request, "/auth/login");
}
