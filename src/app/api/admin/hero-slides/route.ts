import { forwardAdminHeroSlidesRequest } from "@/app/api/admin/hero-slides/_proxy";

const HERO_SLIDES_ADMIN_ENDPOINT = "/api/admin/hero-slides";

export async function GET(request: Request) {
  return forwardAdminHeroSlidesRequest(request, HERO_SLIDES_ADMIN_ENDPOINT, "GET");
}

export async function POST(request: Request) {
  return forwardAdminHeroSlidesRequest(request, HERO_SLIDES_ADMIN_ENDPOINT, "POST");
}
