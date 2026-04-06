"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Users,
  Pencil,
  Trash2,
  Download,
  Rocket,
  GraduationCap,
  Plane,
  Cpu,
  Telescope,
  Satellite,
  Loader2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminToast } from "@/components/admin/AdminToast";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Types
interface Program {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  registered: number;
  status: "Active" | "Inactive" | "Pending";
  icon: React.ReactNode;
}

type WorkshopListItem = {
  id?: number | string;
  title?: string;
  description?: string | null;
  thumbnail_url?: string | null;
  certificate_url?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  duration?: string | null;
  certificate?: boolean | number | string | null;
  fee?: number | string | null;
  mode?: string | null;
  eligibility?: string | null;
  workshop_date?: string | null;
  registered_count?: number | string | null;
};

const DEFAULT_THUMBNAIL =
  "https://placehold.co/100x100/1e293b/475569?text=Workshop";

function resolveProgramIcon(label: string): React.ReactNode {
  const normalized = label.toLowerCase();

  if (normalized.includes("drone") || normalized.includes("air")) {
    return <Plane className="w-4 h-4" />;
  }

  if (normalized.includes("robot")) {
    return <Cpu className="w-4 h-4" />;
  }

  if (normalized.includes("rocket")) {
    return <Rocket className="w-4 h-4" />;
  }

  if (normalized.includes("satellite") || normalized.includes("space")) {
    return <Satellite className="w-4 h-4" />;
  }

  if (normalized.includes("academy") || normalized.includes("student")) {
    return <GraduationCap className="w-4 h-4" />;
  }

  return <Telescope className="w-4 h-4" />;
}

function resolveProgramStatus(
  workshopDate?: string | null,
): Program["status"] {
  if (!workshopDate) {
    return "Active";
  }

  const parsedDate = new Date(workshopDate);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Active";
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const targetDate = new Date(parsedDate);
  targetDate.setHours(0, 0, 0, 0);

  if (targetDate.getTime() > now.getTime()) {
    return "Pending";
  }

  if (targetDate.getTime() < now.getTime()) {
    return "Inactive";
  }

  return "Active";
}

function extractWorkshopRecords(payload: unknown): Record<string, unknown>[] {
  let items: unknown[] = [];

  if (Array.isArray(payload)) {
    items = payload;
  } else if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    if (Array.isArray(record.data)) {
      items = record.data;
    } else if (Array.isArray(record.results)) {
      items = record.results;
    } else if (Array.isArray(record.workshops)) {
      items = record.workshops;
    }
  }

  return items.filter(
    (item): item is Record<string, unknown> =>
      Boolean(item) && typeof item === "object" && !Array.isArray(item),
  );
}

function extractWorkshopItems(payload: unknown): WorkshopListItem[] {
  return extractWorkshopRecords(payload) as WorkshopListItem[];
}

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

function normalizeWorkshop(item: WorkshopListItem): Program | null {
  const idAsNumber =
    typeof item.id === "number"
      ? item.id
      : Number.parseInt(String(item.id ?? ""), 10);

  if (!Number.isInteger(idAsNumber) || idAsNumber <= 0) {
    return null;
  }

  const title = (item.title || "").trim();
  if (!title) {
    return null;
  }

  const category =
    (item.mode || "").trim() || (item.eligibility || "").trim() || "General";

  const thumbnailUrl = (item.thumbnail_url || "").trim();
  const thumbnail = /^https?:\/\//i.test(thumbnailUrl)
    ? thumbnailUrl
    : DEFAULT_THUMBNAIL;

  const parsedRegistered = Number(item.registered_count);
  const registered =
    Number.isFinite(parsedRegistered) && parsedRegistered >= 0
      ? parsedRegistered
      : 0;

  return {
    id: idAsNumber,
    title,
    thumbnail,
    category,
    registered,
    status: resolveProgramStatus(item.workshop_date),
    icon: resolveProgramIcon(`${title} ${category}`),
  };
}

// Programs Table Component (matching your theme)
const ProgramsTable: React.FC<{
  programs: Program[];
  onRequestDelete: (program: Program) => void;
  isLoading?: boolean;
  deletingProgramId?: number | null;
}> = ({
  programs,
  onRequestDelete,
  isLoading = false,
  deletingProgramId = null,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-zinc-800">
          {/* ID Column - First */}
          <TableHead className="w-[60px] text-white text-center">ID</TableHead>
          <TableHead className="w-[250px] text-white">Workshop</TableHead>
          <TableHead className="text-white">Mode</TableHead>
          <TableHead className="text-white">Registered</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-right text-white">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {programs.length === 0 ? (
          <TableRow className="border-zinc-800">
            <TableCell colSpan={6} className="py-8 text-center text-zinc-500">
              No workshops found.
            </TableCell>
          </TableRow>
        ) : (
          programs.map((program) => (
            <TableRow
              key={program.id}
              className="border-zinc-800 hover:bg-zinc-900/50"
            >
              {/* ID Cell - First */}
              <TableCell className="text-center  text-sm text-white">
                <span className="px-2 py-0.5">{program.id}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-lg border border-zinc-700">
                    <AvatarImage src={program.thumbnail} alt={program.title} />
                    <AvatarFallback className="bg-zinc-800 text-zinc-400">
                      {program.icon}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-zinc-100">
                      {program.title}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 bg-zinc-800/30 border border-zinc-700 rounded-full px-3 py-1 w-fit">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-zinc-300 font-medium">
                    {program.category}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-zinc-300">
                  {program.registered}
                </span>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-950 text-green-200 border rounded-xl border-green-900 hover:bg-green-950">
                  {program.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/admin/workshops/${program.id}/participants`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-zinc-300 hover:bg-transparent hover:text-zinc-100"
                    >
                      <Users className="mr-1.5 h-3.5 w-3.5 text-blue-400" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/admin/workshops/${program.id}/edit`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-zinc-300 hover:bg-transparent hover:text-zinc-100"
                    >
                      <Pencil className="mr-1.5 h-3.5 w-3.5 text-zinc-400" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={deletingProgramId === program.id}
                    onClick={() => onRequestDelete(program)}
                    className="h-8 px-2 text-rose-300 hover:bg-transparent hover:text-rose-200"
                  >
                    {deletingProgramId === program.id ? (
                      <>
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                        Delete
                      </>
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

// Main Programs Management Component
export default function ProgramsManagement() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [workshopItems, setWorkshopItems] = useState<WorkshopListItem[]>([]);
  const [workshopRecords, setWorkshopRecords] = useState<Record<string, unknown>[]>([]);
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deletingProgramId, setDeletingProgramId] = useState<number | null>(
    null,
  );
  const [deleteCandidate, setDeleteCandidate] = useState<{
    id: number;
    title: string;
  } | null>(null);

  useEffect(() => {
    if (!deleteCandidate || deletingProgramId !== null) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDeleteCandidate(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [deleteCandidate, deletingProgramId]);

  useEffect(() => {
    let isMounted = true;

    const loadPrograms = async () => {
      setIsLoading(true);
      setFetchError("");

      try {
        const response = await fetch("/api/workshop-list", {
          method: "GET",
          cache: "no-store",
        });

        const payload = await response.json().catch(() => []);

        if (!response.ok) {
          const message =
            payload &&
            typeof payload === "object" &&
            "message" in payload &&
            typeof (payload as { message?: unknown }).message === "string"
              ? (payload as { message: string }).message
              : "Unable to fetch workshops";

          throw new Error(message);
        }

        const parsedWorkshopRecords = extractWorkshopRecords(payload);
        const parsedWorkshopItems = parsedWorkshopRecords as WorkshopListItem[];

        const normalizedPrograms = parsedWorkshopItems
          .map(normalizeWorkshop)
          .filter((item): item is Program => Boolean(item));

        if (!isMounted) {
          return;
        }

  setWorkshopRecords(parsedWorkshopRecords);
        setWorkshopItems(parsedWorkshopItems);
        setPrograms(normalizedPrograms);
        setTotalPrograms(normalizedPrograms.length);
      } catch (error) {
        if (!isMounted) {
          return;
        }

  setWorkshopRecords([]);
        setWorkshopItems([]);
        setPrograms([]);
        setTotalPrograms(0);
        setFetchError(
          error instanceof Error && error.message
            ? error.message
            : "Unable to fetch workshops",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPrograms();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeleteRequest = (program: Program) => {
    setDeleteCandidate({
      id: program.id,
      title: program.title,
    });
    setFetchError("");
  };

  const handleDeleteConfirm = async () => {
    if (!deleteCandidate) {
      return;
    }

    const { id, title } = deleteCandidate;
    setDeletingProgramId(id);
    setFetchError("");

    try {
      const response = await fetch(`/api/workshop-list/${encodeURIComponent(String(id))}`, {
        method: "DELETE",
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message =
          payload &&
          typeof payload === "object" &&
          "message" in payload &&
          typeof (payload as { message?: unknown }).message === "string"
            ? (payload as { message: string }).message
            : "Unable to delete workshop";
        throw new Error(message);
      }

      setPrograms((prev) => prev.filter((program) => program.id !== id));
      setWorkshopRecords((prev) =>
        prev.filter((record) => {
          const rawId = record.id;
          const parsedId =
            typeof rawId === "number"
              ? rawId
              : Number.parseInt(String(rawId ?? ""), 10);

          return parsedId !== id;
        }),
      );
      setWorkshopItems((prev) =>
        prev.filter((item) => {
          const rawId = item.id;
          const parsedId =
            typeof rawId === "number"
              ? rawId
              : Number.parseInt(String(rawId ?? ""), 10);

          return parsedId !== id;
        }),
      );
      setTotalPrograms((prev) => (prev > 0 ? prev - 1 : 0));
      setToastMessage(`${title} deleted successfully`);
      setDeleteCandidate(null);
    } catch (error) {
      setFetchError(
        error instanceof Error && error.message
          ? error.message
          : "Unable to delete workshop",
      );
    } finally {
      setDeletingProgramId(null);
    }
  };

  const closeDeleteModal = () => {
    if (deletingProgramId !== null) {
      return;
    }

    setDeleteCandidate(null);
  };

  const handleExport = async () => {
    if (isExporting || isLoading) {
      return;
    }

    if (workshopRecords.length === 0) {
      setToastMessage("No workshop data available to export");
      return;
    }

    setFetchError("");
    setIsExporting(true);

    try {
      const XLSX = await import("xlsx");

      const { headers, rows } = buildDynamicExportRows(workshopRecords);

      if (rows.length === 0) {
        setToastMessage("No workshop data available to export");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
      worksheet["!cols"] = headers.map((header) => ({
        wch: Math.max(16, Math.min(42, header.length + 4)),
      }));

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Workshops");

      const now = new Date();
      const filename = `workshops-export-${now.getFullYear()}-${String(
        now.getMonth() + 1,
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(
        now.getHours(),
      ).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}.xlsx`;

      XLSX.writeFile(workbook, filename);
      setToastMessage(`Exported ${rows.length} workshops to Excel`);
    } catch (error) {
      setFetchError(
        error instanceof Error && error.message
          ? error.message
          : "Unable to export workshops",
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen text-zinc-100 container mx-auto max-w-8xl">
      <AdminToast
        open={Boolean(toastMessage)}
        message={toastMessage ?? ""}
        variant="success"
        onClose={() => setToastMessage(null)}
      />

      {deleteCandidate && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/65 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDeleteModal();
            }
          }}
        >
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-xl">
            <h2 className="text-lg font-semibold text-zinc-100">
              Delete Workshop
            </h2>
            <p className="mt-2 text-sm text-zinc-300">
              Are you sure you want to delete {deleteCandidate.title}? This action cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={deletingProgramId !== null}
                onClick={closeDeleteModal}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={deletingProgramId !== null}
                onClick={handleDeleteConfirm}
                className="bg-rose-600 text-white hover:bg-rose-700"
              >
                {deletingProgramId !== null ? (
                  <>
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3 pb-5 mb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Workshops
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage and monitor all your workshops
          </p>
        </div>

        <Link href="/admin/workshops/create">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Workshop
          </Button>
        </Link>
      </div>

      <Separator className="my-6 bg-zinc-800" />

      {/* Programs Table Card */}
      <Card className="h-full flex flex-col bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4 text-blue-400" />
              <CardTitle className="text-lg text-zinc-100">
                All Workshops
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
              >
                Filter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExport}
                disabled={isLoading || isExporting || programs.length === 0}
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
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-0 overflow-hidden">
          {fetchError && (
            <div className="mb-4 rounded-md border border-rose-500/40 bg-rose-950/30 px-3 py-2 text-sm text-rose-200">
              {fetchError}
            </div>
          )}

          <div className="overflow-x-auto -mx-6 px-6">
            <ProgramsTable
              programs={programs}
              onRequestDelete={handleDeleteRequest}
              isLoading={isLoading}
              deletingProgramId={deletingProgramId}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t border-zinc-800 pt-4">
          <div className="flex items-center justify-between w-full text-sm text-zinc-500">
            <span>
              Showing {programs.length} of {totalPrograms} workshops
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-zinc-700 text-zinc-500"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-zinc-700 text-zinc-500"
              >
                Next
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
