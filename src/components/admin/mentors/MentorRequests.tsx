"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2, UserCheck, XCircle } from "lucide-react";

import { AdminToast } from "@/components/admin/AdminToast";
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

type ToastVariant = "success" | "error" | "info";

export default function MentorRequests() {
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [approvingMentorIds, setApprovingMentorIds] = useState<number[]>([]);
  const [rejectingMentorIds, setRejectingMentorIds] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVariant, setToastVariant] = useState<ToastVariant>("info");

  useEffect(() => {
    let isMounted = true;

    const loadMentorRequests = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/mentor/requests", {
          method: "GET",
          cache: "no-store",
        });

        const payload = (await response.json().catch(() => ({}))) as unknown;

        if (!response.ok) {
          throw new Error(
            getApiMessage(payload) || "Unable to fetch mentor requests.",
          );
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
            : "Unable to fetch mentor requests.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMentorRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const pendingCount = useMemo(() => mentors.length, [mentors]);

  const handleApprove = async (mentorId: number) => {
    setApprovingMentorIds((prev) =>
      prev.includes(mentorId) ? prev : [...prev, mentorId],
    );

    try {
      const response = await fetch(`/api/mentor/${mentorId}/approve`, {
        method: "PATCH",
        cache: "no-store",
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to approve mentor.");
      }

      setMentors((prev) => prev.filter((mentor) => mentor.id !== mentorId));
      setToastVariant("success");
      setToastMessage("Mentor approved successfully.");
    } catch (err) {
      setToastVariant("error");
      setToastMessage(
        err instanceof Error && err.message
          ? err.message
          : "Unable to approve mentor.",
      );
    } finally {
      setApprovingMentorIds((prev) => prev.filter((id) => id !== mentorId));
    }
  };

  const handleReject = async (mentorId: number) => {
    setRejectingMentorIds((prev) =>
      prev.includes(mentorId) ? prev : [...prev, mentorId],
    );

    try {
      const response = await fetch(`/api/mentor/${mentorId}/reject`, {
        method: "DELETE",
        cache: "no-store",
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to reject mentor.");
      }

      setMentors((prev) => prev.filter((mentor) => mentor.id !== mentorId));
      setToastVariant("success");
      setToastMessage("Mentor rejected and removed successfully.");
    } catch (err) {
      setToastVariant("error");
      setToastMessage(
        err instanceof Error && err.message
          ? err.message
          : "Unable to reject mentor.",
      );
    } finally {
      setRejectingMentorIds((prev) => prev.filter((id) => id !== mentorId));
    }
  };

  const isApproving = (mentorId: number) => approvingMentorIds.includes(mentorId);
  const isRejecting = (mentorId: number) => rejectingMentorIds.includes(mentorId);
  const isActionPending = (mentorId: number) =>
    isApproving(mentorId) || isRejecting(mentorId);

  return (
    <>
      <AdminToast
        open={Boolean(toastMessage)}
        message={toastMessage || ""}
        onClose={() => setToastMessage(null)}
        variant={toastVariant}
      />

      <div className="min-h-screen container mx-auto max-w-8xl text-zinc-100">
        <div className="flex flex-col gap-4 pt-3 pb-5 mb-6 border-b border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Mentor Requests
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Review and approve pending mentor registrations.
            </p>
          </div>

          <Link href="/admin/mentors">
            <Button className="bg-blue-500 border border-blue-700 font-bold text-white hover:bg-blue-700">
              View Mentor List
            </Button>
          </Link>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-zinc-100 text-lg flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-blue-400" />
                Pending Mentors
              </CardTitle>
              <span className="text-sm text-zinc-400">Total: {pendingCount}</span>
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
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Registered</TableHead>
                    <TableHead className="text-right text-white">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mentors.length === 0 ? (
                    <TableRow className="border-zinc-800">
                      <TableCell colSpan={7} className="py-8 text-center text-zinc-500">
                        No pending mentor requests.
                      </TableCell>
                    </TableRow>
                  ) : (
                    mentors.map((mentor) => {
                      return (
                        <TableRow key={mentor.id} className="border-zinc-800">
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-zinc-100 font-medium">{mentor.full_name}</span>
                              <span className="text-zinc-400 text-xs">{mentor.email}</span>
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
                          <TableCell>
                            <Badge className={getStatusBadgeClasses(mentor.status)}>
                              {mentor.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-zinc-300">
                            {formatMentorDate(mentor.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                disabled={isActionPending(mentor.id)}
                                onClick={() => void handleApprove(mentor.id)}
                                className="border border-emerald-700 bg-transparent text-emerald-300 hover:bg-emerald-950/50 hover:text-emerald-200"
                              >
                                {isApproving(mentor.id) ? (
                                  <>
                                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                    Approving...
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                                    Accept
                                  </>
                                )}
                              </Button>

                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                disabled={isActionPending(mentor.id)}
                                onClick={() => void handleReject(mentor.id)}
                                className="border border-rose-700 bg-transparent text-rose-300 hover:bg-rose-950/50 hover:text-rose-200"
                              >
                                {isRejecting(mentor.id) ? (
                                  <>
                                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                    Rejecting...
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="mr-1.5 h-3.5 w-3.5" />
                                    Reject
                                  </>
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
