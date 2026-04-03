export type MentorStatus = "pending" | "active" | string;

export interface MentorProfile {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  dob: string | null;
  current_position: string | null;
  organization: string | null;
  years_experience: number | null;
  professional_bio: string | null;
  primary_track: string | null;
  secondary_skills: string | null;
  key_competencies: string | null;
  availability: string | null;
  status: MentorStatus;
  has_resume: boolean;
  has_profile_photo: boolean;
  created_at: string | null;
}

export interface MentorCollectionResponse {
  mentors?: MentorProfile[];
  message?: string;
  error?: string;
}
