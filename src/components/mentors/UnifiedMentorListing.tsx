"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import type { MentorProfile } from "@/types/mentor";

type MentorApiPayload = {
  mentors?: unknown;
  message?: string;
  error?: string;
};

interface UnifiedMentorListingProps {
  badgeLabel?: string;
  title?: string;
  description?: string;
  emptyMessage?: string;
  className?: string;
}

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
      Boolean(mentor)
      && typeof mentor === "object"
      && Number.isInteger(Number((mentor as MentorProfile).id)),
  );
}

function getInitial(name: string): string {
  const letter = name.trim().charAt(0).toUpperCase();
  return letter || "M";
}

function getRole(mentor: MentorProfile): string {
  return mentor.current_position || mentor.organization || "Mentor";
}

function getExpertise(mentor: MentorProfile): string {
  return mentor.primary_track || mentor.key_competencies || "Domain expertise";
}

function getIntro(mentor: MentorProfile): string {
  if (mentor.professional_bio && mentor.professional_bio.trim()) {
    return mentor.professional_bio;
  }

  if (mentor.secondary_skills && mentor.secondary_skills.trim()) {
    return mentor.secondary_skills;
  }

  return "Experienced mentor supporting students through practical guidance and industry insights.";
}

export default function UnifiedMentorListing({
  badgeLabel = "Mentors",
  title = "Active Mentor Network",
  description =
    "Connect with active mentors and domain experts across aerospace, defence, AI, robotics, and innovation tracks.",
  emptyMessage = "No active mentors available right now.",
  className,
}: UnifiedMentorListingProps) {
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
    <section className={className || ""}>
      <div className="mb-8 border-b border-zinc-800 pb-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">
          {badgeLabel}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-400 sm:text-base">
          {description}
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
          {emptyMessage}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mentors.map((mentor) => (
            <article
              key={mentor.id}
              className="rounded-2xl border border-zinc-700/70 bg-zinc-900/70 px-5 py-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-zinc-500"
            >
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-zinc-600/80 bg-zinc-800 shadow-[0_4px_14px_rgba(0,0,0,0.28)]">
                {mentor.has_profile_photo ? (
                  <img
                    src={`/api/mentor/${mentor.id}/profile-photo`}
                    alt={`${mentor.full_name} profile photo`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-zinc-100">
                    {getInitial(mentor.full_name)}
                  </div>
                )}
              </div>

              <h2 className="text-lg font-semibold leading-tight text-white">
                {mentor.full_name}
              </h2>

              <p className="mt-2 text-sm font-medium text-zinc-300">
                {getRole(mentor)}
              </p>

              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-300">
                {getExpertise(mentor)}
              </p>

              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                {getIntro(mentor)}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}