"use client";

import { useEffect, useMemo, useState } from "react";
import { FileImage, Loader2, NotebookPen } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
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

export default function InternshipApplications() {
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

    loadApplications();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalApplications = useMemo(() => applications.length, [applications]);

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

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-zinc-100 text-lg flex items-center gap-2">
              <NotebookPen className="h-4 w-4 text-blue-400" />
              Submitted Applications
            </CardTitle>
            <span className="text-sm text-zinc-400">Total: {totalApplications}</span>
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
                    <TableHead className="text-white min-w-[230px]">Address</TableHead>
                    <TableHead className="text-white min-w-[200px]">Institution</TableHead>
                    <TableHead className="text-white min-w-[220px]">Internship</TableHead>
                    <TableHead className="text-white min-w-[220px]">Payment</TableHead>
                    <TableHead className="text-white min-w-[170px]">Document</TableHead>
                    <TableHead className="text-white min-w-[170px]">Applied At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.length === 0 ? (
                    <TableRow className="border-zinc-800">
                      <TableCell colSpan={8} className="py-8 text-center text-zinc-500">
                        No internship applications found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    applications.map((application) => (
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
                            <span className="line-clamp-2">{application.address}</span>
                            <span className="text-zinc-500">
                              {application.city}, {application.state} - {application.pin_code}
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
                          <div className="flex flex-col gap-1 text-sm text-zinc-300">
                            <span>{application.internship_name}</span>
                            <span className="text-zinc-500">{application.internship_designation}</span>
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

                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm text-zinc-300">
                            <span className="inline-flex items-center gap-1">
                              <FileImage className="h-3.5 w-3.5 text-zinc-400" />
                              {application.has_passport_photo ? "Uploaded" : "Missing"}
                            </span>
                            <span className="text-zinc-500 text-xs line-clamp-2">
                              {application.passport_photo_file_name || "-"}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-zinc-300 text-sm">
                          {formatDateTime(application.created_at)}
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
