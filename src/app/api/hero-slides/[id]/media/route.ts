import { NextResponse } from "next/server";

import { forwardHeroSlidesPublicRequest } from "@/app/api/hero-slides/_proxy";

function parseHeroSlideId(rawId: string): number | null {
  const parsed = Number.parseInt(rawId, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const slideId = parseHeroSlideId(id);

  if (!slideId) {
    return NextResponse.json({ message: "Invalid hero slide id" }, { status: 400 });
  }

  return forwardHeroSlidesPublicRequest(`/api/hero-slides/${slideId}/media`, "GET");
}
