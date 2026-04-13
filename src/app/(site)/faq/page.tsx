"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HelpCircle, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { FAQ_CATEGORY_LABELS, HELP_DESK_FAQS } from "@/data/helpDeskFaqs";

export default function FaqPage() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredEntries = useMemo(() => {
    return Object.entries(HELP_DESK_FAQS)
      .map(([category, items]) => {
        const filtered = !normalizedQuery
          ? items
          : items.filter((item) => {
              const haystack = `${item.question} ${item.answer}`.toLowerCase();
              return haystack.includes(normalizedQuery);
            });

        return [category, filtered] as const;
      })
      .filter(([, items]) => items.length > 0);
  }, [normalizedQuery]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h1>
          <p className="text-sm text-slate-300 sm:text-base">
            Find answers quickly before raising a support ticket.
          </p>
        </div>

        <Card className="border-slate-800 bg-slate-900/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100 text-base">
              <Search className="h-4 w-4 text-blue-400" />
              Search FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by keyword, topic, or issue"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
            />
          </CardContent>
        </Card>

        {filteredEntries.length === 0 ? (
          <Card className="border-slate-800 bg-slate-900/70">
            <CardContent className="py-10 text-center text-slate-300">
              No FAQs matched your search.
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map(([category, items]) => (
            <Card key={category} className="border-slate-800 bg-slate-900/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100 text-lg">
                  <HelpCircle className="h-4 w-4 text-blue-400" />
                  {FAQ_CATEGORY_LABELS[category as keyof typeof FAQ_CATEGORY_LABELS] || category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {items.map((item, index) => (
                  <details
                    key={`${category}-${index}`}
                    className="rounded-md border border-slate-700 bg-slate-950/60 px-4 py-3 open:border-blue-600/50"
                  >
                    <summary className="cursor-pointer list-none text-sm font-medium text-slate-100">
                      {item.question}
                    </summary>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">{item.answer}</p>
                  </details>
                ))}
              </CardContent>
            </Card>
          ))
        )}

        <Card className="border-emerald-700/40 bg-emerald-950/20">
          <CardContent className="py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-emerald-100">
              Still need help? Create a support ticket and our team will assist you.
            </p>
            <Link href="/help-desk/create">
              <Button className="bg-emerald-600 text-white hover:bg-emerald-500">
                Go to Help Desk
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
