import { forwardUserDashboardRequest } from "@/app/api/user-dashboard/_proxy";

export async function POST(request: Request) {
  return forwardUserDashboardRequest(request, "/api/user-dashboard/change-password", "POST");
}
