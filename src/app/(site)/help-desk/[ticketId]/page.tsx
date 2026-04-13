"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, Paperclip, SendHorizonal } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatTicketDateTime,
  getApiMessage,
  getTicketStatusBadgeClass,
  resolveAttachmentHref,
  toTicketStatusLabel,
} from "@/lib/helpdesk";
import { TICKET_CATEGORY_LABELS, TICKET_PRIORITY_LABELS } from "@/data/helpDeskFaqs";
import type { HelpDeskTicket, TicketMessage } from "@/types/helpdesk";

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

export default function HelpDeskTicketDetailPage() {
  const { isLoggedIn, role, isHydrated } = useAuth();
  const params = useParams<{ ticketId: string }>();

  const ticketId = parseTicketId(params?.ticketId);

  const [ticket, setTicket] = useState<HelpDeskTicket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isUserSession = isLoggedIn && role === "user";

  const loadTicket = async () => {
    if (!ticketId) {
      setError("Invalid ticket id.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "GET",
        cache: "no-store",
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to fetch ticket details.");
      }

      setTicket(extractTicket(payload));
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
    if (!isHydrated || !isUserSession) {
      setIsLoading(false);
      return;
    }

    void loadTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, isUserSession, ticketId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages]);

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ticketId || isSending) {
      return;
    }

    if (!message.trim() && !attachment) {
      setError("Please type a message or attach a file.");
      return;
    }

    setError("");
    setIsSending(true);

    try {
      const formData = new FormData();
      if (message.trim()) {
        formData.append("message", message.trim());
      }
      if (attachment) {
        formData.append("attachment", attachment);
      }

      const response = await fetch(`/api/tickets/${ticketId}/message`, {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to send message.");
      }

      const updated = extractTicket(payload);
      if (updated) {
        setTicket(updated);
      } else {
        await loadTicket();
      }

      setMessage("");
      setAttachment(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send message.");
    } finally {
      setIsSending(false);
    }
  };

  const conversation = useMemo(() => ticket?.messages || [], [ticket?.messages]);

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
              <h1 className="text-2xl font-semibold">Ticket Details</h1>
              <p className="text-sm text-slate-300">Please log in with your user account to access this ticket.</p>
              <Link href="/login">
                <Button className="bg-blue-600 text-white hover:bg-blue-500">Login to Continue</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-3 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Ticket Conversation</h1>
            <p className="mt-1 text-sm text-slate-300">Track updates and reply to support in one place.</p>
          </div>
          <Link href="/help-desk">
            <Button variant="ghost" className="border border-slate-700 text-slate-200 hover:bg-slate-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tickets
            </Button>
          </Link>
        </div>

        <Card className="border-slate-800 bg-slate-900/70">
          <CardContent className="pt-6">
            {error && (
              <div className="mb-4 rounded-md border border-rose-500/40 bg-rose-900/20 px-3 py-2 text-sm text-rose-200">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : !ticket ? (
              <div className="text-center text-slate-300 py-10">Ticket not found.</div>
            ) : (
              <div className="space-y-5">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-semibold text-white">#{ticket.id} · {ticket.subject || "Untitled"}</h2>
                    <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${getTicketStatusBadgeClass(ticket.status)}`}>
                      {toTicketStatusLabel(ticket.status)}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                    <p>Category: {TICKET_CATEGORY_LABELS[ticket.category] || "Other"}</p>
                    <p>Priority: {TICKET_PRIORITY_LABELS[ticket.priority] || "Medium"}</p>
                    <p>Workshop: {ticket.workshop_title || "General Support"}</p>
                    <p>Created: {formatTicketDateTime(ticket.created_at)}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 max-h-[420px] overflow-y-auto space-y-3">
                  {conversation.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-8">No messages yet.</p>
                  ) : (
                    conversation.map((entry) => {
                      const isUser = entry.sender_role === "user";
                      const attachmentHref = resolveAttachmentHref(entry.attachment_url);

                      return (
                        <div
                          key={entry.id}
                          className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                              isUser
                                ? "bg-blue-600 text-white"
                                : "bg-slate-800 text-slate-100"
                            }`}
                          >
                            <p className="text-[11px] uppercase tracking-wider opacity-80">
                              {isUser ? "You" : "Support Team"}
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

                <form onSubmit={handleSendMessage} className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <label htmlFor="message" className="text-sm font-medium text-slate-200">Send a message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
                    placeholder="Write your update or follow-up message..."
                  />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.txt"
                      onChange={(event) => setAttachment(event.target.files?.[0] || null)}
                      className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 file:mr-2 file:rounded-md file:border-0 file:bg-slate-700 file:px-2 file:py-1 file:text-xs"
                    />

                    <Button type="submit" disabled={isSending} className="bg-emerald-600 text-white hover:bg-emerald-500">
                      {isSending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <SendHorizonal className="mr-2 h-4 w-4" />
                          Send
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
    </div>
  );
}
