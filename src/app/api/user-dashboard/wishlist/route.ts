import { forwardUserDashboardRequest } from "@/app/api/user-dashboard/_proxy";

export async function GET(request: Request) {
  return forwardUserDashboardRequest(request, "/api/user-dashboard/wishlist", "GET");
}

export async function POST(request: Request) {
  return forwardUserDashboardRequest(request, "/api/user-dashboard/wishlist", "POST");
}
