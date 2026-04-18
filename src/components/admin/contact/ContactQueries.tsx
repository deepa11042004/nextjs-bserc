"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock3, Eye, Inbox, Loader2, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ContactQuery = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string;
  is_solved: boolean;
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

function toBoolean(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "yes";
  }

  return false;
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

function mapContactQuery(record: Record<string, unknown>): ContactQuery {
  return {
    id: toPositiveInt(record.id),
    full_name: toText(record.full_name || record.organization_name),
    email: toText(record.email),
    phone: toNullableText(record.phone),
    subject: toText(record.subject || record.subject_name),
    is_solved: toBoolean(record.is_solved),
    created_at: toNullableText(record.created_at),
  };
}

function extractContactQueries(payload: unknown): ContactQuery[] {
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
    .map(mapContactQuery);
}

export default function ContactQueries() {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingQueryId, setDeletingQueryId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadQueries = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/contact-queries", {
          method: "GET",
          cache: "no-store",
        });

        const payload = (await response.json().catch(() => ({}))) as unknown;

        if (!response.ok) {
          throw new Error(getApiMessage(payload) || "Unable to fetch contact queries.");
        }

        if (!isMounted) {
          return;
        }

        setQueries(extractContactQueries(payload));
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setQueries([]);
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to fetch contact queries.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadQueries();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeleteQuery = async (queryId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact query? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setDeletingQueryId(queryId);

    try {
      const response = await fetch(`/api/contact-queries/${queryId}`, {
        method: "DELETE",
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to delete contact query.");
      }

      setQueries((previous) => previous.filter((query) => query.id !== queryId));
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to delete contact query.",
      );
    } finally {
      setDeletingQueryId((currentId) => (currentId === queryId ? null : currentId));
    }
  };

  const totalQueries = useMemo(() => queries.length, [queries]);

  return (
    <div className="min-h-screen container mx-auto max-w-8xl text-zinc-100">
      <div className="flex flex-col gap-4 pt-3 pb-5 mb-6 border-b border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Contact Queries</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Messages submitted through the Contact Us form.
          </p>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-zinc-100 text-lg flex items-center gap-2">
              <Inbox className="h-4 w-4 text-blue-400" />
              Query List
            </CardTitle>
            <span className="text-sm text-zinc-400">Total: {totalQueries}</span>
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
                    <TableHead className="text-white min-w-[220px]">Name</TableHead>
                    <TableHead className="text-white min-w-[160px]">Phone</TableHead>
                    <TableHead className="text-white min-w-[220px]">Subject</TableHead>
                    <TableHead className="text-white min-w-[160px]">Submitted</TableHead>
                    <TableHead className="text-white min-w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queries.length === 0 ? (
                    <TableRow className="border-zinc-800">
                      <TableCell colSpan={5} className="text-center text-zinc-400 py-8">
                        No contact queries found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    queries.map((query) => (
                      <TableRow key={`${query.id}-${query.email}`} className="border-zinc-800">
                        <TableCell className="align-top text-zinc-200 text-sm font-medium">
                          <div className="flex flex-col gap-1">
                            <span>{query.full_name || "-"}</span>
                            <span className="text-zinc-400 text-xs break-words">
                              {query.email || "-"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="align-top text-zinc-300 text-sm">
                          {query.phone || "-"}
                        </TableCell>
                        <TableCell className="align-top text-zinc-300 text-sm">
                          {query.subject || "-"}
                        </TableCell>
                        <TableCell className="text-zinc-400 align-top">
                          <div className="flex flex-col text-sm">
                            <span>{formatDate(query.created_at)}</span>
                            <span className="text-zinc-500">{formatTime(query.created_at)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="align-top text-right">
                          <div className="inline-flex items-center gap-2">
                            <span
                              title={query.is_solved ? "Solved" : "Pending"}
                              aria-label={query.is_solved ? "Solved" : "Pending"}
                              className={`inline-flex items-center justify-center rounded-md border px-2 py-1 ${query.is_solved
                                ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                                : "border-amber-500/50 bg-amber-500/15 text-amber-300"
                                }`}
                            >
                              {query.is_solved ? (
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              ) : (
                                <Clock3 className="h-3.5 w-3.5" />
                              )}
                            </span>
                            <Link
                              href={`/admin/contact-queries/${query.id}`}
                              className="inline-flex items-center gap-1 rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800 transition-colors"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                void handleDeleteQuery(query.id);
                              }}
                              disabled={deletingQueryId === query.id}
                              aria-label={`Delete query ${query.id}`}
                              className="inline-flex items-center justify-center rounded-md bg-rose-600 px-2 py-1 text-white hover:bg-rose-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              {deletingQueryId === query.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                            </button>
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
