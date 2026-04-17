export type HeroMediaType = "image" | "video";

export type HeroSlide = {
  id: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  badge_text: string | null;
  media_type: HeroMediaType;
  media_mime_type: string | null;
  media_url: string;
  cta_text: string | null;
  cta_link: string | null;
  secondary_cta_text: string | null;
  secondary_cta_link: string | null;
  is_active?: boolean;
  position: number;
  created_at?: string | null;
  updated_at?: string | null;
};
