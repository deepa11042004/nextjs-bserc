import { forwardHeroSlidesPublicRequest } from "@/app/api/hero-slides/_proxy";

export async function GET() {
  return forwardHeroSlidesPublicRequest("/api/hero-slides", "GET");
}
