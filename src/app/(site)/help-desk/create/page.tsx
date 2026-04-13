"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HELP_DESK_FAQS,
  FAQ_CATEGORY_LABELS,
  TICKET_CATEGORY_LABELS,
  TICKET_CATEGORY_OPTIONS,
  TICKET_CATEGORY_TO_FAQ_CATEGORIES,
  TICKET_PRIORITY_LABELS,
} from "@/data/helpDeskFaqs";
import { useAuth } from "@/hooks/useAuth";
import { getApiMessage } from "@/lib/helpdesk";
import type { HelpDeskTicket, TicketCategory, TicketPriority } from "@/types/helpdesk";

type WorkshopOption = {
  id: number;
  title: string;
};

function toText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function extractWorkshopOptions(payload: unknown): WorkshopOption[] {
  const source = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown[] }).data)
      ? (payload as { data: unknown[] }).data
      : [];

  return source
    .filter(
      (item): item is Record<string, unknown> =>
        Boolean(item) && typeof item === "object" && !Array.isArray(item),
    )
    .map((record) => ({
      id: Number(record.id) || 0,
      title: toText(record.title) || `Workshop ${record.id}`,
    }))
    .filter((item) => item.id > 0);
}

function extractCreatedTicketId(payload: unknown): number | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const root = payload as { data?: unknown };
  if (!root.data || typeof root.data !== "object") {
    return null;
  }

  const id = Number((root.data as HelpDeskTicket).id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export default function CreateHelpDeskTicketPage() {
  const router = useRouter();
  const { isLoggedIn, role, isHydrated } = useAuth();

  const [workshops, setWorkshops] = useState<WorkshopOption[]>([]);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<TicketCategory>("registration_issue");
  const [priority, setPriority] = useState<TicketPriority>("medium");
  const [workshopId, setWorkshopId] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingWorkshops, setIsLoadingWorkshops] = useState(false);
  const [error, setError] = useState("");

  const isUserSession = isLoggedIn && role === "user";

  useEffect(() => {
    if (!isHydrated || !isUserSession) {
      return;
    }

    let isMounted = true;

    const loadWorkshops = async () => {
      setIsLoadingWorkshops(true);

      try {
        const response = await fetch("/api/workshop-list", {
          method: "GET",
          cache: "no-store",
        });

        const payload = (await response.json().catch(() => ([]))) as unknown;

        if (!response.ok) {
          throw new Error(getApiMessage(payload) || "Unable to load workshops.");
        }

        if (!isMounted) {
          return;
        }

        setWorkshops(extractWorkshopOptions(payload));
      } catch {
        if (!isMounted) {
          return;
        }

        setWorkshops([]);
      } finally {
        if (isMounted) {
          setIsLoadingWorkshops(false);
        }
      }
    };

    loadWorkshops();

    return () => {
      isMounted = false;
    };
  }, [isHydrated, isUserSession]);

  const relatedFaqItems = useMemo(() => {
    const faqCategories = TICKET_CATEGORY_TO_FAQ_CATEGORIES[category] || [];

    return faqCategories.flatMap((faqCategory) =>
      (HELP_DESK_FAQS[faqCategory] || []).map((item) => ({
        ...item,
        categoryLabel: FAQ_CATEGORY_LABELS[faqCategory],
      })),
    );
  }, [category]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("category", category);
      formData.append("priority", priority);
      formData.append("description", description);

      if (workshopId) {
        formData.append("workshop_id", workshopId);
      }

      if (attachment) {
        formData.append("attachment", attachment);
      }

      const response = await fetch("/api/tickets", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to create ticket.");
      }

      const createdTicketId = extractCreatedTicketId(payload);

      if (createdTicketId) {
        router.push(`/help-desk/${createdTicketId}`);
        return;
      }

      router.push("/help-desk");
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to create ticket.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <h1 className="text-2xl font-semibold">Create Ticket</h1>
              <p className="text-sm text-slate-300">Please log in with your user account to submit a ticket.</p>
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
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col gap-3 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Create Help Desk Ticket</h1>
            <p className="mt-1 text-sm text-slate-300">
              Share your issue with details so our support team can assist faster.
            </p>
          </div>

          <Link href="/help-desk">
            <Button variant="ghost" className="border border-slate-700 text-slate-200 hover:bg-slate-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tickets
            </Button>
          </Link>
        </div>

        <Card className="border-blue-700/40 bg-blue-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-200 flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4" />
              Related FAQs (before submitting)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {relatedFaqItems.length === 0 ? (
              <p className="text-sm text-slate-300">No related FAQs available for this category.</p>
            ) : (
              relatedFaqItems.map((faq, index) => (
                <div key={`${faq.categoryLabel}-${index}`} className="rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2">
                  <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider">{faq.categoryLabel}</p>
                  <p className="text-sm text-slate-100 mt-1">Q: {faq.question}</p>
                  <p className="text-sm text-slate-300 mt-1">A: {faq.answer}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/70">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-md border border-rose-500/40 bg-rose-900/20 px-3 py-2 text-sm text-rose-200">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="subject" className="text-sm text-slate-200 font-medium">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    required
                    maxLength={200}
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
                    placeholder="Briefly describe your issue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="category" className="text-sm text-slate-200 font-medium">Category</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value as TicketCategory)}
                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
                  >
                    {TICKET_CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="priority" className="text-sm text-slate-200 font-medium">Priority</label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={(event) => setPriority(event.target.value as TicketPriority)}
                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
                  >
                    {Object.entries(TICKET_PRIORITY_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="workshop" className="text-sm text-slate-200 font-medium">Workshop (optional)</label>
                  <select
                    id="workshop"
                    value={workshopId}
                    onChange={(event) => setWorkshopId(event.target.value)}
                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
                    disabled={isLoadingWorkshops}
                  >
                    <option value="">General Support</option>
                    {workshops.map((workshop) => (
                      <option key={workshop.id} value={workshop.id}>{workshop.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="description" className="text-sm text-slate-200 font-medium">Description</label>
                  <textarea
                    id="description"
                    required
                    rows={6}
                    maxLength={5000}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
                    placeholder="Add all relevant details including what happened and what you expected."
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="attachment" className="text-sm text-slate-200 font-medium">Attachment (optional)</label>
                  <input
                    id="attachment"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.txt"
                    onChange={(event) => setAttachment(event.target.files?.[0] || null)}
                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 file:mr-3 file:rounded-md file:border-0 file:bg-slate-700 file:px-3 file:py-1.5 file:text-xs file:text-slate-100"
                  />
                  <p className="text-xs text-slate-400">Allowed: JPG, PNG, WEBP, PDF, DOC, DOCX, TXT (max 5MB)</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white hover:bg-blue-500">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Submit Ticket
                    </>
                  )}
                </Button>
                <p className="text-xs text-slate-400">Category selected: {TICKET_CATEGORY_LABELS[category]}</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
