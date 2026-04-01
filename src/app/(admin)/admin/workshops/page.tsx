"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Users,
  Pencil,
  Trash2,
  Rocket,
  GraduationCap,
  Plane,
  Cpu,
  Telescope,
  Satellite,
  ChevronRight,
  Loader2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Types
interface Program {
  id: number;
  title: string;
  description: string;
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
  mode?: string | null;
  eligibility?: string | null;
  workshop_date?: string | null;
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

function extractWorkshopItems(payload: unknown): WorkshopListItem[] {
  if (Array.isArray(payload)) {
    return payload as WorkshopListItem[];
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    if (Array.isArray(record.data)) {
      return record.data as WorkshopListItem[];
    }

    if (Array.isArray(record.results)) {
      return record.results as WorkshopListItem[];
    }

    if (Array.isArray(record.workshops)) {
      return record.workshops as WorkshopListItem[];
    }
  }

  return [];
}

function getDescriptionPreview(value: string): string {
  const cleaned = value.replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "No description available";
  }

  const sentenceMatches = cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  if (!sentenceMatches) {
    const words = cleaned.split(" ");
    return words.length > 60 ? `${words.slice(0, 60).join(" ")}...` : cleaned;
  }

  const preview = sentenceMatches.slice(0, 5).join(" ").trim();
  return sentenceMatches.length > 5 ? `${preview}...` : preview;
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

  const description = getDescriptionPreview((item.description || "").trim());

  const category =
    (item.mode || "").trim() || (item.eligibility || "").trim() || "General";

  const thumbnailUrl = (item.thumbnail_url || "").trim();
  const thumbnail = /^https?:\/\//i.test(thumbnailUrl)
    ? thumbnailUrl
    : DEFAULT_THUMBNAIL;

  return {
    id: idAsNumber,
    title,
    description,
    thumbnail,
    category,
    registered: 0,
    status: resolveProgramStatus(item.workshop_date),
    icon: resolveProgramIcon(`${title} ${category}`),
  };
}

// Programs Table Component (matching your theme)
const ProgramsTable: React.FC<{
  programs: Program[];
  onDelete: (id: number) => void;
  isLoading?: boolean;
}> = ({ programs, onDelete, isLoading = false }) => {
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
          <TableHead className="w-[250px] text-white">Program</TableHead>
          <TableHead className="text-white">Category</TableHead>
          <TableHead className="text-white">Registered</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-right text-white">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {programs.length === 0 ? (
          <TableRow className="border-zinc-800">
            <TableCell colSpan={6} className="py-8 text-center text-zinc-500">
              No programs found.
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
                    <span className="text-xs text-zinc-500 line-clamp-1">
                      {program.description}
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                    >
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-zinc-900 border-zinc-800"
                  >
                    <DropdownMenuItem className="text-zinc-100 focus:text-zinc-100 focus:bg-zinc-800">
                      <Users className="mr-2 h-4 w-4 text-blue-400" />
                      View Participants
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-zinc-100 focus:text-zinc-100 focus:bg-zinc-800">
                      <Pencil className="mr-2 h-4 w-4 text-zinc-400" />
                      Edit Program
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(program.id)}
                      className="text-zinc-100 focus:text-rose-400 focus:bg-zinc-800"
                    >
                      <Trash2 className="mr-2 h-4 w-4 text-rose-400" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

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
              : "Unable to fetch programs";

          throw new Error(message);
        }

        const normalizedPrograms = extractWorkshopItems(payload)
          .map(normalizeWorkshop)
          .filter((item): item is Program => Boolean(item));

        if (!isMounted) {
          return;
        }

        setPrograms(normalizedPrograms);
        setTotalPrograms(normalizedPrograms.length);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setPrograms([]);
        setTotalPrograms(0);
        setFetchError(
          error instanceof Error && error.message
            ? error.message
            : "Unable to fetch programs",
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

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this program?")) {
      setPrograms((prev) => prev.filter((program) => program.id !== id));
    }
  };

  return (
    <div className="min-h-screen text-zinc-100 container mx-auto max-w-8xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3 pb-5 mb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Workshops
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage and monitor all your educational programs
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
                All Programs
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
                variant="outline"
                size="sm"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
              >
                Export
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
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t border-zinc-800 pt-4">
          <div className="flex items-center justify-between w-full text-sm text-zinc-500">
            <span>
              Showing {programs.length} of {totalPrograms} programs
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
