"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Loader2, NotebookPen } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
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
import type { InternshipApplication } from "@/types/internshipApplication";
import {
  extractInternshipApplications,
  formatDate,
  formatDateTime,
  formatMoney,
  getApiMessage,
  getPaymentBadgeClasses,
} from "@/components/admin/internships/internshipUtils";
import {
  getInternshipFeeSettings,
  updateInternshipFeeSettings,
} from "@/services/internshipRegistration";

type InternshipFilter = "all" | "regular" | "lateral";
type FeeStatus = { type: "success" | "error"; message: string };

function toExportCellValue(value: unknown): string | number | boolean {
  if (value === null || value === undefined) {
    return "";
  }

  if (
    typeof value === "string"
    || typeof value === "number"
    || typeof value === "boolean"
  ) {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function buildDynamicExportRows(records: Record<string, unknown>[]) {
  const headers: string[] = [];

  records.forEach((record) => {
    Object.keys(record).forEach((key) => {
      if (!headers.includes(key)) {
        headers.push(key);
      }
    });
  });

  const rows = records.map((record) => {
    const row: Record<string, string | number | boolean> = {};

    headers.forEach((header) => {
      row[header] = toExportCellValue(record[header]);
    });

    return row;
  });

  return { headers, rows };
}

export default function InternshipApplications() {
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [filter, setFilter] = useState<InternshipFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState("");
  const [generalFeeInput, setGeneralFeeInput] = useState("100");
  const [lateralFeeInput, setLateralFeeInput] = useState("100");
  const [isFeeLoading, setIsFeeLoading] = useState(true);
  const [isFeeSaving, setIsFeeSaving] = useState(false);
  const [feeStatus, setFeeStatus] = useState<FeeStatus | null>(null);

  const filteredApplications = useMemo(() => {
    if (filter === "all") {
      return applications;
    }

    return applications.filter((application) =>
      filter === "lateral" ? application.is_lateral : !application.is_lateral,
    );
  }, [applications, filter]);

  useEffect(() => {
    let isMounted = true;

    const loadApplications = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/internship-registration/list", {
          method: "GET",
          cache: "no-store",
        });

        const payload = (await response.json().catch(() => ({}))) as unknown;

        if (!response.ok) {
          throw new Error(
            getApiMessage(payload) || "Unable to fetch internship applications.",
          );
        }

        if (!isMounted) {
          return;
        }

        setApplications(extractInternshipApplications(payload));
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setApplications([]);
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to fetch internship applications.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const loadFeeSettings = async () => {
      setIsFeeLoading(true);

      try {
        const payload = await getInternshipFeeSettings();

        if (!isMounted) {
          return;
        }

        setGeneralFeeInput(String(payload.general_fee_rupees ?? 0));
        setLateralFeeInput(String(payload.lateral_fee_rupees ?? 0));
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setFeeStatus({
          type: "error",
          message:
            err instanceof Error && err.message
              ? err.message
              : "Unable to load internship fee settings.",
        });
      } finally {
        if (isMounted) {
          setIsFeeLoading(false);
        }
      }
    };

    loadApplications();
    loadFeeSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSaveFeeSettings = async () => {
    const generalFee = Number(generalFeeInput);
    const lateralFee = Number(lateralFeeInput);

    if (
      !Number.isFinite(generalFee) ||
      generalFee < 0 ||
      !Number.isFinite(lateralFee) ||
      lateralFee < 0
    ) {
      setFeeStatus({
        type: "error",
        message: "Please enter valid non-negative fee values for both registration types.",
      });
      return;
    }

    setIsFeeSaving(true);
    setFeeStatus(null);

    try {
      const payload = await updateInternshipFeeSettings({
        general_fee_rupees: generalFee,
        lateral_fee_rupees: lateralFee,
      });

      setGeneralFeeInput(String(payload.general_fee_rupees));
      setLateralFeeInput(String(payload.lateral_fee_rupees));
      setFeeStatus({
        type: "success",
        message: payload.message || "Internship fees updated successfully.",
      });
    } catch (err) {
      setFeeStatus({
        type: "error",
        message:
          err instanceof Error && err.message
            ? err.message
            : "Unable to update internship fees.",
      });
    } finally {
      setIsFeeSaving(false);
    }
  };

  const handleExport = async () => {
    if (isExporting || isLoading) {
      return;
    }

    if (filteredApplications.length === 0) {
      setError(
        filter === "all"
          ? "No internship applications available to export."
          : "No applications available to export for the selected filter.",
      );
      return;
    }

    setError("");
    setIsExporting(true);

    try {
      const XLSX = await import("xlsx");

      const applicationRecords = filteredApplications.map((application) => ({
        ...application,
      }));
      const { headers, rows } = buildDynamicExportRows(applicationRecords);

      if (rows.length === 0) {
        setError("No internship applications available to export.");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
      worksheet["!cols"] = headers.map((header) => ({
        wch: Math.max(16, Math.min(42, header.length + 4)),
      }));

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Internship Applications");

      const now = new Date();
      const filename = `internship-applications-${filter}-${now.getFullYear()}-${String(
        now.getMonth() + 1,
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(
        now.getHours(),
      ).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}.xlsx`;

      XLSX.writeFile(workbook, filename);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to export internship applications.",
      );
    } finally {
      setIsExporting(false);
    }
  };

  const totalApplications = useMemo(() => filteredApplications.length, [filteredApplications]);
  const totalApplicationsAll = useMemo(() => applications.length, [applications]);

  return (
    <div className="min-h-screen container mx-auto max-w-8xl text-zinc-100">
      <div className="flex flex-col gap-4 pt-3 pb-5 mb-6 border-b border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Internship Applications
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            All registrations submitted for summer internship.
          </p>
        </div>
      </div>

      <Card className="mb-6 bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100 text-lg flex items-center gap-2">
            <NotebookPen className="h-4 w-4 text-cyan-400" />
            Internship Fee Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {feeStatus && (
            <div
              className={`mb-4 rounded-md border px-3 py-2 text-sm ${
                feeStatus.type === "success"
                  ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-200"
                  : "border-rose-500/40 bg-rose-950/30 text-rose-200"
              }`}
            >
              {feeStatus.message}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-zinc-300 font-medium">General Registration Fee (INR)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={generalFeeInput}
                onChange={(event) => setGeneralFeeInput(event.target.value)}
                disabled={isFeeLoading || isFeeSaving}
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-300 font-medium">Lateral Registration Fee (INR)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={lateralFeeInput}
                onChange={(event) => setLateralFeeInput(event.target.value)}
                disabled={isFeeLoading || isFeeSaving}
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-zinc-400">
              {isFeeLoading
                ? "Loading current fee settings..."
                : "These fees are used during payment order creation for general and lateral registrations."}
            </p>
            <button
              type="button"
              onClick={handleSaveFeeSettings}
              disabled={isFeeLoading || isFeeSaving}
              className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-300"
            >
              {isFeeSaving ? "Saving..." : "Save Fees"}
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <CardTitle className="text-zinc-100 text-lg flex items-center gap-2">
                <NotebookPen className="h-4 w-4 text-blue-400" />
                Submitted Applications
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                {(["all", "regular", "lateral"] as const).map((option) => {
                  const label =
                    option === "all"
                      ? "All"
                      : option === "regular"
                      ? "General Internship"
                      : "Lateral Internship";

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFilter(option)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        filter === option
                          ? "bg-cyan-500 text-black"
                          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExport}
                disabled={isLoading || isExporting || filteredApplications.length === 0}
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
                Showing {totalApplications} of {totalApplicationsAll}
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
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800">
                    <TableHead className="text-white min-w-[220px]">Applicant</TableHead>
                    <TableHead className="text-white min-w-[250px]">Contact</TableHead>
                    <TableHead className="text-white min-w-[200px]">Institution</TableHead>
                    <TableHead className="text-white min-w-[220px]">Payment</TableHead>
                    <TableHead className="text-white min-w-[170px]">Applied At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.length === 0 ? (
                    <TableRow className="border-zinc-800">
                      <TableCell colSpan={5} className="py-8 text-center text-zinc-500">
                        {applications.length === 0
                          ? "No internship applications found."
                          : "No applications found for the selected filter."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApplications.map((application) => (
                      <TableRow key={application.id} className="border-zinc-800 align-top">
                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm">
                            <span className="font-medium text-zinc-100">{application.full_name}</span>
                            <span className="text-zinc-400">Guardian: {application.guardian_name}</span>
                            <span className="text-zinc-500">
                              {application.gender} • DOB: {formatDate(application.dob)}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm text-zinc-300">
                            <span>{application.mobile_number}</span>
                            <span>{application.email}</span>
                            <span className="text-zinc-500">
                              Alt: {application.alternative_email || "-"}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm text-zinc-300">
                            <span>{application.institution_name}</span>
                            <span className="text-zinc-500">
                              {application.educational_qualification}
                            </span>
                            <span className="text-zinc-500">
                              Declaration: {application.declaration_accepted ? "Accepted" : "No"}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col gap-2 text-sm text-zinc-300">
                            <span>
                              {formatMoney(
                                application.payment_amount,
                                application.payment_currency,
                              )}
                            </span>
                            <Badge className={getPaymentBadgeClasses(application.payment_status)}>
                              {application.payment_status || "-"}
                            </Badge>
                            <span className="text-zinc-500 text-xs">
                              Payment ID: {application.razorpay_payment_id || "-"}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-zinc-300 text-sm">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-zinc-100">{application.internship_name}</span>
                            <span className="text-zinc-500">{formatDateTime(application.created_at)}</span>
                            <span className="text-xs text-zinc-400">
                              {application.is_lateral ? "Lateral Registration" : "Regular Registration"}
                            </span>
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
  );
}
