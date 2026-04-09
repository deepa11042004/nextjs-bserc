"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Loader2, NotebookPen } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type InstitutionalApplication = {
  id: number;
  institute_name: string;
  board: string;
  city: string;
  state: string;
  pin_code: string | null;
  contact_name: string;
  designation: string;
  email: string;
  phone: string;
  student_count: string;
  head_name: string;
  head_email: string;
  head_phone: string | null;
  message: string | null;
  created_at: string | null;
};

function getApiMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const typedPayload = payload as { message?: unknown; error?: unknown };

  if (typeof typedPayload.message === "string" && typedPayload.message.trim()) {
    return typedPayload.message.trim();
  }

  if (typeof typedPayload.error === "string" && typedPayload.error.trim()) {
    return typedPayload.error.trim();
  }

  return "";
}

function toText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toNullableText(value: unknown): string | null {
  const cleaned = toText(value);
  return cleaned || null;
}

function toNumberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function toPositiveInt(value: unknown): number {
  const numeric = toNumberOrNull(value);
  if (numeric === null || !Number.isInteger(numeric) || numeric < 0) {
    return 0;
  }

  return numeric;
}

function formatDate(value: string | null): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function formatTime(value: string | null): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function mapApplication(record: Record<string, unknown>): InstitutionalApplication {
  return {
    id: toPositiveInt(record.id),
    institute_name: toText(record.institute_name),
    board: toText(record.board),
    city: toText(record.city),
    state: toText(record.state),
    pin_code: toNullableText(record.pin_code),
    contact_name: toText(record.contact_name),
    designation: toText(record.designation),
    email: toText(record.email),
    phone: toText(record.phone),
    student_count: toText(record.student_count),
    head_name: toText(record.head_name),
    head_email: toText(record.head_email),
    head_phone: toNullableText(record.head_phone),
    message: toNullableText(record.message),
    created_at: toNullableText(record.created_at),
  };
}

function extractApplications(payload: unknown): InstitutionalApplication[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const root = payload as Record<string, unknown>;
  if (!Array.isArray(root.data)) {
    return [];
  }

  return root.data
    .filter(
      (item): item is Record<string, unknown> =>
        Boolean(item) && typeof item === "object" && !Array.isArray(item),
    )
    .map(mapApplication);
}

export default function InstitutionalApplications() {
  const [applications, setApplications] = useState<InstitutionalApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadApplications = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/institutional-registration", {
          method: "GET",
          cache: "no-store",
        });

        const payload = (await response.json().catch(() => ({}))) as unknown;

        if (!response.ok) {
          throw new Error(
            getApiMessage(payload)
              || "Unable to fetch institutional applications.",
          );
        }

        if (!isMounted) {
          return;
        }

        setApplications(extractApplications(payload));
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setApplications([]);
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to fetch institutional applications.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadApplications();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalApplications = useMemo(() => applications.length, [applications]);

  return (
    <div className="min-h-screen container mx-auto max-w-8xl text-zinc-100">
      <div className="flex flex-col gap-4 pt-3 pb-5 mb-6 border-b border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Institutional Applications
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Applications submitted through institutional registration form.
          </p>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-zinc-100 text-lg flex items-center gap-2">
              <NotebookPen className="h-4 w-4 text-blue-400" />
              Application List
            </CardTitle>
            <span className="text-sm text-zinc-400">Total: {totalApplications}</span>
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
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800">
                    <TableHead className="text-white min-w-[280px]">Institute</TableHead>
                    <TableHead className="text-white min-w-[260px]">Primary Contact</TableHead>
                    <TableHead className="text-white min-w-[260px]">Institution Head</TableHead>
                    <TableHead className="text-white min-w-[170px]">Students</TableHead>
                    <TableHead className="text-white min-w-[160px]">Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.length === 0 ? (
                    <TableRow className="border-zinc-800">
                      <TableCell colSpan={5} className="text-center text-zinc-400 py-8">
                        No institutional applications found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    applications.map((application) => (
                      <TableRow
                        key={`${application.id}-${application.email}`}
                        className="border-zinc-800"
                      >
                        <TableCell className="align-top">
                          <div className="flex flex-col text-zinc-300 text-sm">
                            <span className="text-zinc-100 font-medium">
                              {application.institute_name || "-"}
                            </span>
                            <span>{application.board || "-"}</span>
                            <span className="text-zinc-500">
                              {application.city || "-"}, {application.state || "-"}
                            </span>
                            <span className="text-zinc-500">
                              PIN: {application.pin_code || "-"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="flex flex-col text-zinc-300 text-sm">
                            <span className="text-zinc-100 font-medium">{application.contact_name || "-"}</span>
                            <span>{application.designation || "-"}</span>
                            <span className="text-zinc-500">{application.email || "-"}</span>
                            <span className="text-zinc-500">{application.phone || "-"}</span>
                          </div>
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="flex flex-col text-zinc-300 text-sm">
                            <span className="text-zinc-100 font-medium">{application.head_name || "-"}</span>
                            <span className="text-zinc-500">{application.head_email || "-"}</span>
                            <span className="text-zinc-500">{application.head_phone || "-"}</span>
                          </div>
                        </TableCell>
                        <TableCell className="align-top text-zinc-300 text-sm">
                          {application.student_count || "-"}
                        </TableCell>
                        <TableCell className="text-zinc-400 align-top">
                          <div className="flex flex-col text-sm">
                            <span>{formatDate(application.created_at)}</span>
                            <span className="text-zinc-500">{formatTime(application.created_at)}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
