"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Loader2, Pencil, Save, ShieldCheck } from "lucide-react";

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
  updateDashboardProfile,
  type UpdateProfilePayload,
} from "@/services/userDashboard";

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

type EditableProfileField = keyof ProfileFormState;

type FeedbackStatus = {
  type: "success" | "error";
  message: string;
};

const PROFILE_FIELDS: EditableProfileField[] = [
  "full_name",
  "email",
  "phone",
  "city",
  "institution",
  "bio",
  "profile_picture_url",
];

const INITIAL_EDITING_STATE: Record<EditableProfileField, boolean> = {
  full_name: false,
  email: false,
  phone: false,
  city: false,
  institution: false,
  bio: false,
  profile_picture_url: false,
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

function resolveProfileForm(
  draft: ProfileFormState,
  saved: ProfileFormState,
  editingFields: Record<EditableProfileField, boolean>,
): ProfileFormState {
  return PROFILE_FIELDS.reduce((accumulator, field) => {
    accumulator[field] = editingFields[field] ? draft[field] : saved[field];
    return accumulator;
  }, {} as ProfileFormState);
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
  const [editingFields, setEditingFields] = useState<Record<EditableProfileField, boolean>>(
    () => ({ ...INITIAL_EDITING_STATE }),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordState>(EMPTY_PASSWORD);
  const [status, setStatus] = useState<FeedbackStatus | null>(null);
  const [passwordStatus, setPasswordStatus] = useState<FeedbackStatus | null>(null);
  const [toast, setToast] = useState<FeedbackStatus | null>(null);

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

        setForm(EMPTY_FORM);
        setInitialForm(nextForm);
        setEditingFields({ ...INITIAL_EDITING_STATE });
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

        setForm(EMPTY_FORM);
        setInitialForm(fallbackForm);
        setEditingFields({ ...INITIAL_EDITING_STATE });
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
    if (!toast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 2600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toast]);

  const resolvedForm = useMemo(
    () => resolveProfileForm(form, initialForm, editingFields),
    [form, initialForm, editingFields],
  );

  const completion = useMemo(() => computeCompletion(resolvedForm), [resolvedForm]);
  const isDirty = useMemo(
    () => JSON.stringify(resolvedForm) !== JSON.stringify(initialForm),
    [resolvedForm, initialForm],
  );

  const enableFieldEditing = (field: EditableProfileField) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: true,
    }));

    setForm((prev) => ({
      ...prev,
      [field]: prev[field] || initialForm[field],
    }));

    setStatus(null);
  };

  const inputValueFor = (field: EditableProfileField) => (
    editingFields[field] ? form[field] : ""
  );

  const placeholderFor = (field: EditableProfileField, fallback: string) => (
    clean(initialForm[field]) || fallback
  );

  const renderEditButton = (field: EditableProfileField, label: string, className = "top-7") => (
    <button
      type="button"
      className={`absolute right-2 ${className} rounded p-1 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40`}
      onClick={() => enableFieldEditing(field)}
      aria-label={`Edit ${label}`}
      disabled={editingFields[field] || isSaving}
    >
      <Pencil className="h-4 w-4" />
    </button>
  );

  const handleChange = (field: keyof ProfileFormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setStatus(null);
  };

  const handleProfileSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateProfileForm(resolvedForm);
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      setToast({ type: "error", message: validationError });
      return;
    }

    setIsSaving(true);

    try {
      const payload: UpdateProfilePayload = {
        full_name: resolvedForm.full_name.trim(),
        email: resolvedForm.email.trim(),
        phone: resolvedForm.phone?.trim(),
        city: resolvedForm.city?.trim(),
        institution: resolvedForm.institution?.trim(),
        bio: resolvedForm.bio?.trim(),
        profile_picture_url: resolvedForm.profile_picture_url?.trim(),
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

      setForm(EMPTY_FORM);
      setInitialForm(savedForm);
      setEditingFields({ ...INITIAL_EDITING_STATE });
      setStatus({ type: "success", message: "Profile updated successfully." });
      setToast({ type: "success", message: "Profile saved successfully." });

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
      setToast({ type: "error", message });
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
      {toast ? (
        <div
          className={`fixed right-4 top-4 z-[90] rounded-lg border px-4 py-2 text-sm shadow-lg ${
            toast.type === "success"
              ? "border-emerald-500/60 bg-emerald-900/90 text-emerald-100"
              : "border-rose-500/60 bg-rose-900/90 text-rose-100"
          }`}
        >
          {toast.message}
        </div>
      ) : null}

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
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-700/80 bg-slate-900/80 p-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-slate-600 bg-slate-800 text-sm font-semibold text-cyan-100">
                {clean(resolvedForm.profile_picture_url) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resolvedForm.profile_picture_url}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getAvatarLabel(resolvedForm)
                )}
              </div>
              <div className="relative min-w-0 flex-1 space-y-1">
                <p className="text-sm font-medium text-slate-100">Profile Photo</p>
                <input
                  value={inputValueFor("profile_picture_url")}
                  onChange={(event) => handleChange("profile_picture_url", event.target.value)}
                  readOnly={!editingFields.profile_picture_url}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 pr-10 text-sm text-slate-100 outline-none focus:border-cyan-500"
                  placeholder={placeholderFor("profile_picture_url", "https://your-image-link.jpg")}
                />
                {renderEditButton("profile_picture_url", "profile photo URL", "top-[31px]")}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="relative space-y-1">
                <span className="text-xs text-slate-400">Full Name</span>
                <input
                  value={inputValueFor("full_name")}
                  onChange={(event) => handleChange("full_name", event.target.value)}
                  readOnly={!editingFields.full_name}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 pr-10 text-sm text-slate-100 outline-none focus:border-cyan-500"
                  placeholder={placeholderFor("full_name", "Your full name")}
                />
                {renderEditButton("full_name", "full name")}
              </label>

              <label className="relative space-y-1">
                <span className="text-xs text-slate-400">Email</span>
                <input
                  value={inputValueFor("email")}
                  onChange={(event) => handleChange("email", event.target.value)}
                  readOnly={!editingFields.email}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 pr-10 text-sm text-slate-100 outline-none focus:border-cyan-500"
                  placeholder={placeholderFor("email", "name@example.com")}
                />
                {renderEditButton("email", "email")}
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="relative space-y-1">
                <span className="text-xs text-slate-400">Phone</span>
                <input
                  value={inputValueFor("phone")}
                  onChange={(event) => handleChange("phone", event.target.value)}
                  readOnly={!editingFields.phone}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 pr-10 text-sm text-slate-100 outline-none focus:border-cyan-500"
                  placeholder={placeholderFor("phone", "Add your phone number")}
                />
                {renderEditButton("phone", "phone")}
              </label>

              <label className="relative space-y-1">
                <span className="text-xs text-slate-400">City</span>
                <input
                  value={inputValueFor("city")}
                  onChange={(event) => handleChange("city", event.target.value)}
                  readOnly={!editingFields.city}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 pr-10 text-sm text-slate-100 outline-none focus:border-cyan-500"
                  placeholder={placeholderFor("city", "Add your city")}
                />
                {renderEditButton("city", "city")}
              </label>
            </div>

            <label className="relative block space-y-1">
              <span className="text-xs text-slate-400">Institution</span>
              <input
                value={inputValueFor("institution")}
                onChange={(event) => handleChange("institution", event.target.value)}
                readOnly={!editingFields.institution}
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 pr-10 text-sm text-slate-100 outline-none focus:border-cyan-500"
                placeholder={placeholderFor("institution", "Add your institution")}
              />
              {renderEditButton("institution", "institution")}
            </label>

            <label className="relative block space-y-1">
              <span className="text-xs text-slate-400">Bio</span>
              <textarea
                value={inputValueFor("bio")}
                onChange={(event) => handleChange("bio", event.target.value)}
                readOnly={!editingFields.bio}
                placeholder={placeholderFor("bio", "Add a short bio")}
                className="h-24 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 pr-10 text-sm text-slate-100 outline-none focus:border-cyan-500"
              />
              {renderEditButton("bio", "bio")}
              <p className="text-right text-[11px] text-slate-500">{resolvedForm.bio.length}/320</p>
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
                  setForm(EMPTY_FORM);
                  setEditingFields({ ...INITIAL_EDITING_STATE });
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

        <Card className="border-slate-800 bg-slate-900/70">
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
        </Card>
      </div>
    </div>
  );
}
