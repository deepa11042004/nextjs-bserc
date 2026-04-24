"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, Eye, Loader2, Trash2, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/formatDate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Participant = {
  id: number;
  full_name: string;
  email: string;
  contact_number: string;
  alternative_email?: string | null;
  institution: string;
  designation: string;
  payment_amount?: number | null;
  razorpay_payment_id?: string | null;
  payment_status?: string | null;
  created_at?: string | null;
  agree_recording?: boolean;
  agree_terms?: boolean;
};

type ParticipantsResponse = {
  workshop?: {
    id?: number;
    title?: string;
  };
  participants?: Participant[];
  message?: string;
};

function getWorkshopIdParam(value: string | string[] | undefined): string {
  if (!value) {
    return "";
  }

  return Array.isArray(value) ? value[0] : value;
}

function getPaymentBadgeClasses(status: string | null | undefined): string {
  const normalized = (status || "").trim().toLowerCase();

  if (normalized === "captured" || normalized === "authorized") {
    return "bg-emerald-950 text-emerald-200 border border-emerald-900";
  }

  if (normalized === "not_required") {
    return "bg-sky-950 text-sky-200 border border-sky-900";
  }

  if (normalized === "failed" || normalized === "faild") {
    return "bg-rose-950 text-rose-200 border border-rose-900";
  }

  return "bg-zinc-800 text-zinc-200 border border-zinc-700";
}

function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  return `₹${value.toFixed(2)}`;
}

// using shared formatter from src/lib/formatDate

function presentText(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return "-";
  }

  const text = String(value).trim();
  return text || "-";
}

function formatBoolean(value: boolean | null | undefined): string {
  if (value === null || value === undefined) {
    return "-";
  }

  return value ? "Yes" : "No";
}

export default function WorkshopParticipantsPage() {
  const params = useParams<{ id: string }>();
  const workshopId = getWorkshopIdParam(params?.id);

  const [workshopTitle, setWorkshopTitle] = useState("Workshop Participants");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingSelectedParticipant, setIsExportingSelectedParticipant] = useState(false);
  const [deletingParticipantId, setDeletingParticipantId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadParticipants = async () => {
      if (!workshopId) {
        setError("Invalid workshop id");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/workshop-list/${encodeURIComponent(workshopId)}/participants`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const payload = (await response.json().catch(() => ({}))) as ParticipantsResponse;

        if (!response.ok) {
          throw new Error(payload.message || "Unable to fetch participants");
        }

        if (!isMounted) {
          return;
        }

        setWorkshopTitle(payload.workshop?.title || `Workshop ${workshopId}`);
        setParticipants(Array.isArray(payload.participants) ? payload.participants : []);
        setSelectedParticipant(null);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setParticipants([]);
        setSelectedParticipant(null);
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to fetch participants",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadParticipants();

    return () => {
      isMounted = false;
    };
  }, [workshopId]);

  const totalParticipants = useMemo(() => participants.length, [participants]);

  const handleViewParticipant = (participant: Participant) => {
    setSelectedParticipant({ ...participant });
  };

  const handleExportSelectedParticipant = async () => {
    if (!selectedParticipant || isExportingSelectedParticipant) {
      return;
    }

    setError("");
    setIsExportingSelectedParticipant(true);

    try {
      const XLSX = await import("xlsx");

      const row = {
        participant_id: selectedParticipant.id,
        workshop_id: workshopId || "-",
        workshop_title: presentText(workshopTitle),
        full_name: presentText(selectedParticipant.full_name),
        email: presentText(selectedParticipant.email),
        alternative_email: presentText(selectedParticipant.alternative_email),
        contact_number: presentText(selectedParticipant.contact_number),
        institution: presentText(selectedParticipant.institution),
        designation: presentText(selectedParticipant.designation),
        payment_amount: formatCurrency(selectedParticipant.payment_amount),
        payment_status: presentText(selectedParticipant.payment_status),
        razorpay_payment_id: presentText(selectedParticipant.razorpay_payment_id),
        agree_recording: formatBoolean(selectedParticipant.agree_recording),
        agree_terms: formatBoolean(selectedParticipant.agree_terms),
        registered_at: formatDateTime(selectedParticipant.created_at),
      };

      const headers = Object.keys(row);
      const worksheet = XLSX.utils.json_to_sheet([row], { header: headers });

      worksheet["!cols"] = headers.map((header) => ({
        wch: Math.max(16, Math.min(42, header.length + 4)),
      }));

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Participant Details");

      const now = new Date();
      const safeName = (selectedParticipant.full_name || "participant")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "participant";

      const filename = `participant-${safeName}-${selectedParticipant.id}-${now.getFullYear()}-${String(
        now.getMonth() + 1,
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(
        now.getHours(),
      ).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}.xlsx`;

      XLSX.writeFile(workbook, filename);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to export participant details.",
      );
    } finally {
      setIsExportingSelectedParticipant(false);
    }
  };

  const handleDeleteParticipant = async (participant: Participant) => {
    if (deletingParticipantId !== null) {
      return;
    }

    const confirmed = window.confirm(
      `Delete registration for ${participant.full_name || "this participant"}?`,
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setDeletingParticipantId(participant.id);

    try {
      const response = await fetch(
        `/api/workshop-list/participants/${encodeURIComponent(String(participant.id))}`,
        {
          method: "DELETE",
          cache: "no-store",
        },
      );

      const payload = (await response.json().catch(() => ({}))) as ParticipantsResponse;

      if (!response.ok) {
        throw new Error(payload.message || "Unable to delete participant");
      }

      setParticipants((current) => current.filter((item) => item.id !== participant.id));
      setSelectedParticipant((current) =>
        current && current.id === participant.id ? null : current,
      );
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to delete participant",
      );
    } finally {
      setDeletingParticipantId(null);
    }
  };

  const handleExport = async () => {
    if (isExporting || isLoading) {
      return;
    }

    if (participants.length === 0) {
      setError("No participants available to export.");
      return;
    }

    setError("");
    setIsExporting(true);

    try {
      const XLSX = await import("xlsx");

      const rows = participants.map((participant) => ({
        id: participant.id,
        full_name: participant.full_name,
        email: participant.email,
        contact_number: participant.contact_number,
        institution: participant.institution,
        designation: participant.designation,
        payment_amount: participant.payment_amount ?? "-",
        payment_status: participant.payment_status || "-",
        razorpay_payment_id: participant.razorpay_payment_id || "-",
        registered_at: formatDateTime(participant.created_at ?? null),
      }));

      const headers = [
        "id",
        "full_name",
        "email",
        "contact_number",
        "institution",
        "designation",
        "payment_amount",
        "payment_status",
        "razorpay_payment_id",
        "registered_at",
      ];

      const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
      worksheet["!cols"] = headers.map((header) => ({
        wch: Math.max(16, Math.min(42, header.length + 4)),
      }));

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

      const now = new Date();
      const safeWorkshopId = workshopId || "workshop";
      const filename = `workshop-${safeWorkshopId}-participants-${now.getFullYear()}-${String(
        now.getMonth() + 1,
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(
        now.getHours(),
      ).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}.xlsx`;

      XLSX.writeFile(workbook, filename);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to export participants.",
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen container mx-auto max-w-8xl text-zinc-100">
      <div className="flex flex-col gap-4 pt-3 pb-5 mb-6 border-b border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Participants
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            {workshopTitle}
          </p>
        </div>

        <Link href="/admin/workshops">
          <Button className="bg-blue-500 border border-blue-700 font-bold text-white hover:bg-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workshops
          </Button>
        </Link>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-zinc-100 text-lg flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              Enrolled Users
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExport}
                disabled={isLoading || isExporting || participants.length === 0}
                className="text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </>
                )}
              </Button>
              <span className="text-sm text-zinc-400">
                Total: {totalParticipants}
              </span>
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
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="text-white">ID</TableHead>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Institute</TableHead>
                  <TableHead className="text-white">Payment</TableHead>
                  <TableHead className="text-white">Registered At</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.length === 0 ? (
                  <TableRow className="border-zinc-800">
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-zinc-500"
                    >
                      No participants found for this workshop.
                    </TableCell>
                  </TableRow>
                ) : (
                  participants.map((participant) => {
                    const registeredAt = formatDateTime(participant.created_at ?? null);

                    return (
                      <TableRow key={participant.id} className="border-zinc-800">
                        <TableCell className="text-zinc-300">{participant.id}</TableCell>
                        <TableCell className="text-zinc-200">
                          <div className="flex flex-col gap-1 text-sm">
                            <span className="font-medium text-zinc-100">{participant.full_name}</span>
                            <span className="text-zinc-400 text-xs">{participant.contact_number}</span>
                            <span className="text-zinc-500 text-xs">{participant.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-zinc-300">{participant.institution || "-"}</TableCell>
                        <TableCell className="text-zinc-300">
                          <div className="flex flex-col gap-2 text-sm text-zinc-300">
                            <span className="font-medium text-zinc-100">
                              Amount: {formatCurrency(participant.payment_amount ?? null)}
                            </span>
                            <Badge className={getPaymentBadgeClasses(participant.payment_status)}>
                              {participant.payment_status || "-"}
                            </Badge>
                            <span className="text-zinc-500 text-xs">
                              Payment ID: {participant.razorpay_payment_id || "-"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-zinc-300 whitespace-nowrap">
                          {registeredAt}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              title="View participant details"
                              onClick={() => handleViewParticipant(participant)}
                              className="rounded-md bg-cyan-500 p-1.5 text-black transition hover:bg-cyan-400"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              title="Delete participant"
                              onClick={() => {
                                void handleDeleteParticipant(participant);
                              }}
                              disabled={deletingParticipantId === participant.id}
                              className="rounded-md bg-rose-500 p-1.5 text-black transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingParticipantId === participant.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedParticipant && (
        <Card className="fixed inset-x-2 bottom-2 z-50 max-h-[88vh] overflow-hidden border border-zinc-700 bg-zinc-900/95 shadow-2xl backdrop-blur sm:inset-x-auto sm:right-4 sm:w-[720px] lg:w-[920px]">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-zinc-100 text-lg">
                Participant Details
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    void handleExportSelectedParticipant();
                  }}
                  disabled={isExportingSelectedParticipant}
                  className="text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                >
                  {isExportingSelectedParticipant ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedParticipant(null)}
                  className="text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                >
                  Close
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="max-h-[74vh] overflow-y-auto pb-6">
            <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-zinc-500 text-xs">Participant ID</p>
                <p className="text-zinc-100">{selectedParticipant.id}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Workshop</p>
                <p className="text-zinc-100">{presentText(workshopTitle)}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Registered At</p>
                <p className="text-zinc-100">{formatDateTime(selectedParticipant.created_at ?? null)}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Full Name</p>
                <p className="text-zinc-100">{presentText(selectedParticipant.full_name)}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Email</p>
                <p className="text-zinc-100">{presentText(selectedParticipant.email)}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Alternative Email</p>
                <p className="text-zinc-100">{presentText(selectedParticipant.alternative_email)}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Contact Number</p>
                <p className="text-zinc-100">{presentText(selectedParticipant.contact_number)}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Institution</p>
                <p className="text-zinc-100">{presentText(selectedParticipant.institution)}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Designation</p>
                <p className="text-zinc-100">{presentText(selectedParticipant.designation)}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Payment Amount</p>
                <p className="text-zinc-100">{formatCurrency(selectedParticipant.payment_amount)}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Payment Status</p>
                <p className="text-zinc-100">{presentText(selectedParticipant.payment_status)}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Payment ID</p>
                <p className="text-zinc-100">{presentText(selectedParticipant.razorpay_payment_id)}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Recording Consent</p>
                <p className="text-zinc-100">{formatBoolean(selectedParticipant.agree_recording)}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Terms Accepted</p>
                <p className="text-zinc-100">{formatBoolean(selectedParticipant.agree_terms)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
