import { notFound } from "next/navigation";

import WorkshopRegistrationPageClient from "@/components/workshops/WorkshopRegistrationPageClient";
import { fetchWorkshopById } from "@/lib/workshops";

export const revalidate = 300;

export default async function WorkshopDetailsRegistrationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workshop = await fetchWorkshopById(id, {
    revalidateSeconds: revalidate,
  });

  if (!workshop) {
    notFound();
  }

  return <WorkshopRegistrationPageClient workshop={workshop} />;
}
