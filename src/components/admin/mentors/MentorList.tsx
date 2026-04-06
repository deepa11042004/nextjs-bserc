"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Loader2, UsersRound } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
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
import type { MentorProfile } from "@/types/mentor";
import {
  extractMentors,
  formatMentorDate,
  getApiMessage,
  getStatusBadgeClasses,
} from "@/components/admin/mentors/mentorUtils";

export default function MentorList() {
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMentorList = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/mentor/list", {
          method: "GET",
          cache: "no-store",
        });

        const payload = (await response.json().catch(() => ({}))) as unknown;

        if (!response.ok) {
          throw new Error(getApiMessage(payload) || "Unable to fetch mentor list.");
        }

        if (!isMounted) {
          return;
        }

        setMentors(extractMentors(payload));
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setMentors([]);
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to fetch mentor list.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMentorList();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalMentors = useMemo(() => mentors.length, [mentors]);

  return (
    <div className="min-h-screen container mx-auto max-w-8xl text-zinc-100">
      <div className="flex flex-col gap-4 pt-3 pb-5 mb-6 border-b border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Mentor List
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Approved mentors with active status.
          </p>
        </div>

        <Link href="/admin/mentors/requests">
          <Button className="bg-blue-500 border border-blue-700 font-bold text-white hover:bg-blue-700">
            View Mentor Requests
          </Button>
        </Link>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-zinc-100 text-lg flex items-center gap-2">
              <UsersRound className="h-4 w-4 text-blue-400" />
              Active Mentors
            </CardTitle>
            <span className="text-sm text-zinc-400">Total: {totalMentors}</span>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded-md border border-rose-500/40 bg-rose-950/30 px-3 py-2 text-sm text-rose-200">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="text-white">Mentor</TableHead>
                  <TableHead className="text-white">Contact</TableHead>
                  <TableHead className="text-white">Organization</TableHead>
                  <TableHead className="text-white">Track</TableHead>
                  <TableHead className="text-white">Experience</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Registered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentors.length === 0 ? (
                  <TableRow className="border-zinc-800">
                    <TableCell colSpan={7} className="py-8 text-center text-zinc-500">
                      No active mentors found.
                    </TableCell>
                  </TableRow>
                ) : (
                  mentors.map((mentor) => (
                    <TableRow key={mentor.id} className="border-zinc-800">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {mentor.has_profile_photo ? (
                            <img
                              src={`/api/mentor/${mentor.id}/profile-photo`}
                              alt={`${mentor.full_name} profile photo`}
                              className="h-10 w-10 rounded-full border border-zinc-700 object-cover bg-zinc-800"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-zinc-300 text-sm font-semibold">
                              {mentor.full_name.trim().charAt(0).toUpperCase() || "M"}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-zinc-100 font-medium">{mentor.full_name}</span>
                            <span className="text-zinc-400 text-xs">{mentor.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-zinc-300">{mentor.phone || "-"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col text-zinc-300 text-sm">
                          <span>{mentor.organization || "-"}</span>
                          <span className="text-zinc-500">{mentor.current_position || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-zinc-300 text-sm">
                          <span>{mentor.primary_track || "-"}</span>
                          <span className="text-zinc-500">{mentor.availability || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        {mentor.years_experience === null
                          ? "-"
                          : `${mentor.years_experience} years`}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClasses(mentor.status)}>
                          {mentor.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        {formatMentorDate(mentor.created_at)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
