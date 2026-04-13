"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, Heart, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addToWishlist, getMyWorkshops } from "@/services/userDashboard";
import type { RecommendedWorkshop, WorkshopSummary } from "@/types/userDashboard";

function formatDate(value: string | null): string {
  if (!value) {
    return "Date will be shared soon";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Date will be shared soon";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusStyle(status: WorkshopSummary["status"]): string {
  if (status === "completed") {
    return "bg-emerald-500/20 text-emerald-200";
  }

  if (status === "ongoing") {
    return "bg-cyan-500/20 text-cyan-100";
  }

  return "bg-slate-700/60 text-slate-200";
}

export default function MyWorkshopsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [workshops, setWorkshops] = useState<WorkshopSummary[]>([]);
  const [recommended, setRecommended] = useState<RecommendedWorkshop[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadWorkshops = async () => {
      setIsLoading(true);

      try {
        const response = await getMyWorkshops();

        if (!isMounted) {
          return;
        }

        setWorkshops(response.data);
        setRecommended(response.recommended);
        setErrorMessage(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message = error instanceof Error
          ? error.message
          : "Unable to load your workshops right now.";

        setErrorMessage(message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadWorkshops();

    return () => {
      isMounted = false;
    };
  }, []);

  const saveRecommendedToWishlist = async (workshopId: number) => {
    setSavingId(workshopId);

    try {
      await addToWishlist(workshopId);
      setRecommended((prev) => prev.filter((item) => item.id !== workshopId));
    } catch {
      setErrorMessage("Could not add this workshop to wishlist.");
    } finally {
      setSavingId(null);
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
          <CardTitle className="text-white">My Workshops</CardTitle>
          <CardDescription className="text-slate-300">
            Continue learning, monitor completion, and jump back into your enrolled sessions.
          </CardDescription>
        </CardHeader>
      </Card>

      {errorMessage ? (
        <Card className="border-rose-500/40 bg-rose-950/20">
          <CardContent className="py-3 text-sm text-rose-200">{errorMessage}</CardContent>
        </Card>
      ) : null}

      {workshops.length === 0 ? (
        <Card className="border-slate-800 bg-slate-900/70">
          <CardContent className="space-y-3 py-8 text-center">
            <BookOpen className="mx-auto h-7 w-7 text-cyan-300" />
            <p className="text-slate-200">You are not enrolled in any workshop yet.</p>
            <Link href="/all-programs">
              <Button className="bg-cyan-600 text-white hover:bg-cyan-500">
                Browse Programs
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {workshops.map((workshop) => (
            <Card key={workshop.workshop_id} className="border-slate-800 bg-slate-900/70">
              <CardContent className="space-y-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-white">{workshop.workshop_title}</p>
                    <p className="text-sm text-slate-300">Enrolled on {formatDate(workshop.enrolled_at)}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(workshop.status)}`}
                  >
                    {workshop.status.replace("-", " ")}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                      style={{ width: `${workshop.progress_percent}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-300">
                    {workshop.progress_percent}% complete • {workshop.modules_completed}/{workshop.modules_total} modules
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link href={workshop.continue_url}>
                    <Button className="bg-cyan-600 text-white hover:bg-cyan-500">
                      Continue Workshop
                    </Button>
                  </Link>

                  {workshop.certificate_url ? (
                    <a href={workshop.certificate_url} target="_blank" rel="noreferrer">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                      >
                        View Certificate
                      </Button>
                    </a>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {recommended.length > 0 ? (
        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="text-white">Recommended Workshops</CardTitle>
            <CardDescription className="text-slate-300">
              Recently added programs that match your learning activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommended.map((workshop) => (
              <div
                key={workshop.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-700/70 bg-slate-900 px-3 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">{workshop.title}</p>
                  <p className="text-xs text-slate-300">{formatDate(workshop.workshop_date)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={workshop.enroll_url}>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                    >
                      Explore
                    </Button>
                  </Link>
                  <Button
                    type="button"
                    className="bg-rose-600/20 text-rose-100 hover:bg-rose-600/30"
                    disabled={savingId === workshop.id}
                    onClick={() => saveRecommendedToWishlist(workshop.id)}
                  >
                    {savingId === workshop.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Heart className="mr-2 h-4 w-4" />
                    )}
                    Save
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
