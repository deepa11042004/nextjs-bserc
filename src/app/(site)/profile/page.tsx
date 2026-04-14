"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { BookOpen, Loader2, Save, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { normalizeUser } from "@/lib/auth";
import {
  changeDashboardPassword,
  getDashboardProfile,
  getMyWorkshops,
  updateDashboardProfile,
  type UpdateProfilePayload,
} from "@/services/userDashboard";
import type { WorkshopSummary } from "@/types/userDashboard";

type ProfileFormState = {
  full_name: string;
  email: string;
  phone: string;
  city: string;
  institution: string;
  bio: string;
  profile_picture_url: string;
};

type PasswordState = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const EMPTY_FORM: ProfileFormState = {
  full_name: "",
  email: "",
  phone: "",
  city: "",
  institution: "",
  bio: "",
  profile_picture_url: "",
};

const EMPTY_PASSWORD: PasswordState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validateProfileForm(form: ProfileFormState): string {
  if (form.full_name.trim().length < 2) {
    return "Please enter your full name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    return "Please enter a valid email address.";
  }

  if (form.phone?.trim() && !/^[0-9+\-()\s]{8,16}$/.test(form.phone.trim())) {
    return "Please enter a valid phone number.";
  }

  if ((form.bio || "").length > 320) {
    return "Bio must be 320 characters or fewer.";
  }

  return "";
}

function computeCompletion(form: ProfileFormState): number {
  const checks = [
    Boolean(clean(form.full_name)),
    Boolean(clean(form.email)),
    Boolean(clean(form.phone)),
    Boolean(clean(form.city)),
    Boolean(clean(form.institution)),
    Boolean(clean(form.profile_picture_url)),
  ];

  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
}

function getAvatarLabel(form: ProfileFormState): string {
  const source = clean(form.full_name) || clean(form.email) || "U";
  const parts = source
    .split(/\s+/)
    .map((piece) => piece.trim())
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0]?.[0] || ""}${parts[1]?.[0] || ""}`.toUpperCase() || "U";
}

export default function UserProfilePage() {
  const { isHydrated, isLoggedIn, role, token, user, login } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState<ProfileFormState>(EMPTY_FORM);
  const [initialForm, setInitialForm] = useState<ProfileFormState>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordState>(EMPTY_PASSWORD);
  const [enrolledWorkshops, setEnrolledWorkshops] = useState<WorkshopSummary[]>([]);
  const [isWorkshopsLoading, setIsWorkshopsLoading] = useState(true);
  const [workshopsError, setWorkshopsError] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [passwordStatus, setPasswordStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const isUserSession = isLoggedIn && role === "user";

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!isUserSession) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadProfile = async () => {
      setIsLoading(true);

      try {
        const profile = await getDashboardProfile();

        if (!isMounted) {
          return;
        }

        const nextForm: ProfileFormState = {
          full_name: clean(profile.full_name),
          email: clean(profile.email),
          phone: clean(profile.phone),
          city: clean(profile.city),
          institution: clean(profile.institution),
          bio: clean(profile.bio),
          profile_picture_url: clean(profile.profile_picture_url),
        };

        setForm(nextForm);
        setInitialForm(nextForm);
        setStatus(null);
      } catch {
        if (!isMounted) {
          return;
        }

        const fallbackForm: ProfileFormState = {
          full_name: clean(user?.full_name) || clean(user?.name),
          email: clean(user?.email),
          phone: clean(user?.phone),
          city: clean(user?.city),
          institution: clean(user?.institution),
          bio: clean(user?.bio),
          profile_picture_url: clean(user?.profile_picture_url),
        };

        setForm(fallbackForm);
        setInitialForm(fallbackForm);
        setStatus({
          type: "error",
          message: "Could not load server profile. Showing local session details.",
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, [isHydrated, isUserSession, user]);

  useEffect(() => {
    if (!isHydrated || !isUserSession) {
      setEnrolledWorkshops([]);
      setWorkshopsError(null);
      setIsWorkshopsLoading(false);
      return;
    }

    let isMounted = true;

    const loadWorkshops = async () => {
      setIsWorkshopsLoading(true);

      try {
        const response = await getMyWorkshops();

        if (!isMounted) {
          return;
        }

        setEnrolledWorkshops(response.data);
        setWorkshopsError(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message = error instanceof Error
          ? error.message
          : "Could not load enrolled workshops.";

        setWorkshopsError(message);
        setEnrolledWorkshops([]);
      } finally {
        if (isMounted) {
          setIsWorkshopsLoading(false);
        }
      }
    };

    void loadWorkshops();

    return () => {
      isMounted = false;
    };
  }, [isHydrated, isUserSession]);

  const completion = useMemo(() => computeCompletion(form), [form]);
  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(initialForm),
    [form, initialForm],
  );
  const ongoingWorkshop = useMemo(
    () => enrolledWorkshops.find((workshop) => workshop.status === "ongoing") || null,
    [enrolledWorkshops],
  );
  const workshopPreviewItems = useMemo(() => {
    if (!ongoingWorkshop) {
      return enrolledWorkshops.slice(0, 3);
    }

    return enrolledWorkshops
      .filter((workshop) => workshop.workshop_id !== ongoingWorkshop.workshop_id)
      .slice(0, 2);
  }, [enrolledWorkshops, ongoingWorkshop]);

  const handleChange = (field: keyof ProfileFormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setStatus(null);
  };

  const handleProfileSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateProfileForm(form);
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    setIsSaving(true);

    try {
      const payload: UpdateProfilePayload = {
        full_name: form.full_name.trim(),
        email: initialForm.email.trim() || form.email.trim(),
        phone: form.phone?.trim(),
        city: form.city?.trim(),
        institution: form.institution?.trim(),
        bio: form.bio?.trim(),
        profile_picture_url: form.profile_picture_url?.trim(),
      };

      const updated = await updateDashboardProfile(payload);

      const savedForm: ProfileFormState = {
        full_name: clean(updated.full_name),
        email: clean(updated.email),
        phone: clean(updated.phone),
        city: clean(updated.city),
        institution: clean(updated.institution),
        bio: clean(updated.bio),
        profile_picture_url: clean(updated.profile_picture_url),
      };

      setForm(savedForm);
      setInitialForm(savedForm);
      setStatus({ type: "success", message: "Profile updated successfully." });

      if (token) {
        const normalized = normalizeUser(
          {
            ...(user || {}),
            full_name: savedForm.full_name,
            name: savedForm.full_name,
            email: savedForm.email,
            phone: savedForm.phone || undefined,
            city: savedForm.city || undefined,
            institution: savedForm.institution || undefined,
            bio: savedForm.bio || undefined,
            profile_picture_url: savedForm.profile_picture_url || undefined,
          },
          user || undefined,
        );

        login(token, "user", normalized, { scope: "user" });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not update profile.";
      setStatus({ type: "error", message });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordForm.newPassword.length < 8) {
      setPasswordStatus({
        type: "error",
        message: "New password must be at least 8 characters.",
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus({ type: "error", message: "Password confirmation does not match." });
      return;
    }

    setIsUpdatingPassword(true);

    try {
      await changeDashboardPassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordForm(EMPTY_PASSWORD);
      setPasswordStatus({ type: "success", message: "Password changed successfully." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not change password.";
      setPasswordStatus({ type: "error", message });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (!isHydrated || !isUserSession) {
    return null;
  }

  if (isLoading) {
    return (
      <Card className="border-slate-800 bg-slate-900/70">
        <CardContent className="flex items-center justify-center py-12 text-slate-200">
          <Loader2 className="h-5 w-5 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <Card className="border-slate-800 bg-slate-900/70">
        <CardHeader>
          <CardTitle className="text-white">My Profile</CardTitle>
          <CardDescription className="text-slate-300">
            Update your identity, contact details, and profile photo used across your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status ? (
            <div
              className={`mb-4 rounded-md border px-3 py-2 text-sm ${
                status.type === "success"
                  ? "border-emerald-500/40 bg-emerald-900/20 text-emerald-200"
                  : "border-rose-500/40 bg-rose-900/20 text-rose-200"
              }`}
            >
              {status.message}
            </div>
          ) : null}

          <form className="space-y-4" onSubmit={handleProfileSave}>
            {/* <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-700/80 bg-slate-900/80 p-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-slate-600 bg-slate-800 text-sm font-semibold text-cyan-100">
                {clean(form.profile_picture_url) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.profile_picture_url}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getAvatarLabel(form)
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-sm font-medium text-slate-100">Profile Photo</p>
                <input
                  value={form.profile_picture_url}
                  onChange={(event) => handleChange("profile_picture_url", event.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
                  placeholder="https://your-image-link.jpg"
                />
              </div>
            </div> */}

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1">
                <span className="text-xs text-slate-400">Full Name</span>
                <input
                  value={form.full_name}
                  onChange={(event) => handleChange("full_name", event.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs text-slate-400">Email</span>
                <input
                  value={form.email}
                  readOnly
                  aria-readonly="true"
                  className="w-full cursor-not-allowed rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-300 outline-none"
                />
                <p className="text-[11px] text-slate-500">Email cannot be changed.</p>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1">
                <span className="text-xs text-slate-400">Phone</span>
                <input
                  value={form.phone}
                  onChange={(event) => handleChange("phone", event.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs text-slate-400">City</span>
                <input
                  value={form.city}
                  onChange={(event) => handleChange("city", event.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
                />
              </label>
            </div>

            <label className="space-y-1 block">
              <span className="text-xs text-slate-400">Institution</span>
              <input
                value={form.institution}
                onChange={(event) => handleChange("institution", event.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
              />
            </label>

            <label className="space-y-1 block">
              <span className="text-xs text-slate-400">Bio</span>
              <textarea
                value={form.bio}
                onChange={(event) => handleChange("bio", event.target.value)}
                className="h-24 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
              />
              <p className="text-right text-[11px] text-slate-500">{form.bio.length}/320</p>
            </label>

            <div className="flex flex-wrap gap-2">
              <Button
                type="submit"
                disabled={!isDirty || isSaving}
                className="bg-emerald-600 text-white hover:bg-emerald-500"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                disabled={!isDirty || isSaving}
                onClick={() => {
                  setForm(initialForm);
                  setStatus(null);
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-white">Password & Security</CardTitle>
            <CardDescription className="text-slate-300">
              Protect your account with a strong password that you update regularly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {passwordStatus ? (
              <div
                className={`mb-4 rounded-md border px-3 py-2 text-sm ${
                  passwordStatus.type === "success"
                    ? "border-emerald-500/40 bg-emerald-900/20 text-emerald-200"
                    : "border-rose-500/40 bg-rose-900/20 text-rose-200"
                }`}
              >
                {passwordStatus.message}
              </div>
            ) : null}

            <form className="space-y-3" onSubmit={handlePasswordChange}>
              <label className="space-y-1 block">
                <span className="text-xs text-slate-400">Current Password</span>
                <input
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={(event) => {
                    setPasswordForm((prev) => ({ ...prev, oldPassword: event.target.value }));
                    setPasswordStatus(null);
                  }}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-xs text-slate-400">New Password</span>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(event) => {
                      setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }));
                      setPasswordStatus(null);
                    }}
                    className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-slate-400">Confirm Password</span>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(event) => {
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmPassword: event.target.value,
                      }));
                      setPasswordStatus(null);
                    }}
                    className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
                  />
                </label>
              </div>

              <Button
                type="submit"
                disabled={isUpdatingPassword}
                className="bg-cyan-600 text-white hover:bg-cyan-500"
              >
                {isUpdatingPassword ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating
                  </>
                ) : (
                  <>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Change Password
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-white">Profile Completion</CardTitle>
            <CardDescription className="text-slate-300">
              Complete your details for faster onboarding, certificate generation, and support.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="text-sm text-slate-200">{completion}% complete</p>
            <p className="text-xs text-slate-400">
              Tip: add profile photo and institution details to maximize completion.
            </p>
          </CardContent>
        </Card> */}

        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-white">Enrolled Workshops</CardTitle>
              <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 text-xs text-cyan-100">
                {enrolledWorkshops.length}
              </span>
            </div>
            <CardDescription className="text-slate-300">
              Quick view of your active learning programs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isWorkshopsLoading ? (
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading workshops...
              </div>
            ) : workshopsError ? (
              <p className="text-sm text-rose-200">{workshopsError}</p>
            ) : enrolledWorkshops.length === 0 ? (
              <div className="space-y-2 rounded-lg border border-slate-700 bg-slate-900/70 p-3">
                <p className="text-sm text-slate-200">No enrolled workshops yet.</p>
                <Link href="/all-programs" className="inline-block">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Explore Programs
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {ongoingWorkshop ? (
                  <div className="space-y-3 rounded-xl border border-cyan-500/35 bg-gradient-to-br from-cyan-950/40 via-slate-900/90 to-slate-900 px-3 py-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.12em] text-cyan-200">Ongoing Workshop</p>
                        <p className="line-clamp-1 text-sm font-semibold text-white">{ongoingWorkshop.workshop_title}</p>
                      </div>
                      <span className="rounded-full border border-cyan-500/50 bg-cyan-500/15 px-2 py-0.5 text-[11px] text-cyan-100">
                        {ongoingWorkshop.progress_percent}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                        style={{ width: `${ongoingWorkshop.progress_percent}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-300">
                      {ongoingWorkshop.modules_completed}/{ongoingWorkshop.modules_total} modules completed
                    </p>

                    <Link href={ongoingWorkshop.continue_url} className="inline-block">
                      <Button
                        type="button"
                        className="bg-cyan-600 text-white hover:bg-cyan-500"
                      >
                        Continue Ongoing Workshop
                      </Button>
                    </Link>
                  </div>
                ) : null}

                <div className="space-y-2">
                  {workshopPreviewItems.map((workshop) => (
                    <div
                      key={workshop.workshop_id}
                      className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2"
                    >
                      <p className="line-clamp-1 text-sm font-medium text-white">{workshop.workshop_title}</p>
                      <p className="text-xs text-slate-300">
                        {workshop.progress_percent}% complete • {workshop.status.replace("-", " ")}
                      </p>
                    </div>
                  ))}
                </div>
                <Link href="/profile/workshops" className="inline-block">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  >
                    View All Workshops
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
