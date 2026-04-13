"use client";

import { useEffect, useState } from "react";
import { Award, ExternalLink, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyCertificates } from "@/services/userDashboard";
import type { CertificateItem } from "@/types/userDashboard";

function formatDate(value: string | null): string {
  if (!value) {
    return "Pending issuance";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Pending issuance";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CertificatesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<CertificateItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCertificates = async () => {
      setIsLoading(true);

      try {
        const response = await getMyCertificates();

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
          : "Unable to load certificates right now.";

        setErrorMessage(message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadCertificates();

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
          <CardTitle className="text-white">My Certificates</CardTitle>
          <CardDescription className="text-slate-300">
            Download and share your verified workshop certificates.
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
            <Award className="mx-auto h-7 w-7 text-cyan-300" />
            <p className="text-slate-200">No certificates issued yet.</p>
            <p className="text-xs text-slate-400">
              Complete workshops from your dashboard to unlock certificates here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.id} className="border-slate-800 bg-slate-900/70">
              <CardContent className="space-y-4 py-4">
                <div>
                  <p className="text-base font-semibold text-white">{item.workshop_title}</p>
                  <p className="text-xs text-slate-300">Issued: {formatDate(item.issued_at)}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a href={item.preview_url} target="_blank" rel="noreferrer">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </a>
                  <a href={item.download_url} target="_blank" rel="noreferrer">
                    <Button type="button" className="bg-cyan-600 text-white hover:bg-cyan-500">
                      Download
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
