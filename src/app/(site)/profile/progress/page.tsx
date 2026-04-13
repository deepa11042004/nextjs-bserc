"use client";

import { useEffect, useState } from "react";
import { BarChart3, Loader2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyProgress } from "@/services/userDashboard";
import type { ProgressResponse, ProgressTimelineItem } from "@/types/userDashboard";

function getStatusClass(status: ProgressTimelineItem["status"]): string {
  if (status === "completed") {
    return "text-emerald-200 bg-emerald-500/20";
  }

  if (status === "ongoing") {
    return "text-cyan-100 bg-cyan-500/20";
  }

  return "text-slate-200 bg-slate-700/70";
}

export default function ProgressPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProgressResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProgress = async () => {
      setIsLoading(true);

      try {
        const payload = await getMyProgress();

        if (!isMounted) {
          return;
        }

        setData(payload);
        setErrorMessage(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message = error instanceof Error
          ? error.message
          : "Unable to load progress right now.";

        setErrorMessage(message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadProgress();

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
          <CardTitle className="text-white">Progress Tracker</CardTitle>
          <CardDescription className="text-slate-300">
            Measure your workshop completion and keep your learning momentum high.
          </CardDescription>
        </CardHeader>
      </Card>

      {errorMessage ? (
        <Card className="border-rose-500/40 bg-rose-950/20">
          <CardContent className="py-3 text-sm text-rose-200">{errorMessage}</CardContent>
        </Card>
      ) : null}

      {!data ? (
        <Card className="border-slate-800 bg-slate-900/70">
          <CardContent className="space-y-3 py-8 text-center">
            <BarChart3 className="mx-auto h-7 w-7 text-cyan-300" />
            <p className="text-slate-200">No progress data available yet.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="border-slate-800 bg-slate-900/70">
              <CardContent className="py-4">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Average Progress</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {data.summary.average_progress}%
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900/70">
              <CardContent className="py-4">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Completed</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-200">
                  {data.summary.completed}
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900/70">
              <CardContent className="py-4">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Ongoing</p>
                <p className="mt-2 text-2xl font-semibold text-cyan-100">
                  {data.summary.ongoing}
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900/70">
              <CardContent className="py-4">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Not Started</p>
                <p className="mt-2 text-2xl font-semibold text-slate-200">
                  {data.summary.not_started}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-white">Workshop Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.timeline.map((item) => (
                <div
                  key={item.workshop_id}
                  className="rounded-lg border border-slate-700/80 bg-slate-900/80 p-3"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-white">{item.workshop_title}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusClass(item.status)}`}>
                      {item.status.replace("-", " ")}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                      style={{ width: `${item.progress_percent}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-300">
                    {item.progress_percent}% complete • {item.modules_completed}/{item.modules_total} modules
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
