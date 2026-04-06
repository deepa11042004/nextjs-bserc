"use client";

import { useEffect, useState } from "react";
import { Briefcase, Building2, Clock3, Loader2, Sparkles, Users } from "lucide-react";
import type { MentorProfile } from "@/types/mentor";

type MentorApiPayload = {
  mentors?: unknown;
  message?: string;
  error?: string;
};

function getApiMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const record = payload as Record<string, unknown>;

  if (typeof record.message === "string" && record.message.trim()) {
    return record.message;
  }

  if (typeof record.error === "string" && record.error.trim()) {
    return record.error;
  }

  return null;
}

function toMentorList(payload: unknown): MentorProfile[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const record = payload as MentorApiPayload;

  if (!Array.isArray(record.mentors)) {
    return [];
  }

  return record.mentors.filter(
    (mentor): mentor is MentorProfile =>
      Boolean(mentor) &&
      typeof mentor === "object" &&
      Number.isInteger(Number((mentor as MentorProfile).id)),
  );
}

function getInitial(name: string): string {
  const letter = name.trim().charAt(0).toUpperCase();
  return letter || "M";
}

export default function MentorshipPage() {
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMentors = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/mentor/list", {
          method: "GET",
          cache: "no-store",
        });

        const payload = (await response.json().catch(() => ({}))) as unknown;

        if (!response.ok) {
          throw new Error(getApiMessage(payload) || "Unable to fetch mentors.");
        }

        if (!isMounted) {
          return;
        }

        setMentors(toMentorList(payload));
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setMentors([]);
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to fetch mentors.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMentors();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-zinc-100 px-4 py-12 sm:px-6">
      <section className="mx-auto w-full max-w-7xl">
        <div className="mb-8 border-b border-zinc-800 pb-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">
            <Users className="h-3.5 w-3.5 text-cyan-400" />
            Mentorship
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Active Mentor Network
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400 sm:text-base">
            Connect with active mentors and domain experts across aerospace,
            defence, AI, robotics, and innovation tracks.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-rose-500/40 bg-rose-950/30 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex h-52 items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-zinc-400" />
          </div>
        ) : mentors.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-6 py-10 text-center text-zinc-400">
            No active mentors available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {mentors.map((mentor) => (
              <article
                key={mentor.id}
                className="group relative overflow-hidden rounded-2xl border border-zinc-700/70 bg-zinc-900/70 p-5 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-cyan-900/30"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(6,182,212,0.20),transparent_55%),radial-gradient(120%_120%_at_0%_100%,rgba(249,115,22,0.14),transparent_55%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      {mentor.has_profile_photo ? (
                        <img
                          src={`/api/mentor/${mentor.id}/profile-photo`}
                          alt={`${mentor.full_name} profile photo`}
                          className="h-14 w-14 rounded-full border-2 border-cyan-400/40 object-cover bg-zinc-800 shadow-md shadow-cyan-950/40"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-cyan-400/40 bg-zinc-800 text-base font-semibold text-zinc-200 shadow-md shadow-cyan-950/30">
                          {getInitial(mentor.full_name)}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold tracking-wide text-white">
                          {mentor.full_name}
                        </h2>
                        <p className="truncate text-xs text-zinc-300/80">{mentor.email}</p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                      Active
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="flex items-start gap-2 text-zinc-200">
                      <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                      <span className="line-clamp-2">{mentor.current_position || "Role not specified"}</span>
                    </p>

                    <p className="flex items-start gap-2 text-zinc-300">
                      <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" />
                      <span className="line-clamp-2">{mentor.organization || "Organization not specified"}</span>
                    </p>

                    <p className="flex items-start gap-2 text-zinc-300">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                      <span className="line-clamp-2">{mentor.primary_track || "Track not specified"}</span>
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="rounded-lg border border-zinc-700/80 bg-zinc-950/70 px-3 py-2 text-xs text-zinc-300">
                      <span className="block text-[10px] uppercase tracking-wider text-zinc-500">Experience</span>
                      <span className="font-semibold text-zinc-100">
                        {mentor.years_experience === null
                          ? "Not specified"
                          : `${mentor.years_experience} years`}
                      </span>
                    </div>

                    <div className="rounded-lg border border-zinc-700/80 bg-zinc-950/70 px-3 py-2 text-xs text-zinc-300">
                      <span className="mb-0.5 flex items-center gap-1 text-[10px] uppercase tracking-wider text-zinc-500">
                        <Clock3 className="h-3 w-3" /> Availability
                      </span>
                      <span className="font-semibold text-zinc-100 line-clamp-1">
                        {mentor.availability || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
