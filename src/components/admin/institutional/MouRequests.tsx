"use client";

import { useEffect, useState } from "react";
import { Download, Eye, Loader2, NotebookPen, Trash2 } from "lucide-react";

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

type MouRequest = {
  id: number;
  institution_name: string;
  registered_address: string;
  signatory_name: string;
  designation: string;
  official_email: string;
  official_phone: string;
  alternative_email: string | null;
  proposal_purpose: string;
  submission_type: string;
  supporting_document_name: string | null;
  supporting_document_mime: string | null;
  supporting_document_size: number | null;
  created_at: string | null;
  updated_at: string | null;
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

function formatDate(value: string | null): string {
  if (!value) {
    return "-";
  }

  const normalizedValue = String(value).includes('T') ? String(value) : String(value).replace(' ', 'T');
  const utcValue = normalizedValue.endsWith('Z') ? normalizedValue : `${normalizedValue}Z`;
  const date = new Date(utcValue);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", year: "numeric",
    month: "short",
    day: "2-digit", });
}

function formatTime(value: string | null): string {
  if (!value) {
    return "-";
  }

  const normalizedValue = String(value).includes('T') ? String(value) : String(value).replace(' ', 'T');
  const utcValue = normalizedValue.endsWith('Z') ? normalizedValue : `${normalizedValue}Z`;
  const date = new Date(utcValue);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit",
    minute: "2-digit", hour12: true });
}

function formatFileSize(bytes: number | null): string {
  if (bytes === null || !Number.isFinite(bytes) || bytes < 0) {
    return "-";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  return `${(kb / 1024).toFixed(1)} MB`;
}

function csvEscape(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function mapRequest(record: Record<string, unknown>): MouRequest {
  return {
    id: toPositiveInt(record.id),
    institution_name: toText(record.institution_name),
    registered_address: toText(record.registered_address),
    signatory_name: toText(record.signatory_name),
    designation: toText(record.designation),
    official_email: toText(record.official_email),
    official_phone: toText(record.official_phone),
    alternative_email: toNullableText(record.alternative_email),
    proposal_purpose: toText(record.proposal_purpose),
    submission_type: toText(record.submission_type),
    supporting_document_name: toNullableText(record.supporting_document_name),
    supporting_document_mime: toNullableText(record.supporting_document_mime),
    supporting_document_size: toNumberOrNull(record.supporting_document_size),
    created_at: toNullableText(record.created_at),
    updated_at: toNullableText(record.updated_at),
  };
}

function extractRequests(payload: unknown): MouRequest[] {
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
    .map(mapRequest);
}

export default function MouRequests() {
  const [requests, setRequests] = useState<MouRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isDetailExporting, setIsDetailExporting] = useState(false);
  const [downloadingDocumentId, setDownloadingDocumentId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<MouRequest | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadRequests = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/mou-application", {
          method: "GET",
          cache: "no-store",
        });

        const payload = (await response.json().catch(() => ({}))) as unknown;

        if (!response.ok) {
          throw new Error(
            getApiMessage(payload)
              || "Unable to fetch MoU requests.",
          );
        }

        if (!isMounted) {
          return;
        }

        setRequests(extractRequests(payload));
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setRequests([]);
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to fetch MoU requests.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleExport = () => {
    if (requests.length === 0) {
      setError("No MoU requests available to export.");
      return;
    }

    setError("");
    setIsExporting(true);

    try {
      const headers = [
        "ID",
        "Institution",
        "Signatory",
        "Designation",
        "Official Email",
        "Official Phone",
        "Alternative Email",
        "Submission Type",
        "Registered Address",
        "Proposal Purpose",
        "Document Name",
        "Document MIME",
        "Document Size",
        "Created At",
      ];

      const rows = requests.map((request) => [
        String(request.id),
        request.institution_name,
        request.signatory_name,
        request.designation,
        request.official_email,
        request.official_phone,
        request.alternative_email || "",
        request.submission_type,
        request.registered_address,
        request.proposal_purpose,
        request.supporting_document_name || "",
        request.supporting_document_mime || "",
        formatFileSize(request.supporting_document_size),
        `${formatDate(request.created_at)} ${formatTime(request.created_at)}`,
      ]);

      const csv = [
        headers.map(csvEscape).join(","),
        ...rows.map((row) => row.map((cell) => csvEscape(cell)).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const now = new Date();
      const fileName = `mou-requests-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}.csv`;

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to export MoU requests.",
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteRequest = async (requestId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this MoU request? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setDeletingId(requestId);

    try {
      const response = await fetch(`/api/mou-application/${requestId}`, {
        method: "DELETE",
        cache: "no-store",
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to delete MoU request.");
      }

      setRequests((prev) => prev.filter((request) => request.id !== requestId));
      setSelectedRequest((current) => (current?.id === requestId ? null : current));
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to delete MoU request.",
      );
    } finally {
      setDeletingId((currentId) => (currentId === requestId ? null : currentId));
    }
  };

  const handleDetailExport = (request: MouRequest) => {
    setError("");
    setIsDetailExporting(true);

    try {
      const headers = [
        "ID",
        "Institution",
        "Registered Address",
        "Signatory",
        "Designation",
        "Official Email",
        "Official Phone",
        "Alternative Email",
        "Submission Type",
        "Proposal Purpose",
        "Document Name",
        "Document MIME",
        "Document Size",
        "Created At",
      ];

      const row = [
        String(request.id),
        request.institution_name,
        request.registered_address,
        request.signatory_name,
        request.designation,
        request.official_email,
        request.official_phone,
        request.alternative_email || "",
        request.submission_type,
        request.proposal_purpose,
        request.supporting_document_name || "",
        request.supporting_document_mime || "",
        formatFileSize(request.supporting_document_size),
        `${formatDate(request.created_at)} ${formatTime(request.created_at)}`,
      ];

      const csv = [
        headers.map(csvEscape).join(","),
        row.map((cell) => csvEscape(cell)).join(","),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const fileName = `mou-request-${request.id}.csv`;

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to export MoU request details.",
      );
    } finally {
      setIsDetailExporting(false);
    }
  };

  const handleDocumentDownload = async (request: MouRequest) => {
    if (!request.supporting_document_name) {
      return;
    }

    setError("");
    setDownloadingDocumentId(request.id);

    try {
      const response = await fetch(`/api/mou-application/${request.id}/document`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as unknown;
        throw new Error(getApiMessage(payload) || "Unable to download supporting document.");
      }

      const contentDisposition = response.headers.get("content-disposition") || "";
      const fileNameMatch = /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i.exec(contentDisposition);
      const fallbackFileName = request.supporting_document_name || `mou-request-${request.id}.bin`;
      const fileName = decodeURIComponent(fileNameMatch?.[1] || fileNameMatch?.[2] || fallbackFileName);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to download supporting document.",
      );
    } finally {
      setDownloadingDocumentId((currentId) => (currentId === request.id ? null : currentId));
    }
  };

  const isDeleting = (requestId: number) => deletingId === requestId;

  return (
    <>
      <div className="min-h-screen container mx-auto max-w-8xl text-zinc-100 space-y-6">
        <div className="flex flex-col gap-4 pt-3 pb-5 border-b border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">MoU Requests</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Review all submitted MoU applications.
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            className="text-zinc-200 hover:bg-zinc-800/70"
            disabled={isLoading || isExporting || requests.length === 0}
            onClick={handleExport}
          >
            {isExporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export
          </Button>
        </div>

        {error && (
          <div className="rounded-md border border-rose-500/40 bg-rose-950/30 px-3 py-2 text-sm text-rose-200">
            {error}
          </div>
        )}

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-zinc-100 text-lg flex items-center gap-2">
                <NotebookPen className="h-4 w-4 text-blue-400" />
                MoU Requests
              </CardTitle>
              <span className="text-sm text-zinc-400">Total: {requests.length}</span>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead className="text-white min-w-[260px]">Institution</TableHead>
                      <TableHead className="text-white min-w-[220px]">Authorized Signatory</TableHead>
                      <TableHead className="text-white min-w-[240px]">Contact</TableHead>
                      <TableHead className="text-white min-w-[160px]">Submitted</TableHead>
                      <TableHead className="text-white min-w-[180px] text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.length === 0 ? (
                      <TableRow className="border-zinc-800">
                        <TableCell colSpan={5} className="text-center text-zinc-400 py-8">
                          No MoU requests yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      requests.map((request) => (
                        <TableRow key={`${request.id}-${request.official_email}`} className="border-zinc-800">
                          <TableCell className="align-top">
                            <div className="flex flex-col text-zinc-300 text-sm">
                              <span className="text-zinc-100 font-medium">{request.institution_name || "-"}</span>
                              <span className="text-zinc-500 mt-1">Type: {request.submission_type || "-"}</span>
                            </div>
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="flex flex-col text-zinc-300 text-sm">
                              <span className="text-zinc-100 font-medium">{request.signatory_name || "-"}</span>
                              <span>{request.designation || "-"}</span>
                            </div>
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="flex flex-col text-zinc-300 text-sm">
                              <span className="text-zinc-500">{request.official_email || "-"}</span>
                              <span className="text-zinc-500">{request.official_phone || "-"}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-zinc-400 align-top">
                            <div className="flex flex-col text-sm">
                              <span>{formatDate(request.created_at)}</span>
                              <span className="text-zinc-500">{formatTime(request.created_at)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="align-top text-right">
                            <div className="inline-flex flex-wrap justify-end gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                className="text-zinc-200 hover:bg-zinc-800/70"
                                onClick={() => setSelectedRequest(request)}
                              >
                                <Eye className="mr-1.5 h-3.5 w-3.5" />
                                View
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                className="text-rose-300 hover:bg-rose-900/20"
                                disabled={isDeleting(request.id)}
                                onClick={() => {
                                  void handleDeleteRequest(request.id);
                                }}
                              >
                                {isDeleting(request.id) ? (
                                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                                )}
                                Delete
                              </Button>
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

      {selectedRequest ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-3xl rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <h2 className="text-lg font-semibold text-white">MoU Request Details</h2>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-zinc-200 hover:bg-zinc-800/70"
                  disabled={isDetailExporting}
                  onClick={() => handleDetailExport(selectedRequest)}
                >
                  {isDetailExporting ? (
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="mr-1.5 h-4 w-4" />
                  )}
                  Export
                </Button>
                <button
                  type="button"
                  className="rounded-md px-2 py-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </button>
              </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-zinc-500">Institution</p>
                  <p className="text-sm text-zinc-200">{selectedRequest.institution_name || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Submission Type</p>
                  <p className="text-sm text-zinc-200">{selectedRequest.submission_type || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Signatory Name</p>
                  <p className="text-sm text-zinc-200">{selectedRequest.signatory_name || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Designation</p>
                  <p className="text-sm text-zinc-200">{selectedRequest.designation || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Official Email</p>
                  <p className="text-sm text-zinc-200">{selectedRequest.official_email || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Official Phone</p>
                  <p className="text-sm text-zinc-200">{selectedRequest.official_phone || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Alternative Email</p>
                  <p className="text-sm text-zinc-200">{selectedRequest.alternative_email || "-"}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-zinc-500">Registered Address</p>
                  <p className="whitespace-pre-wrap text-sm text-zinc-200">{selectedRequest.registered_address || "-"}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-zinc-500">Proposal Purpose</p>
                  <div className="mt-2 max-h-56 overflow-y-auto overflow-x-hidden rounded-lg border border-zinc-800 bg-zinc-950/60 p-3">
                    <p className="whitespace-pre-wrap break-all text-sm leading-relaxed text-zinc-200">
                      {selectedRequest.proposal_purpose || "-"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Supporting Document</p>
                  <p className="text-sm text-zinc-200">{selectedRequest.supporting_document_name || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Document Type</p>
                  <p className="text-sm text-zinc-200">{selectedRequest.supporting_document_mime || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Document Size</p>
                  <p className="text-sm text-zinc-200">{formatFileSize(selectedRequest.supporting_document_size)}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Submitted</p>
                  <p className="text-sm text-zinc-200">
                    {formatDate(selectedRequest.created_at)} {formatTime(selectedRequest.created_at)}
                  </p>
                </div>
                {selectedRequest.supporting_document_name ? (
                  <div className="sm:col-span-2">
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-auto p-0 text-cyan-300 hover:bg-transparent hover:text-cyan-200 hover:underline"
                      disabled={downloadingDocumentId === selectedRequest.id}
                      onClick={() => {
                        void handleDocumentDownload(selectedRequest);
                      }}
                    >
                      {downloadingDocumentId === selectedRequest.id ? (
                        <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-1.5 h-4 w-4" />
                      )}
                      Download Document
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-zinc-800 px-5 py-4">
              <Button
                type="button"
                variant="ghost"
                className="text-rose-300 hover:bg-rose-900/20"
                disabled={isDeleting(selectedRequest.id)}
                onClick={() => {
                  void handleDeleteRequest(selectedRequest.id);
                }}
              >
                {isDeleting(selectedRequest.id) ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                )}
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
