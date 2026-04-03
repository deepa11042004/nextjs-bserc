import { redirect } from "next/navigation";

export default function LegacyFacultyRequestsRedirectPage() {
  redirect("/admin/mentors/requests");
}
