"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, LifeBuoy, Loader2, PlusCircle } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
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
import { TICKET_CATEGORY_LABELS } from "@/data/helpDeskFaqs";
import {
  formatTicketDateTime,
  getApiMessage,
  getTicketStatusBadgeClass,
  toTicketStatusLabel,
} from "@/lib/helpdesk";
import type { HelpDeskTicket } from "@/types/helpdesk";

function toNullableNumber(value: unknown): number | null {
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

function toText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toTicket(record: Record<string, unknown>): HelpDeskTicket {
  const categoryRaw = toText(record.category) as HelpDeskTicket["category"];
  const priorityRaw = toText(record.priority) as HelpDeskTicket["priority"];
  const statusRaw = toText(record.status) as HelpDeskTicket["status"];

  return {
    id: Number(record.id) || 0,
    user_id: toNullableNumber(record.user_id),
    user_name: toText(record.user_name) || null,
    user_email: toText(record.user_email) || null,
    workshop_id: toNullableNumber(record.workshop_id),
    workshop_title: toText(record.workshop_title) || null,
    subject: toText(record.subject),
    description: toText(record.description),
    category: categoryRaw || "other",
    priority: priorityRaw || "medium",
    status: statusRaw || "open",
    attachment_url: toText(record.attachment_url) || null,
    created_at: toText(record.created_at) || null,
    updated_at: toText(record.updated_at) || null,
    last_message: toText(record.last_message) || null,
    messages: undefined,
  };
}

function extractTickets(payload: unknown): HelpDeskTicket[] {
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
    .map(toTicket);
}

export default function HelpDeskPage() {
  const { isLoggedIn, role, isHydrated } = useAuth();

  const [tickets, setTickets] = useState<HelpDeskTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const isUserSession = isLoggedIn && role === "user";

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!isUserSession) {
      setIsLoading(false);
      setTickets([]);
      setError("");
      return;
    }

    let isMounted = true;

    const loadTickets = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/tickets/my", {
          method: "GET",
          cache: "no-store",
        });

        const payload = (await response.json().catch(() => ({}))) as unknown;

        if (!response.ok) {
          throw new Error(getApiMessage(payload) || "Unable to fetch tickets.");
        }

        if (!isMounted) {
          return;
        }

        setTickets(extractTickets(payload));
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setTickets([]);
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to fetch tickets.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTickets();

    return () => {
      isMounted = false;
    };
  }, [isHydrated, isUserSession]);

  const totalTickets = useMemo(() => tickets.length, [tickets]);

  if (!isHydrated) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-slate-950 text-slate-200">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!isUserSession) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
        <div className="mx-auto max-w-3xl">
          <Card className="border-slate-800 bg-slate-900/70">
            <CardContent className="py-10 text-center space-y-4">
              <LifeBuoy className="mx-auto h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-semibold">Help Desk</h1>
              <p className="text-sm text-slate-300">
                Please log in with your user account to view and create support tickets.
              </p>
              <Link href="/login">
                <Button className="bg-blue-600 text-white hover:bg-blue-500">
                  Login to Continue
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Help Desk</h1>
            <p className="mt-1 text-sm text-slate-300">
              Track your support tickets and continue conversations with the support team.
            </p>
          </div>

          <Link href="/help-desk/create">
            <Button className="bg-emerald-600 text-white hover:bg-emerald-500">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Ticket
            </Button>
          </Link>
        </div>

        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <LifeBuoy className="h-4 w-4 text-blue-400" />
                My Tickets
              </CardTitle>
              <span className="text-sm text-slate-400">Total: {totalTickets}</span>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 rounded-md border border-rose-500/40 bg-rose-900/20 px-3 py-2 text-sm text-rose-200">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-800">
                      <TableHead className="text-slate-200">Subject</TableHead>
                      <TableHead className="text-slate-200">Workshop</TableHead>
                      <TableHead className="text-slate-200">Category</TableHead>
                      <TableHead className="text-slate-200">Status</TableHead>
                      <TableHead className="text-slate-200">Last Updated</TableHead>
                      <TableHead className="text-right text-slate-200">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.length === 0 ? (
                      <TableRow className="border-slate-800">
                        <TableCell colSpan={6} className="py-8 text-center text-slate-400">
                          No tickets yet. Create your first support ticket.
                        </TableCell>
                      </TableRow>
                    ) : (
                      tickets.map((ticket) => (
                        <TableRow key={ticket.id} className="border-slate-800 align-top">
                          <TableCell className="text-slate-100 font-medium">
                            <div className="max-w-[280px] space-y-1">
                              <p className="line-clamp-2">{ticket.subject || "-"}</p>
                              {ticket.last_message && (
                                <p className="text-xs text-slate-400 line-clamp-2">{ticket.last_message}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {ticket.workshop_title || "General Support"}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {TICKET_CATEGORY_LABELS[ticket.category] || "Other"}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getTicketStatusBadgeClass(ticket.status)}`}>
                              {toTicketStatusLabel(ticket.status)}
                            </span>
                          </TableCell>
                          <TableCell className="text-slate-400 text-sm">
                            {formatTicketDateTime(ticket.updated_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Link href={`/help-desk/${ticket.id}`}>
                              <Button variant="ghost" className="border border-slate-700 text-slate-200 hover:bg-slate-800">
                                <ExternalLink className="mr-2 h-3.5 w-3.5" />
                                Open
                              </Button>
                            </Link>
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
    </div>
  );
}
