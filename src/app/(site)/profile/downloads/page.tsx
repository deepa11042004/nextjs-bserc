"use client";

import { useEffect, useState } from "react";
import { Download, FileArchive, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyDownloads } from "@/services/userDashboard";
import type { DownloadItem } from "@/types/userDashboard";

function formatDate(value: string | null): string {
  if (!value) {
    return "Recently added";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Recently added";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function friendlyType(value: string): string {
  if (value === "certificate") {
    return "Certificate";
  }

  if (value === "notes") {
    return "Workshop Notes";
  }

  return "Resource";
}

export default function DownloadsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<DownloadItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadDownloads = async () => {
      setIsLoading(true);

      try {
        const response = await getMyDownloads();

        if (!isMounted) {
          return;
        }

        setItems(response.data);
        setErrorMessage(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message = error instanceof Error
          ? error.message
          : "Unable to load downloads right now.";

        setErrorMessage(message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadDownloads();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <Card className="border-slate-800 bg-slate-900/70">
        <CardContent className="flex items-center justify-center py-10 text-slate-200">
          <Loader2 className="h-5 w-5 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <Card className="border-slate-800 bg-slate-900/70">
        <CardHeader>
          <CardTitle className="text-white">Downloads</CardTitle>
          <CardDescription className="text-slate-300">
            Access your notes, certificates, and workshop resources from one place.
          </CardDescription>
        </CardHeader>
      </Card>

      {errorMessage ? (
        <Card className="border-rose-500/40 bg-rose-950/20">
          <CardContent className="py-3 text-sm text-rose-200">{errorMessage}</CardContent>
        </Card>
      ) : null}

      {items.length === 0 ? (
        <Card className="border-slate-800 bg-slate-900/70">
          <CardContent className="space-y-3 py-8 text-center">
            <FileArchive className="mx-auto h-7 w-7 text-cyan-300" />
            <p className="text-slate-200">No downloadable resources yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-slate-800 bg-slate-900/70">
          <CardContent className="space-y-3 py-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-slate-300">
                    {friendlyType(item.type)} • Added {formatDate(item.added_at)}
                  </p>
                </div>

                <a href={item.url} target="_blank" rel="noreferrer">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Open
                  </Button>
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
