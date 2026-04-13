import type {
  AttendanceItem,
  AttendanceResponse,
  CertificateItem,
  DashboardApiEnvelope,
  DownloadItem,
  ProgressResponse,
  UserDashboardProfile,
  UserDashboardSettings,
  WishlistItem,
  WorkshopResponse,
} from "@/types/userDashboard";

export class UserDashboardApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "UserDashboardApiError";
    this.status = status;
    this.details = details;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

type ApiEnvelopeWithMeta<T> = DashboardApiEnvelope<T> & {
  meta?: {
    total?: number;
  };
  recommended?: WorkshopResponse["recommended"];
  summary?: AttendanceResponse["summary"];
};

async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      success: false,
      message: text,
    };
  }
}

async function dashboardRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiEnvelopeWithMeta<T>> {
  const response = await fetch(path, {
    method: options.method ?? "GET",
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const payload = (await parseResponseBody(response)) as ApiEnvelopeWithMeta<T>;

  if (!response.ok || !payload.success) {
    throw new UserDashboardApiError(
      payload.message || `Request failed with status ${response.status}`,
      response.status,
      payload,
    );
  }

  return payload;
}

export type UpdateProfilePayload = {
  full_name: string;
  email: string;
  phone?: string;
  city?: string;
  institution?: string;
  interests?: string;
  bio?: string;
  profile_picture_url?: string;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateSettingsPayload = {
  notification_email: boolean;
  notification_workshop_updates: boolean;
  notification_marketing: boolean;
};

export async function getDashboardProfile() {
  const payload = await dashboardRequest<UserDashboardProfile>("/api/user-dashboard/profile");
  return payload.data;
}

export async function updateDashboardProfile(body: UpdateProfilePayload) {
  const payload = await dashboardRequest<UserDashboardProfile>("/api/user-dashboard/profile", {
    method: "PUT",
    body,
  });

  return payload.data;
}

export async function changeDashboardPassword(body: ChangePasswordPayload) {
  const payload = await dashboardRequest<Record<string, unknown>>(
    "/api/user-dashboard/change-password",
    {
      method: "POST",
      body,
    },
  );

  return payload;
}

export async function getMyWorkshops() {
  const payload = await dashboardRequest<WorkshopResponse["data"]>("/api/user-dashboard/workshops");

  return {
    data: payload.data,
    recommended: payload.recommended || [],
    total: payload.meta?.total ?? payload.data.length,
  };
}

export async function getMyCertificates() {
  const payload = await dashboardRequest<CertificateItem[]>("/api/user-dashboard/certificates");

  return {
    data: payload.data,
    total: payload.meta?.total ?? payload.data.length,
  };
}

export async function getMyWishlist() {
  const payload = await dashboardRequest<WishlistItem[]>("/api/user-dashboard/wishlist");

  return {
    data: payload.data,
    total: payload.meta?.total ?? payload.data.length,
  };
}

export function addToWishlist(workshopId: number) {
  return dashboardRequest<{ workshop_id: number }>("/api/user-dashboard/wishlist", {
    method: "POST",
    body: {
      workshop_id: workshopId,
    },
  });
}

export function removeFromWishlist(workshopId: number) {
  return dashboardRequest<Record<string, unknown>>(
    `/api/user-dashboard/wishlist/${workshopId}`,
    {
      method: "DELETE",
    },
  );
}

export async function getMyProgress() {
  const payload = await dashboardRequest<ProgressResponse>("/api/user-dashboard/progress");
  return payload.data;
}

export async function getMyAttendance() {
  const payload = await dashboardRequest<AttendanceItem[]>("/api/user-dashboard/attendance");

  const attendedCount = payload.data.filter((item) => item.is_attended).length;
  const totalCount = payload.data.length;

  return {
    data: payload.data,
    summary: payload.summary || {
      total_sessions: totalCount,
      attended: attendedCount,
      attendance_percent: totalCount ? Math.round((attendedCount / totalCount) * 100) : 0,
    },
  };
}

export async function getMyDownloads() {
  const payload = await dashboardRequest<DownloadItem[]>("/api/user-dashboard/downloads");

  return {
    data: payload.data,
    total: payload.meta?.total ?? payload.data.length,
  };
}

export async function getDashboardSettings() {
  const payload = await dashboardRequest<UserDashboardSettings>("/api/user-dashboard/settings");
  return payload.data;
}

export async function updateDashboardSettings(body: UpdateSettingsPayload) {
  const payload = await dashboardRequest<UserDashboardSettings>("/api/user-dashboard/settings", {
    method: "PUT",
    body,
  });

  return payload.data;
}
