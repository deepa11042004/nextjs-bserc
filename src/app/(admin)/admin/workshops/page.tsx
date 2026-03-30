"use client";

import { useState } from "react";
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
  Settings,
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
  category: number;
  registered: number;
  status: "Active" | "Inactive" | "Pending";
  icon: React.ReactNode;
}

// Mock Programs Data
const programsData: Program[] = [
  {
    id: 11,
    title: "Defence Drone Workshop",
    description: "2-DAY DEFENCE DRONE TECHNOLO...",
    thumbnail: "https://placehold.co/100x100/1e293b/475569?text=Drone",
    category: 20,
    registered: 145,
    status: "Active",
    icon: <Rocket className="w-4 h-4" />,
  },
  {
    id: 10,
    title: "ROBOTICS DESIGNING WORKSHOP",
    description: "One-day Robotics designing workshop !",
    thumbnail: "https://placehold.co/100x100/1e293b/475569?text=Robot",
    category: 301,
    registered: 89,
    status: "Active",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: 9,
    title: "ADVANCED DRONE (AIR TAXI) WORKSHOP",
    description: "One-day Advanced drone (Air Taxi) w...",
    thumbnail: "https://placehold.co/100x100/1e293b/475569?text=Air+Taxi",
    category: 129,
    registered: 234,
    status: "Active",
    icon: <Plane className="w-4 h-4" />,
  },
  {
    id: 8,
    title: "ROCKETRY WORKSHOP",
    description: "One-day Rocketry workshop !",
    thumbnail: "https://placehold.co/100x100/1e293b/475569?text=Rocket",
    category: 60,
    registered: 178,
    status: "Active",
    icon: <Rocket className="w-4 h-4" />,
  },
  {
    id: 7,
    title: "AIRCRAFT DESIGN TECHNOLOGY WORKSHOP",
    description: "One-Day Aircraft Design Workshop !",
    thumbnail: "https://placehold.co/100x100/1e293b/475569?text=Aircraft",
    category: 175,
    registered: 156,
    status: "Active",
    icon: <Plane className="w-4 h-4" />,
  },
  {
    id: 1,
    title: "Academia",
    description: "Collaboration with academic institutio...",
    thumbnail: "https://placehold.co/100x100/1e293b/475569?text=Edu",
    category: 33,
    registered: 412,
    status: "Active",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    id: 4,
    title: "Space Fest",
    description: "Annual festival celebrating space scien...",
    thumbnail: "https://placehold.co/100x100/1e293b/475569?text=Space",
    category: 25,
    registered: 567,
    status: "Active",
    icon: <Telescope className="w-4 h-4" />,
  },
  {
    id: 5,
    title: "Student Satellite",
    description: "Hands-on program for building small s...",
    thumbnail: "https://placehold.co/100x100/1e293b/475569?text=Sat",
    category: 61,
    registered: 98,
    status: "Active",
    icon: <Satellite className="w-4 h-4" />,
  },
];

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
        {programs.map((program) => (
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
        ))}
      </TableBody>
    </Table>
  );
};

// Main Programs Management Component
export default function ProgramsManagement() {
  const [programs, setPrograms] = useState<Program[]>(programsData);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this program?")) {
      setPrograms(programs.filter((program) => program.id !== id));
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
              Showing {programs.length} of {programsData.length} programs
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
