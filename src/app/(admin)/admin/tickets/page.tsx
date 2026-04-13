"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Filter, LifeBuoy, Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TICKET_CATEGORY_LABELS,
  TICKET_CATEGORY_OPTIONS,
  TICKET_STATUS_LABELS,
} from "@/data/helpDeskFaqs";
import {
  formatTicketDateTime,
  getApiMessage,
  getTicketStatusBadgeClass,
  toTicketStatusLabel,
} from "@/lib/helpdesk";
import type { HelpDeskTicket, TicketCategory, TicketStatus } from "@/types/helpdesk";

function toText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

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

function toTicket(record: Record<string, unknown>): HelpDeskTicket {
  return {
    id: Number(record.id) || 0,
    user_id: toNullableNumber(record.user_id),
    user_name: toText(record.user_name) || null,
    user_email: toText(record.user_email) || null,
    workshop_id: toNullableNumber(record.workshop_id),
    workshop_title: toText(record.workshop_title) || null,
    subject: toText(record.subject),
    description: toText(record.description),
    category: (toText(record.category) as HelpDeskTicket["category"]) || "other",
    priority: (toText(record.priority) as HelpDeskTicket["priority"]) || "medium",
    status: (toText(record.status) as HelpDeskTicket["status"]) || "open",
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

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<HelpDeskTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"" | TicketStatus>("");
  const [categoryFilter, setCategoryFilter] = useState<"" | TicketCategory>("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadTickets = async () => {
      setIsLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();
        if (statusFilter) {
          params.set("status", statusFilter);
        }
        if (categoryFilter) {
          params.set("category", categoryFilter);
        }

        const query = params.toString();
        const endpoint = query ? `/api/admin/tickets?${query}` : "/api/admin/tickets";

        const response = await fetch(endpoint, {
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
  }, [statusFilter, categoryFilter]);

  const totalTickets = useMemo(() => tickets.length, [tickets]);

  return (
    <div className="min-h-screen container mx-auto max-w-8xl text-zinc-100">
      <div className="flex flex-col gap-4 pt-3 pb-5 mb-6 border-b border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Support Tickets</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage help desk tickets from users across workshops.
          </p>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-zinc-100 text-lg flex items-center gap-2">
              <LifeBuoy className="h-4 w-4 text-blue-400" />
              Ticket Inbox
            </CardTitle>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border border-zinc-700 px-2 py-1">
                <Filter className="h-4 w-4 text-zinc-400" />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as "" | TicketStatus)}
                  className="bg-transparent text-sm text-zinc-200 outline-none"
                >
                  <option value="">All Status</option>
                  {Object.entries(TICKET_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 rounded-md border border-zinc-700 px-2 py-1">
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value as "" | TicketCategory)}
                  className="bg-transparent text-sm text-zinc-200 outline-none"
                >
                  <option value="">All Categories</option>
                  {TICKET_CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {(statusFilter || categoryFilter) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setStatusFilter("");
                    setCategoryFilter("");
                  }}
                  className="border border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                >
                  Clear
                </Button>
              )}

              <span className="text-sm text-zinc-400">Total: {totalTickets}</span>
            </div>
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
                    <TableHead className="text-white min-w-[220px]">User</TableHead>
                    <TableHead className="text-white min-w-[220px]">Workshop</TableHead>
                    <TableHead className="text-white min-w-[170px]">Category</TableHead>
                    <TableHead className="text-white min-w-[140px]">Status</TableHead>
                    <TableHead className="text-white min-w-[180px]">Created</TableHead>
                    <TableHead className="text-white min-w-[120px] text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.length === 0 ? (
                    <TableRow className="border-zinc-800">
                      <TableCell colSpan={6} className="text-center text-zinc-400 py-8">
                        No tickets found for the selected filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    tickets.map((ticket) => (
                      <TableRow key={ticket.id} className="border-zinc-800 align-top">
                        <TableCell className="text-zinc-200 text-sm">
                          <div className="flex flex-col">
                            <span className="font-medium">{ticket.user_name || "User"}</span>
                            <span className="text-zinc-500 text-xs">{ticket.user_email || "-"}</span>
                            <span className="text-zinc-400 text-xs mt-1 line-clamp-2">#{ticket.id} · {ticket.subject || "Untitled"}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-zinc-300 text-sm">
                          {ticket.workshop_title || "General Support"}
                        </TableCell>
                        <TableCell className="text-zinc-300 text-sm">
                          {TICKET_CATEGORY_LABELS[ticket.category] || "Other"}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getTicketStatusBadgeClass(ticket.status)}`}>
                            {toTicketStatusLabel(ticket.status)}
                          </span>
                        </TableCell>
                        <TableCell className="text-zinc-400 text-sm">
                          {formatTicketDateTime(ticket.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/admin/tickets/${ticket.id}`}>
                            <Button
                              variant="ghost"
                              className="border border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                            >
                              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                              View
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
  );
}
