"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getDashboardSettings,
  updateDashboardSettings,
  type UpdateSettingsPayload,
} from "@/services/userDashboard";

const DEFAULT_SETTINGS: UpdateSettingsPayload = {
  notification_email: true,
  notification_workshop_updates: true,
  notification_marketing: false,
};

export default function ProfileSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<UpdateSettingsPayload>(DEFAULT_SETTINGS);
  const [initialForm, setInitialForm] = useState<UpdateSettingsPayload>(DEFAULT_SETTINGS);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      setIsLoading(true);

      try {
        const payload = await getDashboardSettings();

        if (!isMounted) {
          return;
        }

        const nextForm: UpdateSettingsPayload = {
          notification_email: payload.notification_email,
          notification_workshop_updates: payload.notification_workshop_updates,
          notification_marketing: payload.notification_marketing,
        };

        setForm(nextForm);
        setInitialForm(nextForm);
        setStatus(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message = error instanceof Error
          ? error.message
          : "Unable to load settings right now.";

        setStatus({ type: "error", message });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(initialForm),
    [form, initialForm],
  );

  const handleToggle = (key: keyof UpdateSettingsPayload) => {
    setForm((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setStatus(null);
  };

  const saveSettings = async () => {
    setIsSaving(true);

    try {
      const updated = await updateDashboardSettings(form);
      const nextForm: UpdateSettingsPayload = {
        notification_email: updated.notification_email,
        notification_workshop_updates: updated.notification_workshop_updates,
        notification_marketing: updated.notification_marketing,
      };

      setForm(nextForm);
      setInitialForm(nextForm);
      setStatus({ type: "success", message: "Settings updated successfully." });
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Could not update settings right now.";

      setStatus({ type: "error", message });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-slate-800 bg-slate-900/70">
        <CardContent className="flex items-center justify-center py-10 text-slate-200">
          <Loader2 className="h-5 w-5 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <Card className="border-slate-800 bg-slate-900/70">
        <CardHeader>
          <CardTitle className="text-white">Settings</CardTitle>
          <CardDescription className="text-slate-300">
            Control how you receive workshop updates, reminders, and announcements.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border-slate-800 bg-slate-900/70">
        <CardContent className="space-y-4 py-4">
          {status ? (
            <div
              className={`rounded-md border px-3 py-2 text-sm ${
                status.type === "success"
                  ? "border-emerald-500/40 bg-emerald-900/20 text-emerald-200"
                  : "border-rose-500/40 bg-rose-900/20 text-rose-200"
              }`}
            >
              {status.message}
            </div>
          ) : null}

          <label className="flex items-center justify-between gap-3 rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-3">
            <div>
              <p className="text-sm font-medium text-white">Email Notifications</p>
              <p className="text-xs text-slate-300">Receive reminders and confirmations by email.</p>
            </div>
            <input
              type="checkbox"
              checked={form.notification_email}
              onChange={() => handleToggle("notification_email")}
              className="h-4 w-4 accent-cyan-500"
            />
          </label>

          <label className="flex items-center justify-between gap-3 rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-3">
            <div>
              <p className="text-sm font-medium text-white">Workshop Update Alerts</p>
              <p className="text-xs text-slate-300">Get updates for schedules, sessions, and resources.</p>
            </div>
            <input
              type="checkbox"
              checked={form.notification_workshop_updates}
              onChange={() => handleToggle("notification_workshop_updates")}
              className="h-4 w-4 accent-cyan-500"
            />
          </label>

          <label className="flex items-center justify-between gap-3 rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-3">
            <div>
              <p className="text-sm font-medium text-white">Marketing Announcements</p>
              <p className="text-xs text-slate-300">Get occasional updates about new programs and offers.</p>
            </div>
            <input
              type="checkbox"
              checked={form.notification_marketing}
              onChange={() => handleToggle("notification_marketing")}
              className="h-4 w-4 accent-cyan-500"
            />
          </label>

          <Button
            type="button"
            className="bg-cyan-600 text-white hover:bg-cyan-500"
            disabled={!isDirty || isSaving}
            onClick={saveSettings}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
