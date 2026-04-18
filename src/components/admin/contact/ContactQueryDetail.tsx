"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Clock3, Loader2, Reply } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ContactQueryDetail = {
    id: number;
    full_name: string;
    email: string;
    subject: string;
    message: string;
    is_solved: boolean;
    solved_at: string | null;
    created_at: string | null;
};

type Props = {
    queryId: string;
};

function toText(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function toNullableText(value: unknown): string | null {
    const text = toText(value);
    return text || null;
}

function toPositiveInt(value: unknown): number {
    if (typeof value === "number" && Number.isInteger(value) && value > 0) {
        return value;
    }

    if (typeof value === "string") {
        const parsed = Number(value);
        if (Number.isInteger(parsed) && parsed > 0) {
            return parsed;
        }
    }

    return 0;
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

function mapContactQuery(record: Record<string, unknown>): ContactQueryDetail {
    return {
        id: toPositiveInt(record.id),
        full_name: toText(record.full_name || record.organization_name),
        email: toText(record.email),
        subject: toText(record.subject || record.subject_name),
        message: toText(record.message),
        is_solved: toBoolean(record.is_solved),
        solved_at: toNullableText(record.solved_at),
        created_at: toNullableText(record.created_at),
    };
}

function extractSingleContactQuery(payload: unknown): ContactQueryDetail | null {
    if (!payload || typeof payload !== "object") {
        return null;
    }

    const root = payload as Record<string, unknown>;
    if (!root.data || typeof root.data !== "object" || Array.isArray(root.data)) {
        return null;
    }

    return mapContactQuery(root.data as Record<string, unknown>);
}

function extractContactQueries(payload: unknown): ContactQueryDetail[] {
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

function formatDate(value: string | null): string {
    if (!value) {
        return "-";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function createMailToHref(email: string, subject: string): string {
    if (!email) {
        return "#";
    }

    const params = new URLSearchParams({
        subject: `Re: ${subject || "Contact Query"}`,
    });

    return `mailto:${email}?${params.toString()}`;
}

export default function ContactQueryDetail({ queryId }: Props) {
    const [query, setQuery] = useState<ContactQueryDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadQuery = async () => {
            setIsLoading(true);
            setError("");

            try {
                const response = await fetch("/api/contact-queries", {
                    method: "GET",
                    cache: "no-store",
                });

                const payload = (await response.json().catch(() => ({}))) as unknown;

                if (!response.ok) {
                    throw new Error("Unable to fetch query details.");
                }

                if (!isMounted) {
                    return;
                }

                const id = Number(queryId);
                const matched =
                    extractContactQueries(payload).find(
                        (item) => item.id === id || String(item.id) === String(queryId),
                    ) || null;

                if (!matched) {
                    setError("Query not found.");
                    setQuery(null);
                    return;
                }

                setQuery(matched);
            } catch (err) {
                if (!isMounted) {
                    return;
                }

                setQuery(null);
                setError(err instanceof Error ? err.message : "Unable to fetch query details.");
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadQuery();

        return () => {
            isMounted = false;
        };
    }, [queryId]);

    const mailToHref = useMemo(
        () => createMailToHref(query?.email || "", query?.subject || ""),
        [query?.email, query?.subject],
    );

    const handleUpdateStatus = async (nextSolvedStatus: boolean) => {
        if (!query || isUpdatingStatus || query.is_solved === nextSolvedStatus) {
            return;
        }

        setError("");
        setIsUpdatingStatus(true);

        const actionPath = nextSolvedStatus ? "solve" : "pending";
        const actionLabel = nextSolvedStatus ? "solved" : "pending";

        try {
            const response = await fetch(`/api/contact-queries/${query.id}/${actionPath}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            const payload = (await response.json().catch(() => ({}))) as unknown;

            if (!response.ok) {
                throw new Error(getApiMessage(payload) || `Unable to mark query as ${actionLabel}.`);
            }

            const updatedQuery = extractSingleContactQuery(payload);

            if (updatedQuery) {
                setQuery(updatedQuery);
            } else {
                setQuery((currentQuery) => (
                    currentQuery
                        ? {
                            ...currentQuery,
                            is_solved: nextSolvedStatus,
                            solved_at: nextSolvedStatus
                                ? (currentQuery.solved_at || new Date().toISOString())
                                : null,
                        }
                        : currentQuery
                ));
            }
        } catch (err) {
            setError(
                err instanceof Error && err.message
                    ? err.message
                    : `Unable to mark query as ${actionLabel}.`,
            );
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    return (
        <div className="min-h-screen container mx-auto max-w-7xl text-zinc-100 py-4">
            <div className="flex flex-col gap-2 mb-4 border-b border-zinc-800 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Contact Query</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-white">
                        Query Details
                    </h1>
                </div>
                <Link
                    href="/admin/contact-queries"
                    className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-950/80 px-3 py-1.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>
            </div>

            <Card className="overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/20 py-0">
                {isLoading ? (
                    <CardContent>
                        <div className="flex h-40 items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                        </div>
                    </CardContent>
                ) : error ? (
                    <CardContent>
                        <div className="rounded-3xl border border-rose-500/40 bg-rose-950/40 px-3 py-2 text-sm text-rose-200">
                            {error}
                        </div>
                    </CardContent>
                ) : query ? (
                    <>
                        <CardHeader className="bg-zinc-900/80 border-b border-zinc-800 px-5 py-2">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Subject</p>
                                    <CardTitle className="text-2xl font-semibold tracking-tight text-white">
                                        {query.subject || "Untitled Query"}
                                    </CardTitle>
                                    <p className="text-sm text-zinc-400 max-w-2xl">
                                        View the full details for this contact query and reply directly using email.
                                    </p>
                                </div>
                                <div className="flex flex-col items-start gap-2 sm:items-end">
                                    <span
                                        className={`inline-flex items-center gap-1 rounded-3xl px-3 py-1.5 text-xs font-medium ring-1 ${query.is_solved
                                            ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40"
                                            : "bg-amber-500/15 text-amber-300 ring-amber-500/40"
                                            }`}
                                    >
                                        {query.is_solved ? (
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                        ) : (
                                            <Clock3 className="h-3.5 w-3.5" />
                                        )}
                                        {query.is_solved ? "Solved" : "Pending"}
                                    </span>
                                    <p className="rounded-3xl bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-zinc-800">
                                        Date: {formatDate(query.created_at)}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 px-5 py-5">
                            <div className="grid gap-3 lg:grid-cols-2">
                                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Name</p>
                                    <p className="mt-2 text-lg font-semibold text-white">{query.full_name || "-"}</p>
                                </div>
                                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Email</p>
                                    <a
                                        href={`mailto:${query.email}`}
                                        className="mt-2 inline-block text-lg font-semibold text-sky-400 underline decoration-sky-400/60 hover:text-sky-300"
                                    >
                                        {query.email || "-"}
                                    </a>
                                </div>
                            </div>

                            <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-900/80 p-4">
                                <div className="mb-3 flex flex-col gap-2 border-b border-zinc-800 pb-3 sm:flex-row sm:items-center sm:justify-between">
                                    <h2 className="text-xl font-semibold text-white">Message</h2>
                                    <span className="text-xs text-zinc-500">Full message content below</span>
                                </div>
                                <div className="whitespace-pre-wrap break-words text-sm leading-7 text-zinc-200">
                                    {query.message || "-"}
                                </div>
                            </div>
                        </CardContent>

                        <div className="border-t border-zinc-800 bg-zinc-950/90 px-4 py-4 sm:px-5 sm:py-4">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-zinc-400">Need to reply to the sender?</p>
                                    <p className="text-xs text-zinc-500">This opens your default email client with subject prefilled.</p>
                                </div>
                                <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            void handleUpdateStatus(!query.is_solved);
                                        }}
                                        disabled={isUpdatingStatus}
                                        className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2 text-sm font-semibold transition-colors ${query.is_solved
                                            ? "bg-amber-500 text-zinc-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
                                            : "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                                            }`}
                                    >
                                        {isUpdatingStatus ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            query.is_solved
                                                ? <Clock3 className="h-4 w-4" />
                                                : <CheckCircle2 className="h-4 w-4" />
                                        )}
                                        {query.is_solved ? "Mark as Pending" : "Mark as Solved"}
                                    </button>
                                    <a
                                        href={mailToHref}
                                        className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2 text-sm font-semibold transition-colors ${query.email
                                            ? "bg-sky-500 text-slate-950 hover:bg-sky-400"
                                            : "bg-zinc-700 text-zinc-300 cursor-not-allowed pointer-events-none"
                                            }`}
                                    >
                                        <Reply className="h-4 w-4" />
                                        Reply via Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </Card>
        </div>
    );
}
