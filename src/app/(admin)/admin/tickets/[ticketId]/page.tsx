"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, Paperclip, Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatTicketDateTime,
  getApiMessage,
  getTicketStatusBadgeClass,
  resolveAttachmentHref,
  toTicketStatusLabel,
} from "@/lib/helpdesk";
import {
  TICKET_CATEGORY_LABELS,
  TICKET_PRIORITY_LABELS,
  TICKET_STATUS_LABELS,
} from "@/data/helpDeskFaqs";
import type { HelpDeskTicket, TicketMessage, TicketStatus } from "@/types/helpdesk";

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

function toTicketMessage(record: Record<string, unknown>): TicketMessage {
  return {
    id: Number(record.id) || 0,
    ticket_id: Number(record.ticket_id) || 0,
    sender_id: toNullableNumber(record.sender_id),
    sender_role: toText(record.sender_role).toLowerCase() === "admin" ? "admin" : "user",
    message: typeof record.message === "string" ? record.message : "",
    attachment_url: toText(record.attachment_url) || null,
    created_at: toText(record.created_at) || null,
  };
}

function toTicket(record: Record<string, unknown>): HelpDeskTicket {
  const rawMessages = Array.isArray(record.messages)
    ? record.messages
        .filter(
          (item): item is Record<string, unknown> =>
            Boolean(item) && typeof item === "object" && !Array.isArray(item),
        )
        .map(toTicketMessage)
    : [];

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
    messages: rawMessages,
  };
}

function extractTicket(payload: unknown): HelpDeskTicket | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const root = payload as Record<string, unknown>;
  if (!root.data || typeof root.data !== "object") {
    return null;
  }

  return toTicket(root.data as Record<string, unknown>);
}

function parseTicketId(value: string | string[] | undefined): number | null {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(String(raw || ""), 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export default function AdminTicketDetailPage() {
  const params = useParams<{ ticketId: string }>();
  const ticketId = parseTicketId(params?.ticketId);

  const [ticket, setTicket] = useState<HelpDeskTicket | null>(null);
  const [status, setStatus] = useState<TicketStatus>("open");
  const [reply, setReply] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const loadTicket = async () => {
    if (!ticketId) {
      setError("Invalid ticket id.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: "GET",
        cache: "no-store",
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to fetch ticket details.");
      }

      const nextTicket = extractTicket(payload);
      setTicket(nextTicket);
      setStatus((nextTicket?.status || "open") as TicketStatus);
    } catch (err) {
      setTicket(null);
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to fetch ticket details.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages]);

  const handleUpdateStatus = async () => {
    if (!ticketId || !status || isUpdatingStatus) {
      return;
    }

    setError("");
    setIsUpdatingStatus(true);

    try {
      const response = await fetch(`/api/admin/tickets/${ticketId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to update ticket status.");
      }

      const nextTicket = extractTicket(payload);
      if (nextTicket) {
        setTicket(nextTicket);
        setStatus(nextTicket.status);
      } else {
        await loadTicket();
      }
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to update ticket status.",
      );
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSendReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ticketId || isSendingReply) {
      return;
    }

    if (!reply.trim() && !attachment) {
      setError("Please type a reply or attach a file.");
      return;
    }

    setError("");
    setIsSendingReply(true);

    try {
      const formData = new FormData();
      if (reply.trim()) {
        formData.append("message", reply.trim());
      }
      if (attachment) {
        formData.append("attachment", attachment);
      }

      const response = await fetch(`/api/admin/tickets/${ticketId}/reply`, {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to send reply.");
      }

      const nextTicket = extractTicket(payload);
      if (nextTicket) {
        setTicket(nextTicket);
        setStatus(nextTicket.status);
      } else {
        await loadTicket();
      }

      setReply("");
      setAttachment(null);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to send reply.",
      );
    } finally {
      setIsSendingReply(false);
    }
  };

  const conversation = useMemo(() => ticket?.messages || [], [ticket?.messages]);

  return (
    <div className="min-h-screen container mx-auto max-w-8xl text-zinc-100">
      <div className="flex flex-col gap-4 pt-3 pb-5 mb-6 border-b border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Ticket Details</h1>
          <p className="mt-1 text-sm text-zinc-400">Review conversation, update status, and reply to user.</p>
        </div>

        <Link href="/admin/tickets">
          <Button variant="ghost" className="border border-zinc-700 text-zinc-100 hover:bg-zinc-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tickets
          </Button>
        </Link>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100 text-lg">Conversation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md border border-rose-500/40 bg-rose-950/30 px-3 py-2 text-sm text-rose-200">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : !ticket ? (
            <div className="text-center text-zinc-400 py-10">Ticket not found.</div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">#{ticket.id} · {ticket.subject || "Untitled"}</h2>
                    <p className="mt-1 text-sm text-zinc-400">
                      {ticket.user_name || "User"} ({ticket.user_email || "-"})
                    </p>
                  </div>
                  <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${getTicketStatusBadgeClass(ticket.status)}`}>
                    {toTicketStatusLabel(ticket.status)}
                  </span>
                </div>

                <div className="mt-3 grid gap-2 text-sm text-zinc-300 md:grid-cols-2">
                  <p>Workshop: {ticket.workshop_title || "General Support"}</p>
                  <p>Category: {TICKET_CATEGORY_LABELS[ticket.category] || "Other"}</p>
                  <p>Priority: {TICKET_PRIORITY_LABELS[ticket.priority] || "Medium"}</p>
                  <p>Created: {formatTicketDateTime(ticket.created_at)}</p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value as TicketStatus)}
                    className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none"
                  >
                    {Object.entries(TICKET_STATUS_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>

                  <Button
                    onClick={handleUpdateStatus}
                    disabled={isUpdatingStatus || status === ticket.status}
                    className="bg-blue-600 text-white hover:bg-blue-500"
                  >
                    {isUpdatingStatus ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Status"
                    )}
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-4 max-h-[420px] overflow-y-auto space-y-3">
                {conversation.length === 0 ? (
                  <p className="text-sm text-zinc-400 text-center py-8">No messages in this ticket.</p>
                ) : (
                  conversation.map((entry) => {
                    const isAdmin = entry.sender_role === "admin";
                    const attachmentHref = resolveAttachmentHref(entry.attachment_url);

                    return (
                      <div key={entry.id} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                            isAdmin
                              ? "bg-blue-600 text-white"
                              : "bg-zinc-800 text-zinc-100"
                          }`}
                        >
                          <p className="text-[11px] uppercase tracking-wider opacity-80">
                            {isAdmin ? "Admin" : ticket.user_name || "User"}
                          </p>
                          <p className="mt-1 whitespace-pre-wrap break-words">{entry.message}</p>
                          {attachmentHref && (
                            <a
                              href={attachmentHref}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs underline"
                            >
                              <Paperclip className="h-3 w-3" />
                              View attachment
                            </a>
                          )}
                          <p className="mt-2 text-[11px] opacity-80">{formatTicketDateTime(entry.created_at)}</p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendReply} className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-950/70 p-4">
                <label htmlFor="admin-reply" className="text-sm font-medium text-zinc-200">Reply to user</label>
                <textarea
                  id="admin-reply"
                  rows={4}
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-blue-500"
                  placeholder="Type your reply"
                />

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.txt"
                    onChange={(event) => setAttachment(event.target.files?.[0] || null)}
                    className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-zinc-100 file:mr-2 file:rounded-md file:border-0 file:bg-zinc-700 file:px-2 file:py-1 file:text-xs"
                  />

                  <Button type="submit" disabled={isSendingReply} className="bg-emerald-600 text-white hover:bg-emerald-500">
                    {isSendingReply ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Reply
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
