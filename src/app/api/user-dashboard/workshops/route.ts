import { forwardUserDashboardRequest } from "@/app/api/user-dashboard/_proxy";

export async function GET(request: Request) {
  return forwardUserDashboardRequest(request, "/api/user-dashboard/workshops", "GET");
}
