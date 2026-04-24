"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, CalendarDays, Heart, Loader2, Sparkles } from "lucide-react";

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

  const normalizedValue = String(value).includes('T') ? String(value) : String(value).replace(' ', 'T');
  const utcValue = normalizedValue.endsWith('Z') ? normalizedValue : `${normalizedValue}Z`;
  const parsed = new Date(utcValue);
  if (Number.isNaN(parsed.getTime())) {
    return "Date will be shared soon";
  }

  return parsed.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit",
    month: "short",
    year: "numeric", });
}

function formatFee(value: number | null): string {
  if (value === null || Number.isNaN(value)) {
    return "Fee details soon";
  }

  if (value <= 0) {
    return "Free";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
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

  const ongoingWorkshop = useMemo(
    () => workshops.find((workshop) => (
      workshop.status === "ongoing"
      || (workshop.progress_percent > 0 && workshop.progress_percent < 100)
    )) || null,
    [workshops],
  );

  const workshopCards = useMemo(() => {
    if (!ongoingWorkshop) {
      return workshops;
    }

    return workshops.filter((workshop) => workshop.workshop_id !== ongoingWorkshop.workshop_id);
  }, [workshops, ongoingWorkshop]);

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
        <div className="space-y-4">
          {ongoingWorkshop ? (
            <Card className="group overflow-hidden border-slate-800 bg-slate-900/70 transition hover:border-cyan-500/45">
              <div className="relative h-40 border-b border-slate-800 bg-gradient-to-br from-slate-800 to-slate-900">
                {ongoingWorkshop.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ongoingWorkshop.thumbnail_url}
                    alt={ongoingWorkshop.workshop_title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-cyan-900/30 to-slate-900 text-cyan-200">
                    <BookOpen className="h-8 w-8" />
                  </div>
                )}

                <span className="absolute left-3 top-3 rounded-full border border-cyan-500/55 bg-cyan-500/20 px-2.5 py-1 text-[11px] font-medium text-cyan-100 backdrop-blur">
                  Ongoing Workshop
                </span>
              </div>

              <CardContent className="space-y-4 pt-4">
                <div>
                  <p className="line-clamp-1 text-base font-semibold text-white">{ongoingWorkshop.workshop_title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-300">
                    {ongoingWorkshop.description || "Continue your ongoing workshop and complete remaining modules."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-200">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(ongoingWorkshop.enrolled_at)}
                  </span>
                  <span className={`rounded-full px-2.5 py-1 font-medium ${getStatusStyle(ongoingWorkshop.status)}`}>
                    {ongoingWorkshop.status.replace("-", " ")}
                  </span>
                  <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-cyan-100">
                    {ongoingWorkshop.progress_percent}% done
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                      style={{ width: `${ongoingWorkshop.progress_percent}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-300">
                    {ongoingWorkshop.modules_completed}/{ongoingWorkshop.modules_total} modules completed
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link href={ongoingWorkshop.continue_url}>
                    <Button className="bg-cyan-600 text-white hover:bg-cyan-500">
                      Resume Ongoing Workshop
                    </Button>
                  </Link>

                  {ongoingWorkshop.certificate_url ? (
                    <a href={ongoingWorkshop.certificate_url} target="_blank" rel="noreferrer">
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
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {workshopCards.map((workshop) => (
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
        </div>
      )}

      {recommended.length > 0 ? (
        <section className="space-y-3">
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/75 to-cyan-950/40 px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-base font-semibold text-white">
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                  Recommended Workshops
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Recently added programs that match your learning activity.
                </p>
              </div>
              <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100">
                {recommended.length} picks
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {recommended.map((workshop) => (
              <Card
                key={workshop.id}
                className="group overflow-hidden border-slate-800 bg-slate-900/70 transition hover:border-cyan-500/45"
              >
                <div className="relative h-36 border-b border-slate-800 bg-gradient-to-br from-slate-800 to-slate-900">
                  {workshop.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={workshop.thumbnail_url}
                      alt={workshop.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-cyan-900/30 to-slate-900 text-cyan-200">
                      <BookOpen className="h-8 w-8" />
                    </div>
                  )}
                </div>

                <CardContent className="space-y-4 pt-4">
                  <div>
                    <p className="line-clamp-1 text-base font-semibold text-white">{workshop.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-300">
                      {workshop.description || "Explore this curated workshop and grow your skill set."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-200">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(workshop.workshop_date)}
                    </span>
                    {workshop.mode ? (
                      <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-200">
                        {workshop.mode}
                      </span>
                    ) : null}
                    <span className="rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1 text-emerald-200">
                      {formatFee(workshop.fee)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link href={workshop.enroll_url} className="flex-1 sm:flex-none">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                      >
                        Explore
                      </Button>
                    </Link>
                    <Button
                      type="button"
                      className="flex-1 bg-rose-600/20 text-rose-100 hover:bg-rose-600/30 sm:flex-none"
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
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
