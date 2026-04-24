"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Loader2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyAttendance } from "@/services/userDashboard";
import type { AttendanceItem, AttendanceSummary } from "@/types/userDashboard";

function formatDate(value: string | null): string {
  if (!value) {
    return "Schedule pending";
  }

  const normalizedValue = String(value).includes('T') ? String(value) : String(value).replace(' ', 'T');
  const utcValue = normalizedValue.endsWith('Z') ? normalizedValue : `${normalizedValue}Z`;
  const parsed = new Date(utcValue);
  if (Number.isNaN(parsed.getTime())) {
    return "Schedule pending";
  }

  return parsed.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit", hour12: true });
}

export default function AttendancePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<AttendanceItem[]>([]);
  const [summary, setSummary] = useState<AttendanceSummary | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAttendance = async () => {
      setIsLoading(true);

      try {
        const response = await getMyAttendance();

        if (!isMounted) {
          return;
        }

        setItems(response.data);
        setSummary(response.summary);
        setErrorMessage(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message = error instanceof Error
          ? error.message
          : "Unable to load attendance right now.";

        setErrorMessage(message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadAttendance();

    return () => {
      isMounted = false;
    };
  }, []);

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
          <CardTitle className="text-white">Attendance & Sessions</CardTitle>
          <CardDescription className="text-slate-300">
            Review your session presence and quickly jump to workshop meetings.
          </CardDescription>
        </CardHeader>
      </Card>

      {errorMessage ? (
        <Card className="border-rose-500/40 bg-rose-950/20">
          <CardContent className="py-3 text-sm text-rose-200">{errorMessage}</CardContent>
        </Card>
      ) : null}

      {summary ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-slate-800 bg-slate-900/70">
            <CardContent className="py-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Total Sessions</p>
              <p className="mt-2 text-2xl font-semibold text-white">{summary.total_sessions}</p>
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/70">
            <CardContent className="py-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Attended</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-200">{summary.attended}</p>
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/70">
            <CardContent className="py-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Attendance Rate</p>
              <p className="mt-2 text-2xl font-semibold text-cyan-100">
                {summary.attendance_percent}%
              </p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {items.length === 0 ? (
        <Card className="border-slate-800 bg-slate-900/70">
          <CardContent className="space-y-3 py-8 text-center">
            <CalendarDays className="mx-auto h-7 w-7 text-cyan-300" />
            <p className="text-slate-200">No sessions available yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-slate-800 bg-slate-900/70">
          <CardContent className="space-y-3 py-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-slate-700/80 bg-slate-900/80 p-3"
              >
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{item.session_title}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      item.is_attended
                        ? "bg-emerald-500/20 text-emerald-200"
                        : "bg-slate-700/70 text-slate-200"
                    }`}
                  >
                    {item.is_attended ? "Attended" : "Pending"}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{item.workshop_title}</p>
                <p className="mt-1 text-xs text-slate-400">{formatDate(item.session_date)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
