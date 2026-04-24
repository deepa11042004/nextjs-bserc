"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Download, Loader2, UserRound } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type MentorDetailsRecord = Record<string, unknown>;

function parseMentorId(rawId: string | string[] | undefined): number | null {
  if (!rawId) {
    return null;
  }

  const value = Array.isArray(rawId) ? rawId[0] : rawId;
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

function toTitleCaseField(fieldName: string): string {
  return fieldName
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatFieldValue(fieldName: string, value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : "-";
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) {
      return "-";
    }

    if (fieldName === "dob" || fieldName.endsWith("_at")) {
      const parsed = new Date(trimmed);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit",
          month: "short",
          year: "numeric",
          hour: fieldName.endsWith("_at") ? "2-digit" : undefined,
          minute: fieldName.endsWith("_at") ? "2-digit" : undefined, hour12: true });
      }
    }

    return trimmed;
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export default function MentorDetailsPage() {
  const params = useParams<{ id: string }>();
  const mentorId = parseMentorId(params?.id);

  const [mentor, setMentor] = useState<MentorDetailsRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMentor = async () => {
      if (!mentorId) {
        setError("Invalid mentor id.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/mentor/${mentorId}`, {
          method: "GET",
          cache: "no-store",
        });

        const payload = (await response.json().catch(() => ({}))) as MentorDetailsRecord;

        if (!response.ok) {
          const message =
            typeof payload.error === "string"
              ? payload.error
              : typeof payload.message === "string"
              ? payload.message
              : "Unable to fetch mentor details.";

          throw new Error(message);
        }

        if (!isMounted) {
          return;
        }

        setMentor(payload);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setMentor(null);
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to fetch mentor details.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMentor();

    return () => {
      isMounted = false;
    };
  }, [mentorId]);

  const mentorName =
    typeof mentor?.full_name === "string" && mentor.full_name.trim()
      ? mentor.full_name.trim()
      : `Mentor ${mentorId || ""}`;

  const hasProfilePhoto = Boolean(mentor?.has_profile_photo);
  const hasResume = Boolean(mentor?.has_resume);

  const mentorFields = useMemo(() => {
    if (!mentor) {
      return [] as Array<[string, unknown]>;
    }

    return Object.entries(mentor)
      .filter(([key]) => key !== "error" && key !== "message")
      .sort((a, b) => a[0].localeCompare(b[0]));
  }, [mentor]);

  return (
    <div className="min-h-screen container mx-auto max-w-7xl text-zinc-100">
      <div className="flex flex-col gap-4 pt-3 pb-5 mb-6 border-b border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Mentor Details</h1>
          <p className="mt-1 text-sm text-zinc-400">{mentorName}</p>
        </div>

        <Link href="/admin/mentors">
          <Button className="bg-blue-500 border border-blue-700 font-bold text-white hover:bg-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Mentor List
          </Button>
        </Link>
      </div>

      <Card className="mb-6 bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100 text-lg flex items-center gap-2">
            <UserRound className="h-4 w-4 text-blue-400" />
            Mentor Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="rounded-md border border-rose-500/40 bg-rose-950/30 px-3 py-2 text-sm text-rose-200">
              {error}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  {hasProfilePhoto && mentorId ? (
                    <img
                      src={`/api/mentor/${mentorId}/profile-photo`}
                      alt={`${mentorName} profile photo`}
                      className="h-16 w-16 rounded-full border border-zinc-700 object-cover bg-zinc-800"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-zinc-300 text-xl font-semibold">
                      {mentorName.trim().charAt(0).toUpperCase() || "M"}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="text-zinc-100 font-semibold text-lg">{mentorName}</span>
                    <span className="text-zinc-400 text-sm">
                      {typeof mentor?.email === "string" && mentor.email.trim() ? mentor.email : "-"}
                    </span>
                  </div>
                </div>

                {hasResume && mentorId ? (
                  <a href={`/api/mentor/${mentorId}/resume`} target="_blank" rel="noreferrer">
                    <Button className="bg-emerald-500 border border-emerald-700 font-bold text-black hover:bg-emerald-400">
                      <Download className="mr-2 h-4 w-4" />
                      View Resume
                    </Button>
                  </a>
                ) : (
                  <span className="text-sm text-zinc-500">Resume not uploaded</span>
                )}
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead className="text-white w-[280px]">Field</TableHead>
                      <TableHead className="text-white">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mentorFields.map(([field, value]) => (
                      <TableRow key={field} className="border-zinc-800 align-top">
                        <TableCell className="text-zinc-300 font-medium">{toTitleCaseField(field)}</TableCell>
                        <TableCell className="text-zinc-200 break-words">{formatFieldValue(field, value)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
