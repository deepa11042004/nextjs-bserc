export interface UserDashboardProfile {
  id: number;
  full_name: string;
  email: string;
  role: string;
  phone: string | null;
  city: string | null;
  institution: string | null;
  interests: string | null;
  bio: string | null;
  profile_picture_url: string | null;
  settings: {
    notification_email: boolean;
    notification_workshop_updates: boolean;
    notification_marketing: boolean;
  };
  updated_at: string | null;
}

export interface WorkshopSummary {
  workshop_id: number;
  workshop_title: string;
  description: string | null;
  progress_percent: number;
  modules_completed: number;
  modules_total: number;
  status: "not-started" | "ongoing" | "completed";
  payment_status: string | null;
  payment_amount: number | null;
  payment_currency: string | null;
  enrolled_at: string | null;
  last_activity_at: string | null;
  continue_url: string;
  thumbnail_url: string | null;
  certificate_available: boolean;
  certificate_url: string | null;
}

export interface RecommendedWorkshop {
  id: number;
  title: string;
  description: string | null;
  mode: string | null;
  workshop_date: string | null;
  fee: number | null;
  thumbnail_url: string | null;
  enroll_url: string;
}

export interface WorkshopResponse {
  data: WorkshopSummary[];
  recommended: RecommendedWorkshop[];
  meta?: {
    total: number;
  };
}

export interface CertificateItem {
  id: string;
  workshop_id: number;
  workshop_title: string;
  issued_at: string | null;
  preview_url: string;
  download_url: string;
  status: "not-started" | "ongoing" | "completed";
}

export interface WishlistItem {
  id: number;
  workshop_id: number;
  workshop_title: string;
  description: string | null;
  mode: string | null;
  workshop_date: string | null;
  fee: number | null;
  thumbnail_url: string | null;
  created_at: string | null;
  enroll_url: string;
}

export interface ProgressSummary {
  total_workshops: number;
  completed: number;
  ongoing: number;
  not_started: number;
  average_progress: number;
}

export interface ProgressTimelineItem {
  workshop_id: number;
  workshop_title: string;
  progress_percent: number;
  modules_completed: number;
  modules_total: number;
  status: "not-started" | "ongoing" | "completed";
  last_activity_at: string | null;
}

export interface ProgressResponse {
  summary: ProgressSummary;
  timeline: ProgressTimelineItem[];
}

export interface AttendanceItem {
  id: number;
  workshop_id: number;
  workshop_title: string;
  session_title: string;
  session_date: string | null;
  is_attended: boolean;
  meeting_link: string | null;
  recording_url: string | null;
  updated_at: string | null;
}

export interface AttendanceSummary {
  total_sessions: number;
  attended: number;
  attendance_percent: number;
}

export interface AttendanceResponse {
  data: AttendanceItem[];
  summary: AttendanceSummary;
}

export interface DownloadItem {
  id: string;
  workshop_id: number;
  title: string;
  type: string;
  format: string;
  url: string;
  added_at: string | null;
}

export interface UserDashboardSettings {
  notification_email: boolean;
  notification_workshop_updates: boolean;
  notification_marketing: boolean;
  updated_at: string | null;
}

export interface DashboardApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
}
