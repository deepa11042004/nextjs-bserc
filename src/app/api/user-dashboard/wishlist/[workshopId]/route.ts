import { NextResponse } from "next/server";

import { forwardUserDashboardRequest } from "@/app/api/user-dashboard/_proxy";

function parseWorkshopId(rawId: string): number | null {
  const parsed = Number.parseInt(rawId, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ workshopId: string }> },
) {
  const { workshopId } = await context.params;
  const parsedWorkshopId = parseWorkshopId(workshopId);

  if (!parsedWorkshopId) {
    return NextResponse.json({ message: "Invalid workshop id" }, { status: 400 });
  }

  return forwardUserDashboardRequest(
    request,
    `/api/user-dashboard/wishlist/${parsedWorkshopId}`,
    "DELETE",
  );
}
