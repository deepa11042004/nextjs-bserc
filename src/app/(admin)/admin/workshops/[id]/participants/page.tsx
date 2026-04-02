"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, Users } from "lucide-react";

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

type Participant = {
  id: number;
  full_name: string;
  email: string;
  contact_number: string;
  institution: string;
  designation: string;
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

export default function WorkshopParticipantsPage() {
  const params = useParams<{ id: string }>();
  const workshopId = getWorkshopIdParam(params?.id);

  const [workshopTitle, setWorkshopTitle] = useState("Workshop Participants");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setParticipants([]);
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
            <span className="text-sm text-zinc-400">
              Total: {totalParticipants}
            </span>
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
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Contact</TableHead>
                  <TableHead className="text-white">Institution</TableHead>
                  <TableHead className="text-white">Designation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.length === 0 ? (
                  <TableRow className="border-zinc-800">
                    <TableCell
                      colSpan={5}
                      className="py-8 text-center text-zinc-500"
                    >
                      No participants found for this workshop.
                    </TableCell>
                  </TableRow>
                ) : (
                  participants.map((participant) => (
                    <TableRow key={participant.id} className="border-zinc-800">
                      <TableCell className="text-zinc-200">{participant.full_name}</TableCell>
                      <TableCell className="text-zinc-300">{participant.email}</TableCell>
                      <TableCell className="text-zinc-300">{participant.contact_number}</TableCell>
                      <TableCell className="text-zinc-300">{participant.institution}</TableCell>
                      <TableCell className="text-zinc-300">{participant.designation}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
